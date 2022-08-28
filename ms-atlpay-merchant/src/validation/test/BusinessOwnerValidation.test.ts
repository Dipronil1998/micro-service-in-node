import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {BusinessOwnerValidation} from
  '../BusinessOwnerValidation';
const app: express.Application = express();
app.use(bodyParser.json());
app.post('/test-business-owner',
    new BusinessOwnerValidation('Business Owner Validation')
        .validationChain,
    new BusinessOwnerValidation('Business Owner Validation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.get('/test-merchant-business-owner/:id',
    new BusinessOwnerValidation('BusinessOwnerValidation')
        .paramValidateChain,
    new BusinessOwnerValidation('BusinessOwnerValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.put('/test-update-business-owner/:id',
    new BusinessOwnerValidation('Business Owner Validation')
        .updateValidationChain,
    new BusinessOwnerValidation('Business Owner Validation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);

const testApp = supertest(app);

describe('Test Merchant BusinessOwner Param', () => {
  test('Correct Param of Merchant BusinessOwner', async () => {
    const response = await testApp
    // eslint-disable-next-line
      .get('/test-merchant-business-owner/06411238-131a-42dd-b716-81adb2d834c4');
    expect(response.text).toEqual('Success');
  });
});

describe(' Test Business Owner validation', () => {
  test('Correct input of Business Owner', async () => {
    const requestBusinessOwner = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    const response = await testApp
        .post('/test-business-owner')
        .send(requestBusinessOwner);
    expect(response.text).toEqual('Success');
  });
  test('Empty input of Business Owner', async () => {
    const requestBusinessOwner = {

    };
    const response = await testApp
        .post('/test-business-owner')
        .send(requestBusinessOwner);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        // eslint-disable-next-line
            .toEqual(`Business Owner First Name Should not be Empty. Business Owner Last Name Should not be Empty. Business Owner Email Should not be Empty.`)
  });

  test('Testing for Business Owner First Name', async () => {
    const invalidBusinessOwner = {
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    let response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessOwner);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner First Name Should not be Empty.`);

    const invalidBusinessBankDetails1 = {
      'business_owner_first_name': 9999999999,
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner First Name Should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'business_owner_first_name': 'U',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner First Name Should be min 2 max 40.`);

    const invalidBusinessBankDetails3 = {
      'business_owner_first_name': '!@#$%&*',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Owner First Name Should be Alphabetic.');

    const invalidBusinessBankDetails4 = {
      'business_owner_first_name': 'ab 123',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Owner First Name Should be Alphabetic.');

    const invalidBusinessBankDetails5 = {
      // eslint-disable-next-line
      'business_owner_first_name': 'UserfirstnameUserfirstnameUserfirstnameUs',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner First Name Should be min 2 max 40.`);
  });

  test('Testing for Business Owner Middle Name', async () => {
    const invalidBusinessOwner = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    let response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessOwner);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessBankDetails1 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 9999999999,
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'U',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be min 2 max 40.`);

    const invalidBusinessBankDetails3 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Us 123',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be Alphabetic.`);

    const invalidBusinessBankDetails4 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': '!@#$%&*',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be Alphabetic.`);

    const invalidBusinessBankDetails5 = {
      'business_owner_first_name': 'Userfirstname',
      // eslint-disable-next-line
      'business_owner_middle_name': 'UsermiddlenameUsermiddlenameUsermiddlenamUsermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be min 2 max 40.`);
  });

  test('Testing for Business Owner Last Name', async () => {
    const invalidBusinessOwner = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_email': 'test@test.com',
    };
    let response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessOwner);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should not be Empty.`);

    const invalidBusinessBankDetails1 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 999999,
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'U',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be min 2 max 40.`);

    const invalidBusinessBankDetails3 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Us 123',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be Alphabetic.`);

    const invalidBusinessBankDetails4 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': '!@#$%&*',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be Alphabetic.`);

    const invalidBusinessBankDetails5 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      // eslint-disable-next-line
      'business_owner_last_name': 'UserlsstnameUserlsstnameUserlsstnameUserlsstnameUserl',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be min 2 max 40.`);
  });

  test('Testing for Business Owner Email', async () => {
    const invalidBusinessOwner = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
    };
    let response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessOwner);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Email Should not be Empty.`);

    const invalidBusinessBankDetails1 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test',
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Email is not Valid.`);

    const invalidBusinessBankDetails2 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 21312,
    };
    response = await testApp
        .post('/test-business-owner')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Email is not Valid.`);
  });
});
describe(' Update Business Owner validation', () => {
  test('Correct input of Business Owner', async () => {
    const requestBusinessOwner = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    const response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(requestBusinessOwner);
    expect(response.text).toEqual('Success');
  });

  test('Testing for Business Owner First Name', async () => {
    const invalidBusinessOwner = {
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    let response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessOwner);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessBankDetails1 = {
      'business_owner_first_name': 9999999999,
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner First Name Should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'business_owner_first_name': 'U',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner First Name Should be min 2 max 40.`);

    const invalidBusinessBankDetails3 = {
      'business_owner_first_name': '!@#$%&*',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Owner First Name Should be Alphabetic.');

    const invalidBusinessBankDetails4 = {
      'business_owner_first_name': 'ab 123',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Owner First Name Should be Alphabetic.');

    const invalidBusinessBankDetails5 = {
      // eslint-disable-next-line
        'business_owner_first_name': 'UserfirstnameUserfirstnameUserfirstnameUs',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner First Name Should be min 2 max 40.`);
  });

  test('Testing for Business Owner Middle Name', async () => {
    const invalidBusinessOwner = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    let response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessOwner);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessBankDetails1 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 9999999999,
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'U',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be min 2 max 40.`);

    const invalidBusinessBankDetails3 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Us 123',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be Alphabetic.`);

    const invalidBusinessBankDetails4 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': '!@#$%&*',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be Alphabetic.`);

    const invalidBusinessBankDetails5 = {
      'business_owner_first_name': 'Userfirstname',
      // eslint-disable-next-line
        'business_owner_middle_name': 'UsermiddlenameUsermiddlenameUsermiddlenamUsermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Middle Name Should be min 2 max 40.`);
  });

  test('Testing for Business Owner Last Name', async () => {
    const invalidBusinessOwner = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_email': 'test@test.com',
    };
    let response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessOwner);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessBankDetails1 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 999999,
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be Alphabetic.`);

    const invalidBusinessBankDetails2 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'U',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be min 2 max 40.`);

    const invalidBusinessBankDetails3 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Us 123',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be Alphabetic.`);

    const invalidBusinessBankDetails4 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': '!@#$%&*',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be Alphabetic.`);

    const invalidBusinessBankDetails5 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      // eslint-disable-next-line
        'business_owner_last_name': 'UserlsstnameUserlsstnameUserlsstnameUserlsstnameUserl',
      'business_owner_email': 'test@test.com',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Last Name Should be min 2 max 40.`);
  });

  test('Testing for Business Owner Email', async () => {
    const invalidBusinessOwner = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
    };
    let response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessOwner);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessBankDetails1 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 'test',
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Email is not Valid.`);

    const invalidBusinessBankDetails2 = {
      'business_owner_first_name': 'Userfirstname',
      'business_owner_middle_name': 'Usermiddlename',
      'business_owner_last_name': 'Userlsstname',
      'business_owner_email': 21312,
    };
    response = await testApp
    // eslint-disable-next-line
          .put('/test-update-business-owner/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessBankDetails2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Owner Email is not Valid.`);
  });
});
