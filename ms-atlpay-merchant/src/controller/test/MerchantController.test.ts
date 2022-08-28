import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {
  httpPageNotFoundMessage, httpDataNotFound,
  ormDBName, fileStorage, httpSuccessDataUpdate,
}
  from '../../../config/bootstrap';
import {getConnection} from 'typeorm';
import path from 'path';
import fs from 'fs';
const App = supertest(app.app);

describe('Test cases API to Create Merchant', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });

  test('test cases for valid input data', async () => {
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
    const response = await App.post('/v1/merchant')
        .send(merchant);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });
  test('test cases for valid input data with Document Upload', async () => {
    const filePath = path.join(
        __dirname,
        '../../../../',
        'Documentation/test_folder/login.jpeg');
    const response = await App.post('/v1/merchant')
        .field('business_representative_first_name', 'Dipronil')
        .field('business_representative_last_name', 'Saha')
        .field('business_representative_email', 'dipronil@gmail.com')
        .field('business_representative_job_title', 'hhh')
        .field('business_representative_date_of_birth', '1966-01-25')
        .field('business_representative_business_address_line_1', 'Kolkata')
        .field('business_representative_phone_number', 9804633142)
        .field('merchant_code', 'MMM')
        .field('merchant_title', 'lll')
        .field('merchant_subcription_type', 'Subcription')
        .field('business_name', 'Business')
        .field('registration_number', '666666666')
        .field('business_phone_number', 9874563214)
        .field('business_owner_first_name', 'Business')
        .field('business_owner_last_name', 'Owner')
        .field('business_owner_email', 'business@email.com')
        .field('account_holder_name', 'Account Holder')
        .field('account_number', '978645312258')
        .field('branch_name', 'Branch')
        .field('country_specific_branch_code', '87654321')
        .field('business_bank_detail_is_primary', true)
        .field('merchant_business_profile_business_address_line_1',
            'Business Address')
        .field('no_of_documents', 1)
        .field('merchant_document_title_1', 'login')
        .field('merchant_document_issuer_1', 'dip')
        .field('merchant_document_type_text_1', 'QQQ')
        .field('merchant_document_place_of_issue_1', 'MMMM')
        .field('merchant_document_valid_from_1', '2021-01-25')
        .field('merchant_document_valid_through_1', '2021-05-25')
        .attach('merchant_document_upload_1', filePath);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.info.message)
    // eslint-disable-next-line
      .toEqual(`Merchant account created successfully and it is underverification`);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });
  test('test cases for valid input data with Greater Than 2 MB Document Upload',
      async () => {
        const filePath = path.join(
            __dirname,
            '../../../../',
            'Documentation/test_folder/image1.jpeg');
        const response = await App.post('/v1/merchant')
            .field('business_representative_first_name', 'Dipronil')
            .field('business_representative_last_name', 'Saha')
            .field('business_representative_email', 'dipronil@gmail.com')
            .field('business_representative_job_title', 'hhh')
            .field('business_representative_date_of_birth', '1966-01-25')
            .field('business_representative_business_address_line_1', 'Kolkata')
            .field('business_representative_phone_number', 9804633142)
            .field('merchant_code', 'MMM')
            .field('merchant_title', 'lll')
            .field('merchant_subcription_type', 'Subcription')
            .field('business_name', 'Business')
            .field('registration_number', '666666666')
            .field('business_phone_number', 9874563214)
            .field('business_owner_first_name', 'Business')
            .field('business_owner_last_name', 'Owner')
            .field('business_owner_email', 'business@email.com')
            .field('account_holder_name', 'Account Holder')
            .field('account_number', '978645312258')
            .field('branch_name', 'Branch')
            .field('country_specific_branch_code', '87654321')
            .field('business_bank_detail_is_primary', true)
            .field('merchant_business_profile_business_address_line_1',
                'Business Address')
            .field('no_of_documents', 1)
            .field('merchant_document_title_1', 'login')
            .field('merchant_document_issuer_1', 'dip')
            .field('merchant_document_type_text_1', 'QQQ')
            .field('merchant_document_place_of_issue_1', 'MMMM')
            .field('merchant_document_valid_from_1', '2021-01-25')
            .field('merchant_document_valid_through_1', '2021-05-25')
            .attach('merchant_document_upload_1', filePath);
        expect(response.status).toEqual(413);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(`File size has exceeded File Should be up to ~ 2 MB`);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(400);
      });
  test('test cases for valid input data with Wrong Extension Document Upload',
      async () => {
        const filePath = path.join(
            __dirname,
            '../../../../',
            'Documentation/test_folder/test.txt');
        const response = await App.post('/v1/merchant')
            .field('business_representative_first_name', 'Dipronil')
            .field('business_representative_last_name', 'Saha')
            .field('business_representative_email', 'dipronil@gmail.com')
            .field('business_representative_job_title', 'hhh')
            .field('business_representative_date_of_birth', '1966-01-25')
            .field('business_representative_business_address_line_1', 'Kolkata')
            .field('business_representative_phone_number', 9804633142)
            .field('merchant_code', 'MMM')
            .field('merchant_title', 'lll')
            .field('merchant_subcription_type', 'Subcription')
            .field('business_name', 'Business')
            .field('registration_number', '666666666')
            .field('business_phone_number', 9874563214)
            .field('business_owner_first_name', 'Business')
            .field('business_owner_last_name', 'Owner')
            .field('business_owner_email', 'business@email.com')
            .field('account_holder_name', 'Account Holder')
            .field('account_number', '978645312258')
            .field('branch_name', 'Branch')
            .field('country_specific_branch_code', '87654321')
            .field('business_bank_detail_is_primary', true)
            .field('merchant_business_profile_business_address_line_1',
                'Business Address')
            .field('no_of_documents', 1)
            .field('merchant_document_title_1', 'login')
            .field('merchant_document_issuer_1', 'dip')
            .field('merchant_document_type_text_1', 'QQQ')
            .field('merchant_document_place_of_issue_1', 'MMMM')
            .field('merchant_document_valid_from_1', '2021-01-25')
            .field('merchant_document_valid_through_1', '2021-05-25')
            .attach('merchant_document_upload_1', filePath);
        expect(response.status).toEqual(415);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual(`Invalid file Type`);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(400);
      });
  test('test cases for empty input data', async () => {
    const merchant = {
      'business_representative_first_name': '',
      'business_representative_last_name': '',
      'business_representative_email': '',
      'business_representative_job_title': '',
      'business_representative_date_of_birth': '',
      'business_representative_business_address_line_1': '',
      'business_representative_phone_number': 9804633142,
    };
    const response = await App.post('/v1/merchant')
        .send(merchant);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for empty input data', async () => {
    const merchant = {
      'business_representative_first_name': 'Partha',
      'business_representative_last_name': 'Saha',
      'business_representative_email': 'partha@gmail.com',
      'business_representative_job_title': 'hhhh',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'kolkata',
      'business_representative_phone_number': 9804633142,
    };
    const response = await App.post('/v1/merchants')
        .send(merchant);
    expect(response.status).toEqual(404);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  afterAll(async () => {
    fs.rmdirSync(path.join(
        __dirname,
        '../../../',
        fileStorage),
    {recursive: true});
    await dbService.close();
  });
});

describe('Test for GET Merchant', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('GET /merchant', async () => {
    const response = await App.get('/v1/merchant/');
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET error /merchant', async () => {
    const response = await App.get('/v1/merchants/');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET /merchant/:id', async () => {
    const getId = await getConnection(ormDBName).manager
        .query('SELECT id FROM merchants');
    const validId: string = getId[0].id;
    const response = await App.get('/v1/merchant/' + validId);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('Retreving invalid id GET /merchant/:id',
      async () => {
        const InValidId: string = 'be92fa64-c523-11ec-9d64-0242ac120002';
        const response = await App.get('/v1/merchant/' +
        InValidId);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving for DataNotFound GET /merchant',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE merchants CASCADE');
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE business_representatives CASCADE');
        const response = await App.get('/v1/merchant/');
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

describe('Get Merchant Business Owner By merchantId and businessId', () => {
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

  test('Get Business Owner by Valid Merchant and Business Representative Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
             FROM merchant_business_profiles`);
        const validBusinessId: string = getId[0].id;
        const validMerchantId: string = getId[0].merchant_id;
        const response = await App.get('/v1/merchant/' + validMerchantId +
        '/business/' + validBusinessId + '/businessowner');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(500);
      });

  test(`Get Business Owner by Invalid Merchant and Valid Business Id`,
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
            FROM merchant_business_profiles`);
        const validBusinessId: string = getId[0].id;
        const validMerchantId: string = '2e9570a2-c52f-11ec-9d64-0242ac120002';
        const response = await App.get('/v1/merchant/' + validMerchantId +
        '/business/' + validBusinessId + '/businessowner');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test('Get Business Owner by valid Merchant Id and Invalid Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT merchant_id,business_representative_id FROM 
            merchant_business_profiles`);
        const validMerchantId: string = getId[0].merchant_id;
        const validBusinessId: string = '8ea1f894-c52f-11ec-9d64-0242ac120002';
        const response = await App.get('/v1/merchant/' + validMerchantId +
        '/business/' + validBusinessId + '/businessowner');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test('Get Business Owner by Invalid Merchant and Business Id',
      async () => {
        const validMerchantId: string = 'b5020682-c52f-11ec-9d64-0242ac120002';
        const validBusinessId: string = 'b5020934-c52f-11ec-9d64-0242ac120002';
        const response = await App.get('/v1/merchant/' + validMerchantId +
        '/business/' + validBusinessId + '/businessowner');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test(`Get Business Owner by Valid Merchant, Business Representative and 
      Business Owner Id `, async () => {
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const validBusinessId: string = getId[0].id;
    const validMerchantId: string = getId[0].merchant_id;
    const getBusinessOwnerId: string = (await getConnection(ormDBName).manager
        .query(`SELECT id FROM business_owners 
        WHERE merchant_business_profile_id = $1`, [validBusinessId]))[0].id;
    const response = await App.get('/v1/merchant/' + validMerchantId +
      '/business/' + validBusinessId + '/businessowner/' + getBusinessOwnerId);
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(500);
  });

  test(`Get Business Owner by Valid Merchant, Business Representative 
      and Invalid Business Owner Id`, async () => {
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const validMerchantId: string = getId[0].merchant_id;
    const validBusinessId: string = getId[0].id;
    const getBusinessOwnerId: string = '6642b868-c53c-11ec-9d64-0242ac120002';
    const response = await App.get('/v1/merchant/' +
      validMerchantId + '/business/' + validBusinessId +
      '/businessowner/' + getBusinessOwnerId);
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
    expect(response.status).not.toEqual(500);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE merchant_business_profiles CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_representatives CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE merchants CASCADE');
    await dbService.close();
  });
});

describe('GET Merchant Business Bank Details By merchantId and businessId',
    () => {
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

      test('Get Bank Details by Valid Merchant and Business Representative Id',
          async () => {
            const getId = await getConnection(ormDBName).manager
                .query(`SELECT id,merchant_id
             FROM merchant_business_profiles`);
            const validBusinessId: string = getId[0].id;
            const validMerchantId: string = getId[0].merchant_id;
            const response = await App.get('/v1/merchant/' + validMerchantId +
          '/business/' + validBusinessId + '/bank');
            const jsonResponse = JSON.parse(response.text);
            expect(response.type).toEqual('application/json');
            expect(response.status).toEqual(200);
            expect(jsonResponse.success).toEqual(true);
            expect(response.status).not.toEqual(500);
          });

      test(`Get Bank Details by Invalid Merchant and 
      Valid Business Representative Id`, async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
             FROM merchant_business_profiles`);
        const validBusinessId: string = getId[0].id;
        const validMerchantId: string = '2366664c-c547-11ec-9d64-0242ac120002';
        const response = await App.get('/v1/merchant/' + validMerchantId +
        '/business/' + validBusinessId + '/bank');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

      test(`Get Bank Details by Valid Merchant and Inalid 
      Business Representative Id`, async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
             FROM merchant_business_profiles`);
        const validBusinessId: string = '59071418-c547-11ec-9d64-0242ac120002';
        const validMerchantId: string = getId[0].merchant_id;
        const response = await App.get('/v1/merchant/' + validMerchantId +
        '/business/' + validBusinessId + '/bank');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

      test(`Get Bank Detail by Invalid Merchant and Business Representative Id`,
          async () => {
            const validMerchantId: string =
          '1257c200-c548-11ec-9d64-0242ac120002';
            const validBusinessId: string =
          '59071418-c547-11ec-9d64-0242ac120002';
            const response = await App.get('/v1/merchant/' + validMerchantId +
          '/business/' + validBusinessId + '/bank');
            const jsonResponse = JSON.parse(response.text);
            expect(response.type).toEqual('application/json');
            expect(response.status).toEqual(404);
            expect(jsonResponse.success).toEqual(false);
            expect(jsonResponse.errors.error).toEqual('Data Not Found');
            expect(response.status).not.toEqual(500);
          });

      test(`Get Bank Details by Valid Merchant, Business Representative and 
      Business Owner Id`, async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
        const validMerchantId: string = getId[0].merchant_id;
        const validBusinessId: string = getId[0].id;
        const getBusinessBankDetailsId: string =
        (await getConnection(ormDBName).manager
            .query(`SELECT id FROM business_bank_details 
        WHERE merchant_business_profile_id =$1`, [validBusinessId]))[0].id;
        const response = await App.get('/v1/merchant/' + validMerchantId +
        '/business/' + validBusinessId + '/bank/' + getBusinessBankDetailsId);
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(500);
      });

      test(`Get Business Owner by Valid Merchant, Business Representative 
      and Invalid Bank Details Id`, async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id,business_representative_id 
        FROM merchant_business_profiles`);
        const validMerchantId: string = getId[0].merchant_id;
        const validBusinessId: string = getId[0].business_representative_id;
        const getBusinessBankDetailsId: string =
        '6642b868-c53c-11ec-9d64-0242ac120002';
        const response = await App.get('/v1/merchant/' +
        validMerchantId + '/business/' + validBusinessId +
        '/bank/' + getBusinessBankDetailsId);
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
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

describe('GET Business Profile By Merchant Id', () => {
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

  test('Get Business Profile By Valid Merchant Id and Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
        const validMerchantId: string = getId[0].merchant_id;
        const validBusinessId: string = getId[0].id;
        const response = await App.get('/v1/merchant/' +
        validMerchantId + '/business/' + validBusinessId);
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(500);
      });

  test('Get Business Profile By Invalid Merchant Id and Valid Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
        const validMerchantId: string = '14c8f075-ed8b-415e-a56d-60540626ef04';
        const validBusinessId: string = getId[0].id;
        const response = await App.get('/v1/merchant/' +
        validMerchantId + '/business/' + validBusinessId);
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test('Get Business Profile By Valid Merchant Id and Invalid Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
        const validMerchantId: string = getId[0].merchant_id;
        const validBusinessId: string = '46e93648-f96c-4a1b-9a07-0dd952eedd2e';
        const response = await App.get('/v1/merchant/' +
        validMerchantId + '/business/' + validBusinessId);
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test('Get Business Profile By Invalid Merchant Id and Business Id',
      async () => {
        const validMerchantId: string = '1a209cb3-24ba-41eb-8f97-64d131b5d797';
        const validBusinessId: string = '6456cf39-c319-48dc-92d1-6537d38c2e82';
        const response = await App.get('/v1/merchant/' +
        validMerchantId + '/business/' + validBusinessId);
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
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

describe('Get Bank Detail By Merchant Id', () => {
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

  test('Get Bank Detail By Valid Merchant Id', async () => {
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id
        FROM merchants`);
    const merchantId = getId[0].id;
    const response = await App.get('/v1/merchant/' + merchantId + '/bank');
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(500);
  });

  test('Get Bank Detail By Invalid Merchant Id', async () => {
    const merchantId = 'cd3636c7-bdf1-4d54-83ba-f110da46432a';
    const response = await App.get('/v1/merchant/' + merchantId + '/bank');
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
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

describe('Get Business Representation By Merchant Id and Business Id', () => {
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

  test('Get Bank Detail By Valid Merchant Id and Business Id', async () => {
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id,business_representative_id
        FROM merchant_business_profiles`);
    const businessId: string = getId[0].id;
    const merchantId: string = getId[0].merchant_id;
    const response = await App.get('/v1/merchant/' + merchantId + '/business/' +
      businessId + '/businessrepresentative');
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(500);
  });

  test('Get Bank Detail By Valid Merchant Id and Invalid Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id,business_representative_id
        FROM merchant_business_profiles`);
        const businessId: string = 'a7ffddc6-7bc7-498a-9c7e-ac861cdf6eef';
        const merchantId: string = getId[0].merchant_id;
        const response = await App.get('/v1/merchant/' + merchantId +
        '/business/' + businessId + '/businessrepresentative');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test('Get Bank Detail By Invalid Merchant Id and Valid Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id,business_representative_id
        FROM merchant_business_profiles`);
        const businessId: string = getId[0].id;
        const merchantId: string = 'c0c1ec72-1ad7-4694-80b0-4508db20fb3d';
        const response = await App.get('/v1/merchant/' +
        merchantId + '/business/' + businessId + '/businessrepresentative');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test('Get Bank Detail By Invalid Merchant Id and Valid Business Id',
      async () => {
        const businessId: string = 'b348ac2f-daae-4220-9b8f-623a99a670b3';
        const merchantId: string = '70670c28-505c-48b2-a031-6b800a5c1a48';
        const response = await App.get('/v1/merchant/' + merchantId +
        '/business/' + businessId + '/businessrepresentative');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
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

describe('Get Merchant Document By Merchant Id and Business Id', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const filePath = path.join(
        __dirname,
        '../../../../',
        'Documentation/test_folder/login.jpeg');
    await App.post('/v1/merchant')
        .field('business_representative_first_name', 'Dipronil')
        .field('business_representative_last_name', 'Saha')
        .field('business_representative_email', 'dipronil@gmail.com')
        .field('business_representative_job_title', 'hhh')
        .field('business_representative_date_of_birth', '1966-01-25')
        .field('business_representative_business_address_line_1', 'Kolkata')
        .field('business_representative_phone_number', 9804633142)
        .field('merchant_code', 'MMM')
        .field('merchant_title', 'lll')
        .field('merchant_subcription_type', 'Subcription')
        .field('business_name', 'Business')
        .field('registration_number', '666666666')
        .field('business_phone_number', 9874563214)
        .field('business_owner_first_name', 'Business')
        .field('business_owner_last_name', 'Owner')
        .field('business_owner_email', 'business@email.com')
        .field('account_holder_name', 'Account Holder')
        .field('account_number', '978645312258')
        .field('branch_name', 'Branch')
        .field('country_specific_branch_code', '87654321')
        .field('business_bank_detail_is_primary', true)
        .field('merchant_business_profile_business_address_line_1',
            'Business Address')
        .field('no_of_documents', 1)
        .field('merchant_document_title_1', 'login')
        .field('merchant_document_issuer_1', 'dip')
        .field('merchant_document_type_text_1', 'QQQ')
        .field('merchant_document_place_of_issue_1', 'MMMM')
        .field('merchant_document_valid_from_1', '2021-01-25')
        .field('merchant_document_valid_through_1', '2021-05-25')
        .attach('merchant_document_upload_1', filePath);
  });

  test('Get Merchant Document By Valid Merchant Id and Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
        const businessId: string = getId[0].id;
        const merchantId: string = getId[0].merchant_id;
        const response = await App.get('/v1/merchant/' + merchantId +
        '/business/' + businessId + '/document');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(500);
      });

  test('Get Merchant Document By Valid Merchant Id and Invalid Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id,business_representative_id
        FROM merchant_business_profiles`);
        const businessId: string = '627d5818-370e-4d17-97cb-e4bad2db2469';
        const merchantId: string = getId[0].merchant_id;
        const response = await App.get('/v1/merchant/' + merchantId +
        '/business/' + businessId + '/document');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test('Get Merchant Document By Invalid Merchant Id and Valid Business Id',
      async () => {
        const getId = await getConnection(ormDBName).manager
            .query(`SELECT id,merchant_id,business_representative_id
        FROM merchant_business_profiles`);
        const businessId: string = getId[0].id;
        const merchantId: string = 'a216fa5e-0211-4712-8f7d-f94e36f66149';
        const response = await App.get('/v1/merchant/' +
        merchantId + '/business/' + businessId + '/document');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test('Get Merchant Document By Invalid Merchant Id and Valid Business Id',
      async () => {
        const businessId: string = '7eb096ce-7b4d-414f-95ba-a66c5e37bee0';
        const merchantId: string = '4e413ef0-b55a-4a75-be94-0aa26dc389c9';
        const response = await App.get('/v1/merchant/' + merchantId +
        '/business/' + businessId + '/document');
        const jsonResponse = JSON.parse(response.text);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error).toEqual('Data Not Found');
        expect(response.status).not.toEqual(500);
      });

  test(`Get Merchant Document by Valid Merchant, Business Representative and 
      Business Owner Id `, async () => {
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const validBusinessId: string = getId[0].id;
    const validMerchantId: string = getId[0].merchant_id;
    const getMerchantDocumentrId: string =
      (await getConnection(ormDBName).manager
          .query(`SELECT id FROM merchant_documents 
        WHERE merchant_business_profile_id = $1`, [validBusinessId]))[0].id;
    const response = await App.get('/v1/merchant/' + validMerchantId +
      '/business/' + validBusinessId + '/document/' + getMerchantDocumentrId);
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(500);
  });

  test(`Get Business Owner by Valid Merchant, Business Representative 
      and Invalid Business Owner Id`, async () => {
    const getId = await getConnection(ormDBName).manager
        .query(`SELECT id,merchant_id
        FROM merchant_business_profiles`);
    const validMerchantId: string = getId[0].merchant_id;
    const validBusinessId: string = getId[0].id;
    const getMerchantDocumentrId: string =
      '157dde3f-4287-43df-a58f-4d7226a40352';
    const response = await App.get('/v1/merchant/' +
      validMerchantId + '/business/' + validBusinessId +
      '/document/' + getMerchantDocumentrId);
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual('Data Not Found');
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
    fs.rmdirSync(path.join(
        __dirname,
        '../../../',
        fileStorage),
    {recursive: true});
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
  test('Disable Merchant By Valid Merchant Id', async () => {
    const updateData = {
      '_disabledUntil': new Date(),
    };
    const getId = await getConnection(ormDBName).manager
        .query('SELECT id FROM merchants');
    const validId: string = getId[0].id;
    const response = await App.put(
        '/v1/merchant/' + validId + '/disable').send(updateData);
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
  test('Disable Merchant By Invalid Merchant Id', async () => {
    const updateData = {
      '_disabledUntil': new Date(),
    };
    const inValidId: string = 'f32e70ae-4142-4e03-b8e5-ac3c3a946198';
    const response = await App.put(
        '/v1/merchant/' + inValidId + '/disable').send(updateData);
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
  test('Enable Merchant By Valid Merchant Id', async () => {
    const updateData = {
      '_disabledUntil': null,
    };
    const getId = await getConnection(ormDBName).manager
        .query('SELECT id FROM merchants');
    const validId: string = getId[0].id;
    const response = await App.put(
        '/v1/merchant/' + validId + '/enable').send(updateData);
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
  test('Enable Merchant By Invalid Merchant Id', async () => {
    const updateData = {
      '_disabledUntil': null,
    };
    const inValidId: string = 'f32e70ae-4142-4e03-b8e5-ac3c3a946198';
    const response = await App.put(
        '/v1/merchant/' + inValidId + '/enable').send(updateData);
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
        .query('TRUNCATE TABLE business_bank_details CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_owners CASCADE');
    await dbService.close();
  });
});

describe(`Test for Update Merchant By MerchantID`, () => {
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
      'merchant_logo': '$',
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
    await App.post('/v1/merchant').send(merchant);
  });
  test('update Merchant By merchantId', async () => {
    const updateData = {
      'merchant_code': 'code',
      'merchant_title': 'title',
      'merchant_subcription_type': 'basic',
      'merchant_logo': '$',
    };
    let merchantId: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM merchants`);
    merchantId = merchantId[0].id;
    const response = await App
        .put('/v1/merchant/' + merchantId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('update MerchantCode By merchantId',
      async () => {
        const updateData = {
          'merchant_code': 'CODE',
        };
        let merchantId: any = await getConnection(ormDBName).manager
            .query(`SELECT id FROM merchants`);
        merchantId = merchantId[0].id;

        const response = await App
            .put('/v1/merchant/' + merchantId).send(updateData);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
        expect(response.body).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.status).not.toEqual(404);
        expect(response.status).not.toEqual(500);
      });
  test('update MerchantTitle by merchantId',
      async () => {
        const updateData = {
          'merchant_title': 'jjj',
        };
        let merchantId: any = await getConnection(ormDBName).manager
            .query(`SELECT id FROM merchants`);
        merchantId = merchantId[0].id;
        const response = await App
            .put('/v1/merchant/' + merchantId).send(updateData);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
        expect(response.body).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.status).not.toEqual(404);
        expect(response.status).not.toEqual(500);
      });
  test('update MerchantSubscriptionType By merchantId', async () => {
    const updateData = {
      'merchant_subcription_type': 'ghif',
    };
    let merchantId: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM merchants`);
    merchantId = merchantId[0].id;
    const response = await App
        .put('/v1/merchant/' + merchantId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('update MerchantLogo By merchantId', async () => {
    const updateData = {
      'merchant_logo': '$',
    };
    let merchantId: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM merchants`);
    merchantId = merchantId[0].id;
    const response = await App
        .put('/v1/merchant/' + merchantId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('update Blank Merchant Data By merchantId', async () => {
    const updateData = {

    };
    let merchantId: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM merchants`);
    merchantId = merchantId[0].id;
    const response = await App
        .put('/v1/merchant/' + merchantId).send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.body).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Error For update Merchant Data By merchantId',
      async () => {
        const updateData = {
          'merchant_logo': '$',
        };
        const merchantId: any = '9db31ac9-006e-43cf-bc77-3164c6ba9';

        const response = await App
            .put('/v1/merchant/' + merchantId).send(updateData);
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
          .query('TRUNCATE TABLE merchants CASCADE');
      await dbService.close();
    };
  });
});
