import express, {NextFunction, Request, Response}
  from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {CurrencyValidator} from '../CurrencyValidator';
const app: express.Application = express();
app.use(bodyParser.json());
app.post('/test-currency',
    new CurrencyValidator('Currency Validator').validationChain,
    new CurrencyValidator('Currency Validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.get('/test-currency/:iso',
    new CurrencyValidator('Currency Validator').paramValidateChain,
    new CurrencyValidator('Currency Validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);

const testApp = supertest(app);
describe(' Test Currency Validator', () => {
  test('Correct input of Currency', async () => {
    const requestCurrency = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response = await testApp
        .post('/test-currency')
        .send(requestCurrency);
    expect(response.text).toEqual('Success');
  });

  test('Test Cases for Currency ISO', async () => {
    const invalidCurrency1 = {
      'iso_numeric': 950,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response1 = await testApp
        .post('/test-currency')
        .send(invalidCurrency1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Currency ISO Should not be empty.`);

    const invalidCurrency2 = {
      'iso': 123,
      'iso_numeric': 950,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response2 = await testApp
        .post('/test-currency')
        .send(invalidCurrency2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Currency ISO Should be Alphabetic.`);

    const invalidCurrency3 = {
      'iso': 12345,
      'iso_numeric': 950,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response3 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Currency ISO Should be Alphabetic. Currency ISO Should be 3 Character.`);
    const invalidCurrency4 = {
      'iso': 'XAFA',
      'iso_numeric': 950,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response4 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Currency ISO Should be 3 Character.`);

    const invalidCurrency5 = {
      'iso': 'XA',
      'iso_numeric': 950,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response5 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        .toEqual(`Currency ISO Should be 3 Character.`);

    const invalidCurrency7 = {
      'iso': 'xaf',
      'iso_numeric': 950,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response7 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
        .toEqual(`Currency ISO Should be in Upper Case.`);

    const invalidCurrency6 = {
      'iso': 'xafh',
      'iso_numeric': 950,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response6 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Currency ISO Should be 3 Character. Currency ISO Should be in Upper Case.`);
  });

  test('Test Cases for Currency ISO-Numeric', async () => {
    const invalidCurrency1 = {
      'iso': 'XAF',
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response1 = await testApp
        .post('/test-currency')
        .send(invalidCurrency1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Currency ISO-Numeric Should not be empty.`);

    const invalidCurrency2 = {
      'iso': 'XAF',
      'iso_numeric': 'XAF',
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response2 = await testApp
        .post('/test-currency')
        .send(invalidCurrency2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Currency ISO-Numeric Should be Numeric value and min 1 max 3 Digit.`);

    const invalidCurrency3 = {
      'iso': 'XAF',
      'iso_numeric': 0,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response3 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Currency ISO-Numeric Should be Numeric value and min 1 max 3 Digit.`);
    const invalidCurrency4 = {
      'iso': 'XAF',
      'iso_numeric': 9999,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response4 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Currency ISO-Numeric Should be Numeric value and min 1 max 3 Digit.`);

    const invalidCurrency5 = {
      'iso': 'XAF',
      'iso_numeric': 99.99,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response5 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Currency ISO-Numeric Should be Numeric value and min 1 max 3 Digit.`);

  });

  test('Test Cases for Currency Common Name', async () => {
    const invalidCurrency1 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response1 = await testApp
        .post('/test-currency')
        .send(invalidCurrency1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Currency Common Name Should not be empty.`);

    const invalidCurrency2 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 464411111,
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response2 = await testApp
        .post('/test-currency')
        .send(invalidCurrency2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Currency Common Name Should be Alphabetic.`);

    const invalidCurrency4 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'CFA francCentral African CFA francCentral African',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response4 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Currency Common Name Should be min 1 max 30 Character.`);

    const invalidCurrency5 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA francCentral African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response5 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        .toEqual(`Currency Common Name Should be min 1 max 30 Character.`);
  });
  test('Test Cases for Currency Official Name', async () => {
    const invalidCurrency1 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'icon': 'Fr',
    };
    const response1 = await testApp
        .post('/test-currency')
        .send(invalidCurrency1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Currency Official Name Should not be empty.`);

    const invalidCurrency2 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'official_name': 1434241,
      'icon': 'Fr',
    };
    const response2 = await testApp
        .post('/test-currency')
        .send(invalidCurrency2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Currency Official Name Should be Alphabetic.`);

    const invalidCurrency4 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'official_name': 'francCentral African CFA franc CFA',
      'icon': 'Fr',
    };
    const response4 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Currency Official Name Should be min 1 max 30 Character.`);

    const invalidCurrency5 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA francCentral African CFA franc',
      'icon': 'Fr',
    };
    const response5 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        .toEqual(`Currency Official Name Should be min 1 max 30 Character.`);
  });
  test('Test Cases for Currency Icon', async () => {
    const invalidCurrency1 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
    };
    const response1 = await testApp
        .post('/test-currency')
        .send(invalidCurrency1);
    expect(response1.body.success).toEqual(undefined);

    const invalidCurrency2 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': false,
    };
    const response2 = await testApp
        .post('/test-currency')
        .send(invalidCurrency2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Currency Icon Should be string.`);

    const invalidCurrency3 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': true,
    };
    const response3 = await testApp
        .post('/test-currency')
        .send(invalidCurrency3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Currency Icon Should be string.`);
    const invalidCurrency4 = {
      'iso': 'XAF',
      'iso_numeric': 4,
      'common_name': 'Central African CFA franc',
      'official_name': 'Central African CFA franc',
      'icon': 45,
    };
    const response4 = await testApp
        .post('/test-Currency')
        .send(invalidCurrency4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Currency Icon Should be string.`);
  });

  test('Empty input of Currency', async () => {
    const requestCurrency = {};
    const response = await testApp
        .post('/test-currency')
        .send(requestCurrency);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Currency ISO Should not be empty. Currency ISO-Numeric Should not be empty. Currency Common Name Should not be empty. Currency Official Name Should not be empty.`);
  });
});

describe(' Test Currency Validator', () => {
  test('Correct Param input of Currency', async () => {
    const iso = 'AWG';
    const response = await testApp
        .get('/test-currency/' + iso);
    expect(response.text).toEqual('Success');
  });
  test('Incorrect Param input of Currency', async () => {
    const iso: number = 33;
    const response = await testApp
        .get('/test-currency/' + iso);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Currency ISO Should be Alphabetic. Currency ISO Should be 3 Character.`);
  });
  test('Incorrect Param input of Currency', async () => {
    const iso: String = 'A';
    const response = await testApp
        .get('/test-currency/' + iso);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Currency ISO Should be 3 Character.`);
  });
  test('Incorrect Param input of Currency', async () => {
    const iso: String = 'afg';
    const response = await testApp
        .get('/test-currency/' + iso);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Currency ISO Should be in Upper Case.`);
  });
});
