import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {MerchantBusinessProfileValidation} from
  '../MerchantBusinessProfileValidation';
const app: express.Application = express();
app.use(bodyParser.json());

app.post('/test-merchant-business-profile',
    new MerchantBusinessProfileValidation(
        'Merchant Business Profile Validation')
        .validationChain,
    new MerchantBusinessProfileValidation(
        'Merchant Business Profile Validation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.get('/test-merchant-business-profile/:id',
    new MerchantBusinessProfileValidation(
        'Merchant Business Profile Validation')
        .paramValidateChain,
    new MerchantBusinessProfileValidation(
        'Merchant Business Profile Validation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.put('/test-update-business-profile/:id',
    new MerchantBusinessProfileValidation('MerchantBusinessProfileValidation')
        .updateValidationChain,
    new MerchantBusinessProfileValidation('MerchantBusinessProfileValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);

const testApp = supertest(app);
describe('Test Merchant Business Profile Param', () => {
  test('Correct Param of Merchant Business Profile', async () => {
    const response = await testApp
    // eslint-disable-next-line
      .get('/test-merchant-business-profile/06411238-131a-42dd-b716-81adb2d834c4');
    expect(response.text).toEqual('Success');
  });
});

describe('Test Merchant Business Profile', () => {
  test('Correct input of Merchant Business Profile', async () => {
    const requestBusinessRepresentative = {
      'business_name': 'doctor house',
      'registration_number': '55555555',
      'business_legal_entity_type': 'Verified',
      'business_role_text': 'manager',
      'business_website': 'https://agpaytech.co.uk/',
      'merchant_business_profile_business_address_line_1': 'Chinchura',
      'merchant_business_profile_business_address_line_2': 'Chinchura',
      'merchant_business_profile_business_address_line_3': 'Chinchura',
      'business_city': 'Chinchura',
      'business_region': 'WestBengal',
      'business_post_code': 'EC1A 1AA',
      'business_phone_number': 9804633142,
      'business_email': 'business@email.com',
      'business_fax_number': 9804633142,
    };
    const response = await testApp
        .post('/test-merchant-business-profile')
        .send(requestBusinessRepresentative);
    expect(response.text).toEqual('Success');
  });
  test('Empty input of Merchant Business Profile', async () => {
    const requestBusinessRepresentative = {

    };
    const response = await testApp
        .post('/test-merchant-business-profile')
        .send(requestBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Business Name Should not be Empty. Registration Number Should not be Empty. Business Address Line 1 Should not be Empty. Business Phone Number Should not be Empty.`);
  });

  test('Testing of Empty Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name Should not be Empty.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 321511131,
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': true,
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'a',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name Should be min 2 max 100 character.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
        // eslint-disable-next-line
        'business_name': 'doctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name Should be min 2 max 100 character.`);
      });

  test('Testing of Empty Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number Should not be Empty.`);
      });
  test('Testing of Incorrect Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': 4211511,
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': false,
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number should be min 5 max 40 character.`);
      });
  test('Testing of Incorrect Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          // eslint-disable-next-line
        'registration_number': '555555555555555555555555555555555555555555555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number should be min 5 max 40 character.`);
      });

  test('Testing of Empty Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 345245,
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Legal Entity Type Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': false,
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Legal Entity Type Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'V',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Legal Entity Type Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          // eslint-disable-next-line
        'business_legal_entity_type': 'VerifiedVerifiedVerifiedVerifiedVerifiedVerifiedVerifiedVerified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Legal Entity Type Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': '!@#$%&*&',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Role Text Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 4514654,
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Role Text Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'M',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Role Text Should be min 2 max 100.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          // eslint-disable-next-line
        'business_role_text': 'managermanagermanagermanagermanagermanagermanagermanagermanagermanagermanagermanagermanagermanagermanager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Role Text Should be min 2 max 100.`);
      });

  test('Testing of Empty Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': false,
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Website Should be URL.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 3164641651,
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Website Should be URL.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'uk',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Website Should be URL.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          // eslint-disable-next-line
        'business_website': 'https://agpaytechagpaytechagpaytechagpaytechagpaytechagpaytechagpaytechagpaytechagpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Website Should be URL.`);
      });

  test('Testing of Empty Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should not be Empty.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 23431412,
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': false,
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'C',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          // eslint-disable-next-line
        'merchant_business_profile_business_address_line_1': 'ChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': false,
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 2 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 14165131,
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 2 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'C',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 2 Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          // eslint-disable-next-line
        'merchant_business_profile_business_address_line_2': 'ChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 2 Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Address Line 3',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 3',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': false,
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 3 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 3',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 14165131,
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 3 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 3',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'C',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 3 Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          // eslint-disable-next-line
        'merchant_business_profile_business_address_line_3': 'ChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 3 Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 3423434,
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business City Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': false,
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business City Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'C',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business City Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          // eslint-disable-next-line
        'business_city': 'ChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business City Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': false,
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Region Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 341431444,
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Region Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'W',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Region Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          // eslint-disable-next-line
        'business_region': 'WestBengalWestBengalWestBengalWestBengalWestBengalWestBengalWestBengalWestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Region Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Post Code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Post Code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 321452354,
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Post Code Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Post Code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': false,
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Post Code Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Post Code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': '7451',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Post Code Should be min 5 max 15.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Post code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': '11234567891236599',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Post Code Should be min 5 max 15.`);
      });

  test('Testing of Empty Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should not be Empty.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 'abcdesghet',
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 4.54151545,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142324234,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should be min 10 max 10.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 980463,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should be min 10 max 10.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 0,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number is Invalid.`);
      });

  test('Testing of Empty Merchant Business Profile Business Email',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Email',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Email is not Valid.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Email',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 4235242,
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Email is not Valid.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Email',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Email is not Valid.`);
      });

  test('Testing of Empty Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9.804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 'sddfdsafd',
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': false,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 0,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number is Invalid.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 98,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be min 5 max 15.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 900046331429804633142,
        };
        const response = await testApp
            .post('/test-merchant-business-profile')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be min 5 max 15.`);
      });
});

describe('Update Merchant Business Profile', () => {
  test('Correct input of Merchant Business Profile', async () => {
    const requestBusinessRepresentative = {
      'business_name': 'doctor house',
      'registration_number': '55555555',
      'business_legal_entity_type': 'Verified',
      'business_role_text': 'manager',
      'business_website': 'https://agpaytech.co.uk/',
      'merchant_business_profile_business_address_line_1': 'Chinchura',
      'merchant_business_profile_business_address_line_2': 'Chinchura',
      'merchant_business_profile_business_address_line_3': 'Chinchura',
      'business_city': 'Chinchura',
      'business_region': 'WestBengal',
      'business_post_code': 'EC1A 1AA',
      'business_phone_number': 9804633142,
      'business_email': 'business@email.com',
      'business_fax_number': 9804633142,
    };
    const response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
        .send(requestBusinessRepresentative);
    expect(response.text).toEqual('Success');
  });

  test('Testing of Empty Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
          .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 321511131,
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': true,
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'a',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name Should be min 2 max 100 character.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Name',
      async () => {
        const invalidMerchantBusinessProfile = {
        // eslint-disable-next-line
        'business_name': 'doctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor housedoctor',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Name Should be min 2 max 100 character.`);
      });

  test('Testing of Empty Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
          .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': 4211511,
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': false,
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number should be min 5 max 40 character.`);
      });
  test('Testing of Incorrect Merchant Business Profile Registration Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          // eslint-disable-next-line
        'registration_number': '555555555555555555555555555555555555555555555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Registration Number should be min 5 max 40 character.`);
      });

  test('Testing of Empty Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 345245,
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Legal Entity Type Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': false,
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Legal Entity Type Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'V',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Legal Entity Type Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Legal Entity',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          // eslint-disable-next-line
        'business_legal_entity_type': 'VerifiedVerifiedVerifiedVerifiedVerifiedVerifiedVerifiedVerified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Legal Entity Type Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': '!@#$%&*&',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Role Text Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 4514654,
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Role Text Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'M',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Role Text Should be min 2 max 100.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Role Text',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          // eslint-disable-next-line
        'business_role_text': 'managermanagermanagermanagermanagermanagermanagermanagermanagermanagermanagermanagermanagermanagermanager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Role Text Should be min 2 max 100.`);
      });

  test('Testing of Empty Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': false,
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Website Should be URL.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 3164641651,
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Website Should be URL.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'uk',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Website Should be URL.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Website',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          // eslint-disable-next-line
        'business_website': 'https://agpaytechagpaytechagpaytechagpaytechagpaytechagpaytechagpaytechagpaytechagpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Website Should be URL.`);
      });

  test('Testing of Empty Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 23431412,
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': false,
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'C',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 1',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          // eslint-disable-next-line
        'merchant_business_profile_business_address_line_1': 'ChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 1 Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': false,
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 2 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 14165131,
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 2 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'C',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 2 Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          // eslint-disable-next-line
        'merchant_business_profile_business_address_line_2': 'ChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 2 Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Address Line 3',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 3',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': false,
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 3 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 3',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 14165131,
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 3 Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 3',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'C',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 3 Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Address Line 2',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          // eslint-disable-next-line
        'merchant_business_profile_business_address_line_3': 'ChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Address Line 3 Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 3423434,
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business City Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': false,
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business City Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'C',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business City Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business City',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          // eslint-disable-next-line
        'business_city': 'ChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchuraChinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business City Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': false,
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Region Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 341431444,
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Region Should be Alphabetic.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'W',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Region Should be min 2 max 50.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Region',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          // eslint-disable-next-line
        'business_region': 'WestBengalWestBengalWestBengalWestBengalWestBengalWestBengalWestBengalWestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Region Should be min 2 max 50.`);
      });

  test('Testing of Empty Merchant Business Profile Business Post Code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Post Code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 321452354,
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Post Code Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Post Code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': false,
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Post Code Should be String.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Post Code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': '7451',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Post Code Should be min 5 max 15.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Post code',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': '11234567891236599',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Post Code Should be min 5 max 15.`);
      });

  test('Testing of Empty Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
          .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 'abcdesghet',
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 4.54151545,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142324234,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should be min 10 max 10.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 980463,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number Should be min 10 max 10.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Phone Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 0,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Phone Number is Invalid.`);
      });

  test('Testing of Empty Merchant Business Profile Business Email',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Email',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Email is not Valid.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Email',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 4235242,
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Email is not Valid.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Email',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email',
          'business_fax_number': 9804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Email is not Valid.`);
      });

  test('Testing of Empty Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body.success).toEqual(undefined);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 9.804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 'sddfdsafd',
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': false,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be Numeric.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 0,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number is Invalid.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 98,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be min 5 max 15.`);
      });
  test('Testing of Incorrect Merchant Business Profile Business Fax Number',
      async () => {
        const invalidMerchantBusinessProfile = {
          'business_name': 'doctor house',
          'registration_number': '55555555',
          'business_legal_entity_type': 'Verified',
          'business_role_text': 'manager',
          'business_website': 'https://agpaytech.co.uk/',
          'merchant_business_profile_business_address_line_1': 'Chinchura',
          'merchant_business_profile_business_address_line_2': 'Chinchura',
          'merchant_business_profile_business_address_line_3': 'Chinchura',
          'business_city': 'Chinchura',
          'business_region': 'WestBengal',
          'business_post_code': 'EC1A 1AA',
          'business_phone_number': 9804633142,
          'business_email': 'business@email.com',
          'business_fax_number': 900046331429804633142,
        };
        const response = await testApp
        // eslint-disable-next-line
        .put('/test-update-business-profile/06411238-131a-42dd-b716-81adb2d834c4')
            .send(invalidMerchantBusinessProfile);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.error)
            .toEqual(`Business Fax Number Should be min 5 max 15.`);
      });
});
