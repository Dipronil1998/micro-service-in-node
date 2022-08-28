import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {BusinessBankDetailValidation} from
  '../BusinessBankDetailValidation';
const app: express.Application = express();
app.use(bodyParser.json());

app.post('/test-business-bank-details',
    new BusinessBankDetailValidation('Business Bank Details Validation')
        .validationChain,
    new BusinessBankDetailValidation('Business Bank Details Validation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.get('/test-merchant-bank-details/:id',
    new BusinessBankDetailValidation('BusinessBankDetailValidation')
        .paramValidateChain,
    new BusinessBankDetailValidation('BusinessBankDetailValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.put('/test-update-bank-details/:id',
    new BusinessBankDetailValidation('BusinessBankDetailValidation')
        .updateValidationChain,
    new BusinessBankDetailValidation('BusinessBankDetailValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);

const testApp = supertest(app);

describe('Test Merchant BusinessBankDetail Param', () => {
  test('Correct Param of Merchant BusinessBankDetail', async () => {
    const response = await testApp
    // eslint-disable-next-line
      .get('/test-merchant-bank-details/06411238-131a-42dd-b716-81adb2d834c4');
    expect(response.text).toEqual('Success');
  });
});

describe(' Test Business Bank Details validation', () => {
  test('Correct input of Business Bank Details', async () => {
    const requestBusinessBankDetails = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    const response = await testApp
        .post('/test-business-bank-details')
        .send(requestBusinessBankDetails);
    expect(response.text).toEqual('Success');
  });
  test('Empty input of Business Bank Details', async () => {
    const requestBusinessBankDetails = {

    };
    const response = await testApp
        .post('/test-business-bank-details')
        .send(requestBusinessBankDetails);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Account Holder Name Should not be Empty. Account Number Should not be Empty. Branch Name Should not be Empty. Country Specific Branch Code Should not be Empty. Is Business Bank Account Primary Flag Should not be Empty.`);
  });
  test('Testing For Business Bank Details account holder name', async () => {
    const invalidBusinessBankDetails = {
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    let response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name Should not be Empty.`);

    const invalidBusinessBankDetails1 = {
      'account_holder_name': 6666,
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'account_holder_name': 'T',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Account Holder Name Should be min 2 max 40 character.`);

    const invalidBusinessBankDetails3 = {
      'account_holder_name': 'Te 123',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name should be Alphabetic.`);

    const invalidBusinessBankDetails4 = {
      'account_holder_name': '!@#$%&*',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name should be Alphabetic.`);

    const invalidBusinessBankDetails5 = {
      // eslint-disable-next-line
      'account_holder_name': 'Test User Test User Test User Test Userss',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name Should be min 2 max 40 character.`);
  });

  test('Testing For Business Bank Details Account Number', async () => {
    const invalidBusinessBankDetails = {
      'account_holder_name': 'User Test',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    let response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Number Should not be Empty.`);

    const invalidBusinessBankDetails2 = {
      'account_holder_name': 'User Test',
      'account_number': 999999999999,
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Number Should be String.`);

    const invalidBusinessBankDetails3 = {
      'account_holder_name': 'User Test',
      'account_number': '9999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Number Should be min 5 max 20.`);

    const invalidBusinessBankDetails5 = {
      'account_holder_name': 'Test User',
      'account_number': false,
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Number Should be String.`);

    const invalidBusinessBankDetails6 = {
      'account_holder_name': 'Test User',
      // eslint-disable-next-line
      'account_number': '999999999999999999999325456556245646646436365436435646456',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error)
        .toEqual(`Account Number Should be min 5 max 20.`);
  });

  test('Testing For Business Bank Details Branch Name', async () => {
    const invalidBusinessBankDetails = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    let response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name Should not be Empty.`);

    const invaldBusinessBankDetails1 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 7777,
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invaldBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'T',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name should be min 2 max 50 character.`);

    const invalidBusinessBankDetails3 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': false,
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };

    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name should be Alphabetic.`);

    const invalidBusinessBankDetails5 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      // eslint-disable-next-line
      'branch_name': 'Test Branch Test Branch Test Branch Test Branch Tex',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name should be min 2 max 50 character.`);
  });

  test('Testing For Business Bank Details Country Specific Branch Code',
      async () => {
        const invalidBusinessBankDetails = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          'business_bank_detail_is_primary': true,
        };
        let response = await testApp
            .post('/test-business-bank-details')
            .send(invalidBusinessBankDetails);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should not be Empty.`);

        const invalidBusinessBankDetails1 = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          'country_specific_branch_code': 777777,
          'business_bank_detail_is_primary': true,
        };
        response = await testApp
            .post('/test-business-bank-details')
            .send(invalidBusinessBankDetails1);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should be String.`);

        const invalidBusinessBankDetails2 = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          'country_specific_branch_code': '7',
          'business_bank_detail_is_primary': true,
        };
        response = await testApp
            .post('/test-business-bank-details')
            .send(invalidBusinessBankDetails2);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should be min 2 max 40.`);

        const invalidBusinessBankDetails3 = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          'country_specific_branch_code': true,
          'business_bank_detail_is_primary': true,
        };
        response = await testApp
            .post('/test-business-bank-details')
            .send(invalidBusinessBankDetails3);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should be String.`);

        const invalidBusinessBankDetails5 = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          // eslint-disable-next-line
        'country_specific_branch_code': '77777777777777777777777777777777777777777',
          'business_bank_detail_is_primary': true,
        };
        response = await testApp
            .post('/test-business-bank-details')
            .send(invalidBusinessBankDetails5);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should be min 2 max 40.`);
      });

  test('Testing For Business Bank Detail Primary', async () => {
    const invalidBusinessBankDetails = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
    };
    let response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Is Business Bank Account Primary Flag Should not be Empty.`);

    const invalidBusinessBankDetails1 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': 'Primary',
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Is Business Bank Account Primary Flag Should be True or false.`);

    const invalidBusinessBankDetails2 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': 34214214,
    };
    response = await testApp
        .post('/test-business-bank-details')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Is Business Bank Account Primary Flag Should be True or false.`);
  });
});

describe(' Update Business Bank Details validation', () => {
  test('Correct input of Business Bank Details', async () => {
    const requestBusinessBankDetails = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    const response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(requestBusinessBankDetails);
    expect(response.text).toEqual('Success');
  });
  test('Empty input of Business Bank Details', async () => {
    const requestBusinessBankDetails = {

    };
    const response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(requestBusinessBankDetails);
    expect(response.body.success).toEqual(undefined);
  });

  test('Testing For Business Bank Details account holder name', async () => {
    const invalidBusinessBankDetails = {
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    let response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessBankDetails1 = {
      'account_holder_name': 6666,
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'account_holder_name': 'T',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Account Holder Name Should be min 2 max 40 character.`);

    const invalidBusinessBankDetails3 = {
      'account_holder_name': 'Te 123',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name should be Alphabetic.`);

    const invalidBusinessBankDetails4 = {
      'account_holder_name': '!@#$%&*',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name should be Alphabetic.`);

    const invalidBusinessBankDetails5 = {
      // eslint-disable-next-line
        'account_holder_name': 'Test User Test User Test User Test Userss',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Holder Name Should be min 2 max 40 character.`);
  });

  test('Testing For Business Bank Details Account Number', async () => {
    const invalidBusinessBankDetails = {
      'account_holder_name': 'User Test',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    let response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessBankDetails2 = {
      'account_holder_name': 'User Test',
      'account_number': 999999999999,
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Number Should be String.`);

    const invalidBusinessBankDetails3 = {
      'account_holder_name': 'User Test',
      'account_number': '9999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Number Should be min 5 max 20.`);

    const invalidBusinessBankDetails5 = {
      'account_holder_name': 'Test User',
      'account_number': false,
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Account Number Should be String.`);

    const invalidBusinessBankDetails6 = {
      'account_holder_name': 'Test User',
      // eslint-disable-next-line
        'account_number': '999999999999999999999325456556245646646436365436435646456',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
      expect(response.body.errors.error)
        .toEqual(`Account Number Should be min 5 max 20.`);
  });

  test('Testing For Business Bank Details Branch Name', async () => {
    const invalidBusinessBankDetails = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    let response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails);
    expect(response.body.success).toEqual(undefined);

    const invaldBusinessBankDetails1 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 7777,
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invaldBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'T',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name should be min 2 max 50 character.`);

    const invalidBusinessBankDetails3 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': false,
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };

    response = await testApp
        .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name should be Alphabetic.`);

    const invalidBusinessBankDetails5 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      // eslint-disable-next-line
        'branch_name': 'Test Branch Test Branch Test Branch Test Branch Tex',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': true,
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Branch Name should be min 2 max 50 character.`);
  });

  test('Testing For Business Bank Details Country Specific Branch Code',
      async () => {
        const invalidBusinessBankDetails = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          'business_bank_detail_is_primary': true,
        };
        let response = await testApp
        // eslint-disable-next-line
              .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidBusinessBankDetails);
        expect(response.body.success).toEqual(undefined);

        const invalidBusinessBankDetails1 = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          'country_specific_branch_code': 777777,
          'business_bank_detail_is_primary': true,
        };
        response = await testApp
        // eslint-disable-next-line
              .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidBusinessBankDetails1);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should be String.`);

        const invalidBusinessBankDetails2 = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          'country_specific_branch_code': '7',
          'business_bank_detail_is_primary': true,
        };
        response = await testApp
        // eslint-disable-next-line
              .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidBusinessBankDetails2);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should be min 2 max 40.`);

        const invalidBusinessBankDetails3 = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          'country_specific_branch_code': true,
          'business_bank_detail_is_primary': true,
        };
        response = await testApp
        // eslint-disable-next-line
              .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidBusinessBankDetails3);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should be String.`);

        const invalidBusinessBankDetails5 = {
          'account_holder_name': 'User Test',
          'account_number': '999999999999',
          'branch_name': 'Test Branch',
          // eslint-disable-next-line
          'country_specific_branch_code': '77777777777777777777777777777777777777777',
          'business_bank_detail_is_primary': true,
        };
        response = await testApp
        // eslint-disable-next-line
              .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidBusinessBankDetails5);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Country Specific Branch Code Should be min 2 max 40.`);
      });

  test('Testing For Business Bank Detail Primary', async () => {
    const invalidBusinessBankDetails = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
    };
    let response = await testApp
    // eslint-disable-next-line
          .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessBankDetails1 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': 'Primary',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Is Business Bank Account Primary Flag Should be True or false.`);

    const invalidBusinessBankDetails2 = {
      'account_holder_name': 'User Test',
      'account_number': '999999999999',
      'branch_name': 'Test Branch',
      'country_specific_branch_code': '777777',
      'business_bank_detail_is_primary': 34214214,
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-bank-details/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Is Business Bank Account Primary Flag Should be True or false.`);
  });
});
