import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';
import {ErrorHandlerMiddleware} from '../../middleware/ErrorHandlerMiddleware';
import {PageNotFoundMiddleware} from '../../middleware/PageNotFoundMiddleware';
import {DBService} from '../../service/DBService';
import {PaymentInstrumentController} from '../PaymentInstrumentController';
import {PaymentInstrumentSeed}
  from '../../../config/seeds/PaymentInstrumentSeed';
import {getConnection} from 'typeorm';
import {
  httpDataNotFound,
  httpPageNotFoundMessage,
  ormDBName,
} from '../../../config/bootstrap';
import {InstrumentChargeController} from '../InstrumentChargeController';

const app: express.Application = express();
app.use(bodyParser.json());
app.get('/admin/payment', new PaymentInstrumentController().find);
app.post('/instumentcharge/create', new InstrumentChargeController().create);
app.post('/admin/payment', new PaymentInstrumentController().create);
app.post('/admin/payment/:id', new PaymentInstrumentController().update);
app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);
const testApp = supertest(app);

let parentId: any;
let instrumentchargeId: any;
describe('Create PaymentMethodCharge', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async () => {
      await new PaymentInstrumentSeed().run();
      const instumentCharge = {
        amount: 650,
        flat_fees: 665,
        percent_fees: 25,
        min_fees: 10,
        max_fees: 100,
      };
      await testApp.post('/instumentcharge/create').send(instumentCharge);
    });
    parentId = (
      await getConnection(ormDBName).manager.query(
          `Select id from payment_instruments where title='Root'`,
      )
    )[0].id;
    instrumentchargeId = (
      await getConnection(ormDBName).manager.query(
          `Select id from instrument_charges`,
      )
    )[0].id;
  });

  test('Test cases to Create isLeaf:false PaymentMethodCharge', async () => {
    const paymentMethodCharge = {
      title: 'rupee',
      description: 'new Payment method',
      is_leaf: false,
      parent_id: parentId,
    };
    const response = await testApp
        .post('/admin/payment')
        .send(paymentMethodCharge);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });

  test('Test cases to Create isLeaf:true PaymentMethodCharge', async () => {
    const paymentMethodCharge1 = {
      title: 'rupee',
      description: 'new Payment method',
      is_leaf: true,
      parent_id: parentId,
      insturment_charge_id: instrumentchargeId,
    };
    const response = await testApp
        .post('/admin/payment')
        .send(paymentMethodCharge1);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });

  test('Test cases to PaymentMethodCharge Data Not Found', async () => {
    const paymentMethodCharge = {
      title: 'rupee',
      description: 'new Payment method',
      is_leaf: false,
    };
    const response = await testApp
        .post('/admin/payment')
        .send(paymentMethodCharge);
    expect(response.status).toEqual(404);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).not.toEqual(200);
  });

  test('Test cases to Invalid Instrument Charge', async () => {
    const paymentMethodCharge = {
      title: 'rupee',
      description: 'new Payment method',
      is_leaf: true,
      parent_id: parentId,
    };
    const response = await testApp
        .post('/admin/payment')
        .send(paymentMethodCharge);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual('Invalid Instrument Charge');
    expect(response.status).not.toEqual(200);
  });

  test('Test cases to Invalid Instrument Charge', async () => {
    const paymentMethodCharge = {
      title: 'rupee',
      description: 'new Payment method',
      is_leaf: true,
      parent_id: parentId,
      insturment_charge_id: 'b32daf6e-fafe-41b8-a481-f7a8ad00e01a',
    };
    const response = await testApp
        .post('/admin/payment')
        .send(paymentMethodCharge);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual('Invalid Instrument Charge');
    expect(response.status).not.toEqual(200);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

let id:any;
describe('Update PaymentMethodCharge', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async () => {
      await new PaymentInstrumentSeed().run();
    });
    id = (
      await getConnection(ormDBName).manager.query(
          `Select id from payment_instruments where title='rupee'`,
      )
    )[0].id;
  });

  test('Test cases to Create PaymentMethodCharge', async () => {
    const paymentMethodCharge = {
      title: 'rupee',
      description: 'new Payment method',
      is_leaf: false,
      parent_id: id,
    };
    const response = await testApp
        .post('/admin/payment/' + id)
        .send(paymentMethodCharge);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });

  test('Test cases to PaymentMethodCharge DataNotFound with Wrong id',
      async () => {
        const paymentMethodCharge = {
          title: 'rupee',
          description: 'new Payment method',
          is_leaf: false,
          parent_id: id,
        };
        id = '717a8a4c-3828-47cf-9115-44631871852b';
        const response = await testApp
            .post('/admin/payment/' + id)
            .send(paymentMethodCharge);
        expect(response.status).toEqual(404);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
        expect(response.status).not.toEqual(200);
      });

  test('Test cases to PaymentMethodCharge DataNotFound with Wrong parentId',
      async () => {
        const paymentMethodCharge = {
          title: 'rupee',
          description: 'new Payment method',
          is_leaf: false,
          parent_id: '717a8a4c-3828-47cf-9115-44631871852b',
        };
        const response = await testApp
            .post('/admin/payment/' + id)
            .send(paymentMethodCharge);
        expect(response.status).toEqual(404);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
        expect(response.status).not.toEqual(200);
      });

  // test('Test cases to Invalid Instrument Charge', async () => {
  //   const paymentMethodCharge = {
  //     'title': 'rupee',
  //     'description': 'new Payment method',
  //     'is_leaf': true,
  //     'insturment_charge_id':'b32daf6e-fafe-41b8-a481-f7a8ad00e01a'
  //   };
  //   const response = await testApp.post('/admin/payment/'+id)
  //     .send(paymentMethodCharge);
  //   expect(response.status).toEqual(404);
  //   const jsonResponse = JSON.parse(response.text);
  //   // console.log(jsonResponse)
  //   expect(jsonResponse.errors.error).toEqual('Invalid Instrument Charge');
  //   expect(response.status).not.toEqual(200);
  // });

  // test('Test cases to Invalid Instrument Charge', async () => {
  //   const paymentMethodCharge = {
  //     'title': 'rupee',
  //     'description': 'new Payment method',
  //     'is_leaf': true,
  //     'parent_id': id,
  //     'insturment_charge_id':'b32daf6e-fafe-41b8-a481-f7a8ad00e01a'
  //   };
  //   const response = await testApp.post('/admin/payment/'+id)
  //     .send(paymentMethodCharge);
  //   expect(response.status).toEqual(400);
  //   const jsonResponse = JSON.parse(response.text);
  //   expect(jsonResponse.errors.error).toEqual('Invalid Instrument Charge');
  //   expect(response.status).not.toEqual(200);
  // });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test for GET Payment Method Charge', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('GET /admin/payment', async () => {
    const response = await testApp.get('/admin/payment');
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET error /admin/payment', async () => {
    const response = await testApp.get('/admin/payments');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('Retreving /admin/payment/ for DataNotFound',
      async () => {
        await getConnection(ormDBName).manager.query(
            'TRUNCATE TABLE payment_instruments CASCADE',
        );
        const response = await testApp.get('/admin/payment/');
        const jsonResponse = JSON.parse(response.text);
        if (!jsonResponse) {
          expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
          expect(response.status).toEqual(404);
          expect(jsonResponse.success).toEqual(false);
          expect(response.status).not.toEqual(500);
        }
      });

  afterAll(async () => {
    await getConnection(ormDBName).manager.query(
        'TRUNCATE TABLE instrument_charges CASCADE',
    );
    await dbService.close();
  });
});
