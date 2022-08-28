import supertest from 'supertest';
import {DBService} from '../../service/DBService';
import {httpDataNotFound, httpPageNotFoundMessage,
  httpSuccessDataAdded, httpSuccessDataUpdate, ormDBName}
  from '../../../config/bootstrap';
import {getConnection} from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import {ErrorHandlerMiddleware} from '../../middleware/ErrorHandlerMiddleware';
import {InstrumentChargeController} from '../InstrumentChargeController';
import {PageNotFoundMiddleware} from '../../middleware/PageNotFoundMiddleware';
const app: express.Application = express();
app.use(bodyParser.json());

app.post('/instumentcharge/create', new InstrumentChargeController().create);
app.get('/instumentcharge', new InstrumentChargeController().find);
app.put('/instumentcharge/update/:id', new InstrumentChargeController().update);
app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);

const testApp = supertest(app);

describe('POST /instrumentcharge/create', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });

  test('Test For Create Instument Charge', async () => {
    const instumentCharge = {
      'amount': 650,
      'flat_fees': 665,
      'percent_fees': 25,
      'min_fees': 10,
      'max_fees': 100,
    };
    const response = await testApp.post('/instumentcharge/create')
        .send(instumentCharge);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.info.message).toEqual(httpSuccessDataAdded);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Page Not Found', async () => {
    const instumentCharge = {
      'amount': 650,
      'flat_fees': 665,
      'percent_fees': 25,
      'min_fees': 10,
      'max_fees': 100,
    };
    const response = await testApp.post('/instumentcharges/create')
        .send(instumentCharge);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(404);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Invalid Input For Amount', async () => {
    const instumentCharge = {
      'amount': 'invalid',
      'flat_fees': 665,
      'percent_fees': 25,
      'min_fees': 10,
      'max_fees': 100,
    };
    const response = await testApp.post('/instumentcharge/create')
        .send(instumentCharge);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error).toEqual('Invalid Input');
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Invalid Input For Flat Fees', async () => {
    const instumentCharge = {
      'amount': 650,
      'flat_fees': 'invalid',
      'percent_fees': 25,
      'min_fees': 10,
      'max_fees': 100,
    };
    const response = await testApp.post('/instumentcharge/create')
        .send(instumentCharge);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error).toEqual('Invalid Input');
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Invalid Input For Percent Fees', async () => {
    const instumentCharge = {
      'amount': 650,
      'flat_fees': 665,
      'percent_fees': 'invalid',
      'min_fees': 10,
      'max_fees': 100,
    };
    const response = await testApp.post('/instumentcharge/create')
        .send(instumentCharge);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error).toEqual('Invalid Input');
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Invalid Input For Max Fees', async () => {
    const instumentCharge = {
      'amount': 650,
      'flat_fees': 665,
      'percent_fees': 25,
      'min_fees': 'invalid',
      'max_fees': 100,
    };
    const response = await testApp.post('/instumentcharge/create')
        .send(instumentCharge);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error).toEqual('Invalid Input');
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Invalid Input For Max Fees', async () => {
    const instumentCharge = {
      'amount': 650,
      'flat_fees': 665,
      'percent_fees': 25,
      'min_fees': 10,
      'max_fees': 'invalid',
    };
    const response = await testApp.post('/instumentcharge/create')
        .send(instumentCharge);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error).toEqual('Invalid Input');
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE instrument_charges CASCADE');
    await dbService.close();
  });
});

describe('GET /instrumentcharge/create', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const instumentCharge = {
      'amount': 650,
      'flat_fees': 665,
      'percent_fees': 25,
      'min_fees': 10,
      'max_fees': 100,
    };
    await testApp.post('/instumentcharge/create').send(instumentCharge);
  });

  test('Test For Get Information of Instument Charge', async () => {
    const response = await testApp.get('/instumentcharge');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Information of Instument Charge', async () => {
    const response = await testApp.get('/instumentcharges');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(404);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Data Not Found of Instument Charge', async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE instrument_charges CASCADE');
    const response = await testApp.get('/instumentcharge');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('PUT /instrumentcharge/update/:id', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const instumentCharge = {
      'amount': 650,
      'flat_fees': 665,
      'percent_fees': 25,
      'min_fees': 10,
      'max_fees': 100,
    };
    await testApp.post('/instumentcharge/create').send(instumentCharge);
  });

  test('Test For Update Data Of Amount', async () => {
    const updateData = {
      'amount': 750,
    };
    const id = (await getConnection(ormDBName).manager
        .query('select id from instrument_charges'))[0].id;
    const response = await testApp.put('/instumentcharge/update/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Update Data Of Flat Fees', async () => {
    const updateData = {
      'flat_fees': 668,
    };
    const id = (await getConnection(ormDBName).manager
        .query('select id from instrument_charges'))[0].id;
    const response = await testApp.put('/instumentcharge/update/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Update Data Of Percent Fees', async () => {
    const updateData = {
      'percent_fees': 30,
    };
    const id = (await getConnection(ormDBName).manager
        .query('select id from instrument_charges'))[0].id;
    const response = await testApp.put('/instumentcharge/update/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Update Data Of Min Fees', async () => {
    const updateData = {
      'min_fees': 15,
    };
    const id = (await getConnection(ormDBName).manager
        .query('select id from instrument_charges'))[0].id;
    const response = await testApp.put('/instumentcharge/update/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Update Data Of Max Fees', async () => {
    const updateData = {
      'max_fees': 150,
    };
    const id = (await getConnection(ormDBName).manager
        .query('select id from instrument_charges'))[0].id;
    const response = await testApp.put('/instumentcharge/update/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Update Data Wrong Instument Charge', async () => {
    const updateData = {
      'amount': 650,
      'flat_fees': 665,
      'percent_fees': 25,
      'min_fees': 10,
      'max_fees': 100,
    };
    const id = 'b500db54-2dc4-4b2b-80ae-05631ef5e251';
    const response = await testApp.put('/instumentcharge/update/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(404);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE instrument_charges CASCADE');
    await dbService.close();
  });
});
