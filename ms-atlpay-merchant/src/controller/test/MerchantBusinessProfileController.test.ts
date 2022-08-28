import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {httpDataNotFound, httpSuccessDataUpdate, ormDBName}
  from '../../../config/bootstrap';
import {getConnection} from 'typeorm';
const App = supertest(app.app);

describe('Test for GET MerchantBusinessProfile', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    await getConnection(ormDBName).manager
        .query(`
        INSERT INTO merchant_business_profiles(
          business_name, registration_number,
          business_role_text,business_address_line_1,
          business_phone_number)
          VALUES ('doctor house','55555555','CTO','Chinchura','9804633142');
        `);
  });
  test('GET /merchantbusinessprofile', async () => {
    const response = await App
        .get('/v1/merchant/merchantbusinessprofile');
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(404);
  });
  test('GET error /merchantbusinessprofile', async () => {
    const response = await App
        .get('/v1/merchant/merchantbusinessprofiles');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET /merchantbusinessprofile/:id',
      async () => {
        const businessProfileId: string =
        (await getConnection(ormDBName).manager
            .query(`SELECT id FROM merchant_business_profiles 
            where business_name= $1`, ['doctor house']))[0].id;
        const response = await App
            .get('/v1/merchant/merchantbusinessprofile/' + businessProfileId);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(201);
      });
  test(`Retreving for invalid registration_number GET
        /merchantbusinessprofile/:registrationnumber`,
  async () => {
    const registrationnumber: string = '41235612';
    const response = await App
        .get('/v1/merchant/merchantbusinessprofile/' +
          registrationnumber);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('Retreving DataNotFound GET /merchantbusinessprofile/',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE merchant_business_profiles CASCADE');
        const response = await App
            .get('/v1/merchant/merchantbusinessprofile/');
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

describe('Test For Enable/Disable Merchant By Merchant Id', () => {
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
      'business_owner_email': 'dipronil@gmail.com',
      'account_holder_name': 'Arnab',
      'account_number': '919804633142',
      'branch_name': 'Hooghly',
      'country_specific_branch_code': '12345678',
      'business_bank_detail_is_primary': true,
      'merchant_business_profile_business_address_line_1': 'Chinchura',
      'no_of_documents': 0,
    };
    await App.post('/v1/merchant')
        .send(merchant);
  });
  test('Disable Merchant Business Profile By Valid Merchant Id And Business Id',
      async () => {
        const updateData = {
          '_disabledUntil': new Date(),
        };
        const getId = await getConnection(ormDBName).manager
            .query('SELECT id,merchant_id FROM merchant_business_profiles');
        const validBusinessId: string = getId[0].id;
        const validMerchantId: string = getId[0].merchant_id;
        const response = await App.put(
            '/v1/merchant/' + validMerchantId + '/business/' + validBusinessId +
        '/disable').send(updateData);
        expect(response.body).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.info.message).toEqual('Data Updated Successfully');
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(201);
      });
  test(`Disable Merchant Business Profile By Valid Merchant Id And Invalid 
  Business Id`, async () => {
    const updateData = {
      '_disabledUntil': new Date(),
    };
    const getId = await getConnection(ormDBName).manager
        .query('SELECT id,merchant_id FROM merchant_business_profiles');
    const validBusinessId: string = getId[0].id;
    const InValidMerchantId: string = 'f1c4d585-af0c-49bf-8c39-2c61e02f2996';
    const response = await App.put(
        '/v1/merchant/' + validBusinessId + '/business/' + InValidMerchantId +
      '/disable').send(updateData);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(201);
  });
  test(`Disable Merchant Business Profile By Invalid Merchant Id And Valid 
  Business Id`, async () => {
    const updateData = {
      '_disabledUntil': new Date(),
    };
    const getId = await getConnection(ormDBName).manager
        .query('SELECT id,merchant_id FROM merchant_business_profiles');
    const inValidBusinessId: string = 'cf3b32fd-02e7-4352-93b4-8f8a46dc60c2';
    const validMerchantId: string = getId[0].merchant_id;
    const response = await App.put(
        '/v1/merchant/' + validMerchantId + '/business/' + inValidBusinessId +
      '/disable').send(updateData);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(201);
  });
  test(`Disable Merchant Business Profile By Invalid Merchant Id And 
  Business Id`, async () => {
    const updateData = {
      '_disabledUntil': new Date(),
    };
    const inValidBusinessId: string =
      'd356deb4-cea5-4cf5-ac95-a43b6bd48bd9';
    const inValidMerchantId: string =
      'c666a47b-4674-48c6-957f-dbe85e2e3c2d';
    const response = await App.put(
        '/v1/merchant/' + inValidMerchantId + '/business/' +
      inValidBusinessId + '/disable').send(updateData);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(201);
  });


  test(`Enable Merchant Business Profile By Valid Merchant Id And Business Id`,
      async () => {
        const updateData = {
          '_disabledUntil': null,
        };
        const getId = await getConnection(ormDBName).manager
            .query('SELECT id,merchant_id FROM merchant_business_profiles');
        const validBusinessId: string = getId[0].id;
        const validMerchantId: string = getId[0].merchant_id;
        const response = await App.put(
            '/v1/merchant/' + validMerchantId + '/business/' + validBusinessId +
        '/enable').send(updateData);
        expect(response.body).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.info.message).toEqual('Data Updated Successfully');
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(201);
      });
  test(`Enable Merchant Business Profile By Valid Merchant Id And Invalid 
  Business Id`, async () => {
    const updateData = {
      '_disabledUntil': null,
    };
    const getId = await getConnection(ormDBName).manager
        .query('SELECT id,merchant_id FROM merchant_business_profiles');
    const inValidBusinessId: string = '0a2d2738-ff14-4079-87fa-2cce3c9e65d2';
    const validMerchantId: string = getId[0].merchant_id;
    const response = await App.put(
        '/v1/merchant/' + validMerchantId + '/business/' + inValidBusinessId +
      '/enable').send(updateData);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(201);
  });
  test(`Enable Merchant Business Profile By Invalid Merchant Id And 
  Valid Business Id`, async () => {
    const updateData = {
      '_disabledUntil': new Date(),
    };
    const getId = await getConnection(ormDBName).manager
        .query('SELECT id,merchant_id FROM merchant_business_profiles');
    const validBusinessId: string = getId[0].id;
    const inValidMerchantId: string = 'cdaff40c-ab53-43fa-8bad-d32066e8f99c';
    const response = await App.put(
        '/v1/merchant/' + inValidMerchantId + '/business/' + validBusinessId +
      '/disable').send(updateData);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(201);
  });
  test(`Disable Merchant Business Profile By Invalid Merchant Id 
  And Business Id`, async () => {
    const updateData = {
      '_disabledUntil': new Date(),
    };
    const inValidBusinessId: string =
      '9661ed1d-ff6d-445d-bdaa-694230bc3606';
    const validMerchantId: string = 'b405264d-d4c2-4252-9ffb-71dcc3d541bd';
    const response = await App.put(
        '/v1/merchant/' + validMerchantId + '/business/' + inValidBusinessId +
      '/disable').send(updateData);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(201);
  });
  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE merchant_business_profiles CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_representatives CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE merchants CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE merchant_business_profiles CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_owners CASCADE');
    await dbService.close();
  });
});

describe('Test for UPDATE Business Profile ', () => {
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
  test('Update Full Data By Id', async () => {
    const updateData = {
      'business_name': 'doctor house',
      'registration_number': '55555555',
      'business_legal_entity_type': 'REGULAR',
      'business_role_text': 'CEO',
      'business_website': 'https://www.agpaytech.co.uk/',
      'merchant_business_profile_business_address_line_1': 'kolkata',
      'merchant_business_profile_business_address_line_2': 'kolkata',
      'merchant_business_profile_business_address_line_3': 'kolkata',
      'business_city': 'kolkata',
      'business_region': 'WB',
      'business_post_code': '4353456436',
      'business_phone_number': 9804633142,
      'business_email': 'abc@email.com',
      'business_fax_number': 9804633142,
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App
        .put('/v1/merchant/merchantbusinessprofile/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Name By Id', async () => {
    const updateData = {
      'business_name': 'Update Account Holder',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Registration Number By Id', async () => {
    const updateData = {
      'registration_number': '888888888888',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Name By Id', async () => {
    const updateData = {
      'business_legal_entity_type': 'Regular',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Role Text By Id', async () => {
    const updateData = {
      'business_role_text': 'CEO',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Website By Id', async () => {
    const updateData = {
      'business_website': 'https://www.agpaytech.co.uk/',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Address Line_1 By Id', async () => {
    const updateData = {
      'merchant_business_profile_business_address_line_1': 'Kolkata',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Address Line_2 By Id', async () => {
    const updateData = {
      'merchant_business_profile_business_address_line_2': 'Kolkata',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Address Line_3 By Id', async () => {
    const updateData = {
      'merchant_business_profile_business_address_line_3': 'Kolkata',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business City By Id', async () => {
    const updateData = {
      'business_city': 'Kolkata',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Region By Id', async () => {
    const updateData = {
      'business_region': 'Kolkata',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Post Code By Id', async () => {
    const updateData = {
      'business_post_code': '45234535',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Phone Number By Id', async () => {
    const updateData = {
      'business_phone_number': '1234567890',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Email By Id', async () => {
    const updateData = {
      'business_email': 'abc@email.com',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Fax Number By Id', async () => {
    const updateData = {
      'business_fax_number': '888888888',
    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Blank Business Profile By Id', async () => {
    const updateData = {

    };
    const id: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from merchant_business_profiles`))[0].id;
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Profile by Wrong Id', async () => {
    const updateData = {
      'business_fax_number': '888888888',
    };
    const id: string = 'e6c07ced-2e42-47c5-88fb-a7ae49822320';
    const response = await App.put('/v1/merchant/merchantbusinessprofile/' +
      id).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(400);
    expect(response.status).not.toEqual(500);
  });
  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE merchant_business_profiles CASCADE');
    await dbService.close();
  });
});

describe('Test for UPDATE Business Profile By MerchantId ', () => {
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
  test('Update Full Data By Id', async () => {
    const updateData = {
      'business_name': 'doctor house',
      'registration_number': '55555555',
      'business_legal_entity_type': 'REGULAR',
      'business_role_text': 'CEO',
      'business_website': 'https://www.agpaytech.co.uk/',
      'merchant_business_profile_business_address_line_1': 'kolkata',
      'merchant_business_profile_business_address_line_2': 'kolkata',
      'merchant_business_profile_business_address_line_3': 'kolkata',
      'business_city': 'kolkata',
      'business_region': 'WB',
      'business_post_code': '4353456436',
      'business_phone_number': 9804633142,
      'business_email': 'abc@email.com',
      'business_fax_number': 9804633142,
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const merchantId = ids[0].merchant_id;
    const id = ids[0].id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Name By Id', async () => {
    const updateData = {
      'business_name': 'Update Account Holder',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Registration Number By Id', async () => {
    const updateData = {
      'registration_number': '888888888888',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Name By Id', async () => {
    const updateData = {
      'business_legal_entity_type': 'Regular',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Role Text By Id', async () => {
    const updateData = {
      'business_role_text': 'CEO',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Website By Id', async () => {
    const updateData = {
      'business_website': 'https://www.agpaytech.co.uk/',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Address Line_1 By Id', async () => {
    const updateData = {
      'merchant_business_profile_business_address_line_1': 'Kolkata',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Address Line_2 By Id', async () => {
    const updateData = {
      'merchant_business_profile_business_address_line_2': 'Kolkata',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Address Line_3 By Id', async () => {
    const updateData = {
      'merchant_business_profile_business_address_line_3': 'Kolkata',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business City By Id', async () => {
    const updateData = {
      'business_city': 'Kolkata',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Region By Id', async () => {
    const updateData = {
      'business_region': 'Kolkata',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Post Code By Id', async () => {
    const updateData = {
      'business_post_code': '45234535',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Phone Number By Id', async () => {
    const updateData = {
      'business_phone_number': '1234567890',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Email By Id', async () => {
    const updateData = {
      'business_email': 'abc@email.com',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Fax Number By Id', async () => {
    const updateData = {
      'business_fax_number': '888888888',
    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Blank Business Profile By Id', async () => {
    const updateData = {

    };
    const ids = await getConnection(ormDBName).manager
        .query(`SELECT id, merchant_id from merchant_business_profiles`);
    const id = ids[0].id;
    const merchantId = ids[0].merchant_id;

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Profile by Wrong Id', async () => {
    const updateData = {
      'business_fax_number': '888888888',
    };
    const id = 'e6c07ced-2e42-47c5-88fb-a7ae49822320';
    const merchantId = 'e6c07ced-2e42-47c5-88fb-a7ae49822320';

    const response = await App
        .put('/v1/merchant/' + merchantId + '/business/' + id)
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(400);
    expect(response.status).not.toEqual(500);
  });
  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE merchant_business_profiles CASCADE');
    await dbService.close();
  });
});
