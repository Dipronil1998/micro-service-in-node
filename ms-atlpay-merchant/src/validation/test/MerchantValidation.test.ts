import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {MerchantValidation} from '../MerchantValidation';
const app: express.Application = express();
app.use(bodyParser.json());

app.post('/test-merchant',
    new MerchantValidation('merchant Validation')
        .validationChain,
    new MerchantValidation('merchant Validation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction)=>{
      res.send('Success');
    },
);
app.get('/test-merchant/:id',
    new MerchantValidation('MerchantValidation')
        .paramValidateChain,
    new MerchantValidation('MerchantValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.put('/test-update-merchnat/:id',
    new MerchantValidation('MerchantValidation')
        .updateValidationChain,
    new MerchantValidation('MerchantValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);

const testApp = supertest(app);

describe('Test Merchant Param', () => {
  test('Correct Param of Merchant', async () => {
    const response = await testApp
    // eslint-disable-next-line
      .get('/test-merchant/06411238-131a-42dd-b716-81adb2d834c4');
    expect(response.text).toEqual('Success');
  });
});

describe(' Test merchant Validation', () => {
  test('Correct input of merchant', async () => {
    const requestMerchant = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'Basic',
      'merchant_logo': 'testlogo',
    };
    const response = await testApp
        .post('/test-merchant')
        .send(requestMerchant);
    expect(response.text).toEqual('Success');
  });

  test('Test Cases for Merchant Code', async ()=>{
    const invalidMerchant1 = {
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response1 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant1);
    expect(response1.body.success).toEqual(undefined);

    const invalidMerchant2 = {
      'merchant_code': 4,
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'test logo',
    };
    const response2 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Code should be Alphabetic. Merchant Code Should be min 2 max 10 character.`);

    const invalidMerchant3 = {
      'merchant_code': 4456,
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response3 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Merchant Code should be Alphabetic.`);

    const invalidMerchant4 = {
      'merchant_code': 'a',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response4 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Merchant Code Should be min 2 max 10 character.`);

    const invalidMerchant5 = {
      'merchant_code': 'abcdefghijklmnop',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response5 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        .toEqual(`Merchant Code Should be min 2 max 10 character.`);
    const invalidMerchant6 = {
      'merchant_code': 'abcdefghijk',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response6 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
        .toEqual(`Merchant Code Should be min 2 max 10 character.`);
  });

  test('Test Cases for Merchant Title', async ()=>{
    const invalidMerchant1 = {
      'merchant_code': 'test code',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response1 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant1);
    expect(response1.body.success).toEqual(undefined);

    const invalidMerchant2 = {
      'merchant_code': 'test title',
      'merchant_title': 4565,
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response2 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Merchant Title Should be Alphabetic.`);

    const invalidMerchant3 = {
      'merchant_code': 'test title',
      'merchant_title': 4,
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response3 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Title Should be Alphabetic. Merchant Title Should be min 2 max 40.`);

    const invalidMerchant4 = {
      'merchant_code': 'test title',
      'merchant_title': 'a',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response4 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Merchant Title Should be min 2 max 40.`);
    // eslint-disable-next-line
    const invalidMerchant5 = {
      'merchant_code': 'test title',
      'merchant_title': 'merchant_titlemerchant_titlemerchant_title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response5 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        .toEqual(`Merchant Title Should be min 2 max 40.`);
    const invalidMerchant6 = {
      'merchant_code': 'test title',
      // eslint-disable-next-line
      'merchant_title': 'merchant_titlemerchant_titlemerchant_titlemerchant',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response6 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
        .toEqual(`Merchant Title Should be min 2 max 40.`);
  });

  test('test Cases for Merchant Subcription', async ()=>{
    const invalidMerchant1 = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_logo': 'testlogo',
    };
    const response1 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Merchant Subcription Type Should not be Empty.`);

    const invalidMerchant2 = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_subcription_type': 56432,
      'merchant_logo': 'testlogo',
    };
    const response2 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Merchant Subcription Type should be String.`);

    const invalidMerchant3 = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_subcription_type': 5,
      'merchant_logo': 'testlogo',
    };
    const response3 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        // eslint-disable-next-line
        .toEqual(`Merchant Subcription Type should be String. Merchant Subcription Type should be min 2 max 40 character.`);

    const invalidMerchant4 = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'a',
      'merchant_logo': 'testlogo',
    };
    const response4 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        // eslint-disable-next-line
        .toEqual(`Merchant Subcription Type should be min 2 max 40 character.`);

    const invalidMerchant5 = {
      'merchant_code': 'test title',
      'merchant_title': 'abcd',
      // eslint-disable-next-line
      'merchant_subcription_type': 'merchant_titlemerchant_titlemerchant_merchant',
      'merchant_logo': 'testlogo',
    };
    const response5 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        // eslint-disable-next-line
        .toEqual(`Merchant Subcription Type should be min 2 max 40 character.`);
    const invalidMerchant6 = {
      'merchant_code': 'test title',
      'merchant_title': 'abcd',
      'merchant_subcription_type': 'merchant_titlemerchant_titlemerchant_titl',
      'merchant_logo': 'testlogo',
    };
    const response6 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
        // eslint-disable-next-line
        .toEqual(`Merchant Subcription Type should be min 2 max 40 character.`);
  });

  test('Test Cases for Merchant Logo', async ()=>{
    const invalidMerchant1 = {
      'merchant_code': 'code',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
    };
    const response1 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant1);
    expect(response1.body.success).toEqual(undefined);

    const invalidMerchant2 = {
      'merchant_code': 'code',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 6165,
    };
    const response2 = await testApp
        .post('/test-merchant')
        .send(invalidMerchant2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Merchant Logo Should be String.`);
  });
});

describe(' Update merchant Validation', () => {
  test('Correct input of merchant', async () => {
    const requestMerchant = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'Basic',
      'merchant_logo': 'testlogo',
    };
    const response = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(requestMerchant);
    expect(response.text).toEqual('Success');
  });

  test('Test Cases for Merchant Code', async ()=>{
    const invalidMerchant1 = {
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response1 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant1);
    expect(response1.body.success).toEqual(undefined);

    const invalidMerchant2 = {
      'merchant_code': 4,
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'test logo',
    };
    const response2 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Code should be Alphabetic. Merchant Code Should be min 2 max 10 character.`);

    const invalidMerchant3 = {
      'merchant_code': 4456,
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response3 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Merchant Code should be Alphabetic.`);

    const invalidMerchant4 = {
      'merchant_code': 'a',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response4 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Merchant Code Should be min 2 max 10 character.`);

    const invalidMerchant5 = {
      'merchant_code': 'abcdefghijklmnop',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response5 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        .toEqual(`Merchant Code Should be min 2 max 10 character.`);
    const invalidMerchant6 = {
      'merchant_code': 'abcdefghijk',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response6 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
        .toEqual(`Merchant Code Should be min 2 max 10 character.`);
  });

  test('Test Cases for Merchant Title', async ()=>{
    const invalidMerchant1 = {
      'merchant_code': 'test code',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response1 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant1);
    expect(response1.body.success).toEqual(undefined);

    const invalidMerchant2 = {
      'merchant_code': 'test title',
      'merchant_title': 4565,
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response2 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Merchant Title Should be Alphabetic.`);

    const invalidMerchant3 = {
      'merchant_code': 'test title',
      'merchant_title': 4,
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response3 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Title Should be Alphabetic. Merchant Title Should be min 2 max 40.`);

    const invalidMerchant4 = {
      'merchant_code': 'test title',
      'merchant_title': 'a',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response4 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Merchant Title Should be min 2 max 40.`);
    // eslint-disable-next-line
    const invalidMerchant5 = {
      'merchant_code': 'test title',
      'merchant_title': 'merchant_titlemerchant_titlemerchant_title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response5 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        .toEqual(`Merchant Title Should be min 2 max 40.`);
    const invalidMerchant6 = {
      'merchant_code': 'test title',
      // eslint-disable-next-line
      'merchant_title': 'merchant_titlemerchant_titlemerchant_titlemerchant',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 'testlogo',
    };
    const response6 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
        .toEqual(`Merchant Title Should be min 2 max 40.`);
  });

  test('test Cases for Merchant Subcription', async ()=>{
    const invalidMerchant1 = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_logo': 'testlogo',
    };
    const response1 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant1);
    expect(response1.body.success).toEqual(undefined);

    const invalidMerchant2 = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_subcription_type': 56432,
      'merchant_logo': 'testlogo',
    };
    const response2 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Merchant Subcription Type should be String.`);

    const invalidMerchant3 = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_subcription_type': 5,
      'merchant_logo': 'testlogo',
    };
    const response3 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        // eslint-disable-next-line
        .toEqual(`Merchant Subcription Type should be String. Merchant Subcription Type should be min 2 max 40 character.`);

    const invalidMerchant4 = {
      'merchant_code': 'Secret',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'a',
      'merchant_logo': 'testlogo',
    };
    const response4 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        // eslint-disable-next-line
        .toEqual(`Merchant Subcription Type should be min 2 max 40 character.`);

    const invalidMerchant5 = {
      'merchant_code': 'test title',
      'merchant_title': 'abcd',
      // eslint-disable-next-line
      'merchant_subcription_type': 'merchant_titlemerchant_titlemerchant_merchant',
      'merchant_logo': 'testlogo',
    };
    const response5 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        // eslint-disable-next-line
        .toEqual(`Merchant Subcription Type should be min 2 max 40 character.`);
    const invalidMerchant6 = {
      'merchant_code': 'test title',
      'merchant_title': 'abcd',
      'merchant_subcription_type': 'merchant_titlemerchant_titlemerchant_titl',
      'merchant_logo': 'testlogo',
    };
    const response6 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
        // eslint-disable-next-line
        .toEqual(`Merchant Subcription Type should be min 2 max 40 character.`);
  });

  test('Test Cases for Merchant Logo', async ()=>{
    const invalidMerchant1 = {
      'merchant_code': 'code',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
    };
    const response1 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant1);
    expect(response1.body.success).toEqual(undefined);

    const invalidMerchant2 = {
      'merchant_code': 'code',
      'merchant_title': 'test title',
      'merchant_subcription_type': 'abcd',
      'merchant_logo': 6165,
    };
    const response2 = await testApp
        .put('/test-update-merchnat/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidMerchant2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Merchant Logo Should be String.`);
  });
});
