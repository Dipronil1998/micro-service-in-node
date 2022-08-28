import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {httpDataNotFound,
  httpSuccessDataUpdate,
  ormDBName}
  from '../../../config/bootstrap';
const App = supertest(app.app);
import {getConnection} from 'typeorm';

describe('Test for GET Business Representative', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    await getConnection(ormDBName).manager
        .query(`INSERT INTO business_representatives(first_name, last_name, 
            email, job_title, date_of_birth ,business_address_line_1, 
            phone_number) VALUES ('TestFirstName','TestLastName',
            'test@test.com', 'TestJob', '2022-05-15' , 'TestAddress', 
            98745632156)`);
  });
  test('GET All Business Representative', async () => {
    const response = await App.get('/v1/merchant/businessrepresentative');
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET Error for wrong Routes', async () => {
    const response = await App.get('/v1/merchant/businessrepresentatives');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpDataNotFound);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });

  test('GET A Business Representative By Correct id',
      async () => {
        const validBusinessRepresentativeId:string =
        (await getConnection(ormDBName).manager
            .query(`SELECT id from business_representatives 
          where email= $1`, ['test@test.com']))[0].id;
        const response = await App.get('/v1/merchant/businessrepresentative/' +
      validBusinessRepresentativeId);
        expect(response.body).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(201);
      });
  test('GET Error For Business Representative By Wrong id',
      async () => {
        const inValidBankdetailsId: string =
          'b78f7c9d-51eb-4443-a67b-0cdd21f8b390';
        const response = await App.get('/v1/merchant/businessrepresentative/' +
            inValidBankdetailsId);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.body).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retriving Data For Business Representative Details',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE business_representatives CASCADE');
        const response = await App.get('/v1/merchant/businessrepresentative/');
        const jsonResponse = JSON.parse(response.text);
        if (!jsonResponse) {
          expect(jsonResponse.errors.error)
              .toEqual(httpDataNotFound);
          expect(response.body).toBeDefined();
          expect(response.status).toBeDefined();
          expect(response.status).toEqual(404);
          expect(jsonResponse.success).toEqual(false);
          expect(response.status).not.toEqual(500);
        }
      });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test for UPDATE Business Representative', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    await getConnection(ormDBName).manager
        .query(`INSERT INTO business_representatives(first_name, last_name, 
            email, job_title, date_of_birth ,business_address_line_1, 
            phone_number) VALUES ('TestFirstName','TestLastName',
            'test@test.com', 'TestJob', '2022-05-15' , 'TestAddress', 
            98745632156)`);
  });
  test('Update Full Data By Id', async () => {
    const updateData = {
      'business_representative_first_name': 'Partha',
      'business_representative_middle_name': 'Kumar',
      'business_representative_last_name': 'Saha',
      'business_representative_email': 'partha@email.com',
      'business_representative_job_title': 'CEO',
      'business_representative_date_of_birth': '1997-01-25',
      'business_representative_business_address_line_1': 'NewTown',
      'business_representative_business_address_line_2': 'Pune',
      'business_representative_business_address_line_3': 'Howrah',
      'business_representative_phone_number': '9804633999',
    };
    const validBusinessRepresentativeId:string =
        (await getConnection(ormDBName).manager
            .query(`SELECT id from business_representatives 
          where email= $1`, ['test@test.com']))[0].id;
    const response = await App.put('/v1/merchant/businessrepresentative/' +
    validBusinessRepresentativeId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Update Business Representative First Name By Id', async () => {
    const updateData = {
      'business_representative_first_name': 'ParthaTest',
    };
    const validBankdetailsId:string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_representatives`))[0].id;
    const response = await App.put('/v1/merchant/businessrepresentative/' +
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
  test('Update Business Representative Middle Name By Id', async () => {
    const updateData = {
      'business_representative_middle_name': 'KumarTest',
    };
    const validBankdetailsId:string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_representatives`))[0].id;
    const response = await App.put('/v1/merchant/businessrepresentative/' +
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
  test('Update Business Representative Last Name By Id', async () => {
    const updateData = {
      'business_representative_last_name': 'SahaTest',
    };
    const validBankdetailsId:string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_representatives`))[0].id;
    const response = await App.put('/v1/merchant/businessrepresentative/' +
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
  test('Update Email By Id', async () => {
    const updateData = {
      'business_representative_email': 'parthatest@email.com',
    };
    const validBankdetailsId:string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_representatives`))[0].id;
    const response = await App.put('/v1/merchant/businessrepresentative/' +
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
  test('Update Job By Id', async () => {
    const updateData = {
      'business_bank_detail_is_primary': true,
    };
    const validBankdetailsId:string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_representatives`))[0].id;
    const response = await App.put('/v1/merchant/businessrepresentative/' +
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
  test('Update Business Representative Details by Wrong Id', async () => {
    const updateData = {
      'business_representative_first_name': 'Partha',
      'business_representative_middle_name': 'Kumar',
      'business_representative_last_name': 'Saha',
      'business_representative_email': 'partha@email.com',
      'business_representative_job_title': 'CEO',
      'business_representative_date_of_birth': '1997-01-25',
      'business_representative_business_address_line_1': 'NewTown',
      'business_representative_business_address_line_2': 'Pune',
      'business_representative_business_address_line_3': 'Howrah',
      'business_representative_phone_number': '9804633999',
    };
    const inValidBankdetailsId:string = 'e6c07ced-2e42-47c5-88fb-a7ae49822320';
    const response = await App.put('/v1/merchant/businessrepresentative/' +
    inValidBankdetailsId).send(updateData);
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
        .query('TRUNCATE TABLE business_representatives CASCADE');
    await dbService.close();
  });
});

describe(`Test for UPDATE Business Bank Details By Merchant Id and 
Business Id`, () => {
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
  test(`Update Business Representative By Valid Merchant, 
  Business And Bank Details Id`, async () => {
    const updateData = {
      'business_representative_first_name': 'ParthaUpdate',
      'business_representative_middle_name': 'KumarUpdate',
      'business_representative_last_name': 'SahaUpdate',
      'business_representative_email': 'parthaUpdate@email.com',
      'business_representative_job_title': 'CEOUpdate',
      'business_representative_date_of_birth': '1996-01-25',
      'business_representative_business_address_line_1': 'NewTownUpdate',
      'business_representative_business_address_line_2': 'PuneUpdate',
      'business_representative_business_address_line_3': 'HowrahUpdate',
      'business_representative_phone_number': '9804633999',
    };
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const validMerchantId: string = getId[0].merchant_id;
    const validBusinessId: string = getId[0].id;
    const response =await App.put('/v1/merchant/' + validMerchantId +
    '/business/' + validBusinessId + '/businessrepresentative')
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(400);
    expect(response.status).not.toEqual(500);
  });
  test(`Update Business Bank Details By Valid Merchant Id And Invalid 
  Business Id`, async () => {
    const updateData = {
      'business_representative_first_name': 'ParthaUpdate',
      'business_representative_middle_name': 'KumarUpdate',
      'business_representative_last_name': 'SahaUpdate',
      'business_representative_email': 'parthaUpdate@email.com',
      'business_representative_job_title': 'CEOUpdate',
      'business_representative_date_of_birth': '1996-01-25',
      'business_representative_business_address_line_1': 'NewTownUpdate',
      'business_representative_business_address_line_2': 'PuneUpdate',
      'business_representative_business_address_line_3': 'HowrahUpdate',
      'business_representative_phone_number': '9804633999',
    };
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const validMerchantId: string = getId[0].merchant_id;
    const inValidBusinessId: string = 'c1c77778-a8e3-4cde-a705-d239d0292f91';
    const response =await App.put('/v1/merchant/' + validMerchantId +
    '/business/' + inValidBusinessId + '/businessrepresentative')
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
  test(`Update Business Bank Details By InValid Merchant Id And Valid 
  Business Id`, async () => {
    const updateData = {
      'business_representative_first_name': 'ParthaUpdate',
      'business_representative_middle_name': 'KumarUpdate',
      'business_representative_last_name': 'SahaUpdate',
      'business_representative_email': 'parthaUpdate@email.com',
      'business_representative_job_title': 'CEOUpdate',
      'business_representative_date_of_birth': '1996-01-25',
      'business_representative_business_address_line_1': 'NewTownUpdate',
      'business_representative_business_address_line_2': 'PuneUpdate',
      'business_representative_business_address_line_3': 'HowrahUpdate',
      'business_representative_phone_number': '9804633999',
    };
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const inValidMerchantId: string = '6f8c21af-1fda-4c71-9102-e44271137f8e';
    const validBusinessId: string = getId[0].id;
    const response =await App.put('/v1/merchant/' + inValidMerchantId +
    '/business/' + validBusinessId + '/businessrepresentative')
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
  test(`Update Business Bank Details By InValid Merchant Id And Valid 
  Business Id`, async () => {
    const updateData = {
      'business_representative_first_name': 'ParthaUpdate',
      'business_representative_middle_name': 'KumarUpdate',
      'business_representative_last_name': 'SahaUpdate',
      'business_representative_email': 'parthaUpdate@email.com',
      'business_representative_job_title': 'CEOUpdate',
      'business_representative_date_of_birth': '1996-01-25',
      'business_representative_business_address_line_1': 'NewTownUpdate',
      'business_representative_business_address_line_2': 'PuneUpdate',
      'business_representative_business_address_line_3': 'HowrahUpdate',
      'business_representative_phone_number': '9804633999',
    };
    const inValidMerchantId: string = '0bfe4490-272f-41ab-9477-2600dc7691a5';
    const inValidBusinessId: string = '32f9ea74-2cd7-4004-9cc3-2318a52593af';
    const response =await App.put('/v1/merchant/' + inValidMerchantId +
    '/business/' + inValidBusinessId + '/businessrepresentative')
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
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_representatives CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE merchants CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_bank_details CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_owners CASCADE');
    await dbService.close();
  });
});
