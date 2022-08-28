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

describe('Test for GET /businessbankdetail', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    await getConnection(ormDBName).manager
        .query(`INSERT INTO business_bank_details(account_holder_name,
          account_number, branch_name,country_specific_branch_code, is_primary)
          VALUES('Test User','9804633141','Test Branch', 'TESTCODE', true)`);
  });
  test('GET All Bank Details', async () => {
    const response = await App.get('/v1/merchant/businessbankdetails');
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
    const response = await App.get('/v1/merchant/businessbankdetail');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpDataNotFound);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });

  test('GET A Particular Bank Details By Correct id', async () => {
    const validBankdetailsId: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_bank_details 
        where account_number= $1`, ['9804633141']))[0].id;
    const response = await App.get('/v1/merchant/businessbankdetails/' +
      validBankdetailsId);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET Error For Bank Details By Wrong id',
      async () => {
        const inValidBankdetailsId: string =
        'b78f7c9d-51eb-4443-a67b-0cdd21f8b390';
        const response = await App.get('/v1/merchant/businessbankdetails/' +
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
  test('Retriving Data For Blank Bank Details',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE business_bank_details CASCADE');
        const response = await App.get('/v1/merchant/businessbankdetails/');
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

describe('Test for UPDATE /businessbankdetail', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    await getConnection(ormDBName).manager
        .query(`INSERT INTO business_bank_details(account_holder_name,
          account_number, branch_name,country_specific_branch_code, is_primary)
          VALUES('Test User','9804633141','Test Branch', 'TESTCODE', true)`);
  });
  test('Update Full Data By Id', async () => {
    const updateData = {
      'account_holder_name': 'Update Holder',
      'account_number': '999999999999',
      'branch_name': 'UpdateBranch',
      'country_specific_branch_code': '99999999',
      'business_bank_detail_is_primary': false,
    };
    const validBankdetailsId: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_bank_details 
    where account_number= $1`, ['9804633141']))[0].id;
    const response = await App.put('/v1/merchant/businessbankdetails/' +
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
  test('Update Account Holder Name By Id', async () => {
    const updateData = {
      'account_holder_name': 'Update Account Holder',
    };
    const validBankdetailsId: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_bank_details`))[0].id;
    const response = await App.put('/v1/merchant/businessbankdetails/' +
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
  test('Update Account Number By Id', async () => {
    const updateData = {
      'account_number': '888888888888',
    };
    const validBankdetailsId: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_bank_details`))[0].id;
    const response = await App.put('/v1/merchant/businessbankdetails/' +
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
  test('Update Branch Name By Id', async () => {
    const updateData = {
      'branch_name': 'UpdateBranchName',
    };
    const validBankdetailsId: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_bank_details`))[0].id;
    const response = await App.put('/v1/merchant/businessbankdetails/' +
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
  test('Update Counter Specfic Branch Code By Id', async () => {
    const updateData = {
      'country_specific_branch_code': '888888888',
    };
    const validBankdetailsId: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_bank_details`))[0].id;
    const response = await App.put('/v1/merchant/businessbankdetails/' +
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
  test('Update Business Bank Detail Is Primary By Id', async () => {
    const updateData = {
      'business_bank_detail_is_primary': true,
    };
    const validBankdetailsId: string = (await getConnection(ormDBName).manager
        .query(`SELECT id from business_bank_details`))[0].id;
    const response = await App.put('/v1/merchant/businessbankdetails/' +
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
  test('Update Business Bank Details by Wrong Id', async () => {
    const updateData = {
      'account_holder_name': 'Update Holder',
      'account_number': '999999999999',
      'branch_name': 'UpdateBranch',
      'country_specific_branch_code': '99999999',
      'business_bank_detail_is_primary': false,
    };
    const inValidBankdetailsId: string = 'e6c07ced-2e42-47c5-88fb-a7ae49822320';
    const response = await App.put('/v1/merchant/businessbankdetails/' +
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
        .query('TRUNCATE TABLE business_bank_details CASCADE');
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
  test(`Update Business Bank Details By Valid Merchant, 
  Business And Bank Details Id`, async () => {
    const updateData = {
      'account_holder_name': 'Update Bank Holder',
      'account_number': '77777777777',
      'branch_name': 'UpdateBranchName',
      'country_specific_branch_code': '8888888',
      'business_bank_detail_is_primary': false,
    };
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const validMerchantId: string = getId[0].merchant_id;
    const validBusinessId: string = getId[0].id;
    const validBankDetailsId: any = (await getConnection(ormDBName).manager
        .query(`SELECT id FROM business_bank_details
          WHERE merchant_business_profile_id = $1`,
        [validBusinessId]))[0].id;
    const response = await App.put('/v1/merchant/' + validMerchantId +
      '/business/' + validBusinessId + '/bank/' + validBankDetailsId)
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
  Business Id, Bank Details Id`, async () => {
    const updateData = {
      'account_holder_name': 'Update Bank Holder',
      'account_number': '77777777777',
      'branch_name': 'UpdateBranchName',
      'country_specific_branch_code': '8888888',
      'business_bank_detail_is_primary': false,
    };
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const validMerchantId: string = getId[0].merchant_id;
    const validBusinessId: string = '3e54be61-79ad-4317-abfe-9df0cf180d28';
    const inValidBankId: string = '6c36cfc0-fe3f-46a7-90cc-145b54f2d3f2';
    const response = await App.put('/v1/merchant/' + validMerchantId +
      '/business/' + validBusinessId + '/bank/' + inValidBankId)
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
  test(`Update Business Bank Details By Invalid Merchant, 
  Business Id And Bank Details Id`, async () => {
    const updateData = {
      'account_holder_name': 'Update Bank Holder',
      'account_number': '77777777777',
      'branch_name': 'UpdateBranchName',
      'country_specific_branch_code': '8888888',
      'business_bank_detail_is_primary': false,
    };
    const validMerchantId: string = '81f7fcaa-52da-4e86-8ae3-5eb415cc581f';
    const validBusinessId: string = '3e54be61-79ad-4317-abfe-9df0cf180d28';
    const inValidBankId: string = '6c36cfc0-fe3f-46a7-90cc-145b54f2d3f2';
    const response = await App.put('/v1/merchant/' + validMerchantId +
      '/business/' + validBusinessId + '/bank/' + inValidBankId)
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
