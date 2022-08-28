import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {
  httpDataNotFound,
  httpSuccessDataUpdate,
  ormDBName,
}
  from '../../../config/bootstrap';
const App = supertest(app.app);
import {getConnection} from 'typeorm';

describe('Test for GET /businessOwner', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    await getConnection(ormDBName).manager
        .query(`INSERT INTO business_owners(first_name,
          last_name, email) VALUES('Dipronil','Das','dipronil@gmail.com')`);
  });
  test('GET All Business Owner', async () => {
    const response = await App.get('/v1/merchant/businessowner');
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET Error for wrong Routes', async () => {
    const response = await App.get('/v1/merchant/businessowners');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET A Particular Owner By Correct id', async () => {
    const validBusinessOwnerId: string = (await getConnection(ormDBName).manager
        .query(`select id from business_owners where email = $1`,
            ['dipronil@gmail.com']))[0].id;
    const response = await App.get(
        '/v1/merchant/businessowner/' + validBusinessOwnerId);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET Error For Business Owner By Wrong id',
      async () => {
        const inValidBusinessOwnerId: string =
        'b07826ca-7e3e-47a3-8771-b4a4868c0382';
        const response = await App.get('/v1/merchant/businessowner/' +
        inValidBusinessOwnerId);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retriving Data For Blank Owner',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE business_owners CASCADE');
        const response = await App.get('/v1/merchant/businessowner/');
        const jsonResponse = JSON.parse(response.text);
        if (!jsonResponse) {
          expect(jsonResponse.errors.error)
              .toEqual(httpDataNotFound);
          expect(response.status).toEqual(404);
          expect(jsonResponse.success).toEqual(false);
          expect(response.status).not.toEqual(500);
        }
      });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test for Update BusinessOwner  PUT /businessOwner/:id', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    await getConnection(ormDBName).manager
        .query(`INSERT INTO business_owners(id,first_name,
          last_name, email) VALUES(
            '13edabce-d136-4d03-b1b8-4e6cca595f95','Dipronil',
                'Das','dipronil@gmail.com')`);
  });

  test('Update BusinessOwner Data By Id', async () => {
    const updateData = {
      'business_owner_first_name': 'Dipro',
      'business_owner_middle_name': 'Nil',
      'business_owner_last_name': 'Das',
      'business_owner_email': 'dipro98@gmail.com',
    };
    const validBankdetailsId: string = '13edabce-d136-4d03-b1b8-4e6cca595f95';
    const response = await App.put('/v1/merchant/businessowner/' +
      validBankdetailsId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update owner first name By Id', async () => {
    const updateData = {
      'business_owner_first_name': 'Dipro',
    };
    const validBankdetailsId: string = '13edabce-d136-4d03-b1b8-4e6cca595f95';
    const response = await App.put('/v1/merchant/businessowner/' +
      validBankdetailsId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update owner middle name By Id', async () => {
    const updateData = {
      'business_owner_middle_name': 'Nil',
    };
    const validBankdetailsId: string = '13edabce-d136-4d03-b1b8-4e6cca595f95';
    const response = await App.put('/v1/merchant/businessowner/' +
      validBankdetailsId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update owner last name By Id', async () => {
    const updateData = {
      'business_owner_last_name': 'Das',
    };
    const validBankdetailsId: string = '13edabce-d136-4d03-b1b8-4e6cca595f95';
    const response = await App.put('/v1/merchant/businessowner/' +
      validBankdetailsId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update owner email By Id', async () => {
    const updateData = {
      'business_owner_email': 'dipro98@gmail.com',
    };
    const validBankdetailsId: string = '13edabce-d136-4d03-b1b8-4e6cca595f95';
    const response = await App.put('/v1/merchant/businessowner/' +
      validBankdetailsId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update black data By Id', async () => {
    const updateData = {

    };
    const validBankdetailsId: string = '13edabce-d136-4d03-b1b8-4e6cca595f95';
    const response = await App.put('/v1/merchant/businessowner/' +
      validBankdetailsId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Error For Business Owner By Wrong id',
      async () => {
        const validBankdetailsId: string = '13edabce-d136-4d03-b1b8-4e6cca5';
        const updateData = {
          'business_owner_email': 'dipro98@gmail.com',
        };
        const response = await App.put('/v1/merchant/businessowner/' +
        validBankdetailsId).send(updateData);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Error For unknown Owner',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE business_owners CASCADE');

        const updateData = {

        };
        const validBankdetailsId: string =
        '13edabce-d136-4d03-b1b8-4e6cca595f95';
        const response = await App.put('/v1/merchant/businessowner/' +
        validBankdetailsId).send(updateData);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });

  afterAll(async () => {
    await dbService.close();
  });
});

describe(`Test for Update MerchantBusinessOwner By
  MerchantID and BusinessProfileID`, () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const merchant = {
      'business_representative_first_name': 'Partha',
      'business_representative_last_name': 'Saha',
      'business_representative_email': 'partha@gmail.com',
      'business_representative_job_title': 'hhhh',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'kolkata',
      'business_representative_phone_number': 9804633142,
      'merchant_code': 'kkk',
      'merchant_title': 'jjj',
      'merchant_subcription_type': 'ghif',
      'business_name': 'doctor house',
      'registration_number': '55555555',
      'business_phone_number': 9804633142,
      'business_fax_number': 9804633142,
      'business_owner_first_name': 'Dipronil',
      'business_owner_last_name': 'Das',
      'business_owner_email': 'dipronil@email.com',
      'account_holder_name': 'Arnab',
      'account_number': '919804633142',
      'branch_name': 'Hooghly',
      'country_specific_branch_code': '12345678',
      'business_bank_detail_is_primary': true,
      'merchant_business_profile_business_address_line_1': 'Chinchura',
      'no_of_documents': 0,
    };
    await App.post('/v1/merchant').send(merchant);
  });
  test('update Merchant BusinesOwner Data By businessId', async () => {
    const updateData = {
      'business_owner_first_name': 'Dipro',
      'business_owner_middle_name': 'Nil',
      'business_owner_last_name': 'Das',
      'business_owner_email': 'dipro98@gmail.com',
    };

    let businessId: any = await getConnection(ormDBName).manager
        .query(`SELECT merchant_business_profile_id FROM business_owners`);
    businessId = businessId[0].merchant_business_profile_id;

    let merchantId: any = await getConnection(ormDBName).manager
        .query('SELECT merchant_id FROM merchant_business_profiles WHERE id=$1',
            [businessId]);
    merchantId = merchantId[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' +
        businessId + '/businessowner').send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('update Merchant BusinesOwner FirstName Data By businessId',
      async () => {
        const updateData = {
          'business_owner_first_name': 'Dipro',
        };
        let businessId: any = await getConnection(ormDBName).manager
            .query(`SELECT merchant_business_profile_id FROM business_owners`);
        businessId = businessId[0].merchant_business_profile_id;

        let merchantId: any = await getConnection(ormDBName).manager
            .query(
                `SELECT merchant_id FROM 
                merchant_business_profiles WHERE id=$1`, [businessId]);
        merchantId = merchantId[0].merchant_id;

        const response = await App
            .put('/v1/merchant/' + merchantId + '/business/' +
          businessId + '/businessowner').send(updateData);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
        expect(response.body).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.status).not.toEqual(404);
        expect(response.status).not.toEqual(500);
      });
  test('update Merchant BusinesOwner MiddleName Data By businessId',
      async () => {
        const updateData = {
          'business_owner_middle_name': 'Nil',
        };
        let businessId: any = await getConnection(ormDBName).manager
            .query(`SELECT merchant_business_profile_id FROM business_owners`);
        businessId = businessId[0].merchant_business_profile_id;

        let merchantId: any = await getConnection(ormDBName).manager
            .query(
                `SELECT merchant_id FROM
                merchant_business_profiles WHERE id=$1`, [businessId]);
        merchantId = merchantId[0].merchant_id;

        const response = await App
            .put('/v1/merchant/' + merchantId + '/business/' +
          businessId + '/businessowner').send(updateData);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
        expect(response.body).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.status).not.toEqual(404);
        expect(response.status).not.toEqual(500);
      });
  test('update Merchant BusinesOwner LastName Data By businessId', async () => {
    const updateData = {
      'business_owner_last_name': 'Das',
    };
    let businessId: any = await getConnection(ormDBName).manager
        .query(`SELECT merchant_business_profile_id FROM business_owners`);
    businessId = businessId[0].merchant_business_profile_id;

    let merchantId: any = await getConnection(ormDBName).manager
        .query('SELECT merchant_id FROM merchant_business_profiles WHERE id=$1',
            [businessId]);
    merchantId = merchantId[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' +
        businessId + '/businessowner').send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('update Merchant BusinesOwner Data By Email businessId', async () => {
    const updateData = {
      'business_owner_email': 'dipro98@gmail.com',
    };
    let businessId: any = await getConnection(ormDBName).manager
        .query(`SELECT merchant_business_profile_id FROM business_owners`);
    businessId = businessId[0].merchant_business_profile_id;

    let merchantId: any = await getConnection(ormDBName).manager
        .query('SELECT merchant_id FROM merchant_business_profiles WHERE id=$1',
            [businessId]);
    merchantId = merchantId[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' +
        businessId + '/businessowner').send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('update Merchant BusinesOwner Data By businessId', async () => {
    const updateData = {

    };
    let businessId: any = await getConnection(ormDBName).manager
        .query(`SELECT merchant_business_profile_id FROM business_owners`);
    businessId = businessId[0].merchant_business_profile_id;

    let merchantId: any = await getConnection(ormDBName).manager
        .query('SELECT merchant_id FROM merchant_business_profiles WHERE id=$1',
            [businessId]);
    merchantId = merchantId[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' +
        businessId + '/businessowner').send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Error For update Merchant BusinesOwner Data By businessId',
      async () => {
        const updateData = {
          'business_owner_email': 'dipro98@gmail.com',
        };
        const merchantId: any = '9db31ac9-006e-43cf-bc77-3164c6ba95ac';
        const businessId: any = '06411238-131a-42dd-b716-81adb2d834c4';

        const response = await App
            .put('/v1/merchant/' + merchantId + '/business/' +
          businessId + '/businessowner').send(updateData);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });

  afterAll(async () => {
    async () => {
      await getConnection(ormDBName).manager
          .query('TRUNCATE TABLE business_owners CASCADE');
      await getConnection(ormDBName).manager
          .query('TRUNCATE TABLE merchant_business_profiles CASCADE');
      await getConnection(ormDBName).manager
          .query('TRUNCATE TABLE merchants CASCADE');

      await dbService.close();
    };
  });
});
