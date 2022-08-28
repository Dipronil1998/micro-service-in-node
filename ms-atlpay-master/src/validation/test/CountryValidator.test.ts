import express, {NextFunction, Request, Response}
  from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {CountryValidator} from '../CountryValidator';
const app: express.Application = express();
app.use(bodyParser.json());
app.post('/test-country',
    new CountryValidator('Country Validator').validationChain,
    new CountryValidator('Country Validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.get('/test-country/:iso_numeric',
    new CountryValidator('Country Validator').paramValidateChain,
    new CountryValidator('Country Validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
const testApp = supertest(app);
describe(' Test Country Validator', () => {
  test('Correct input of Country', async () => {
    const requestCountry = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response = await testApp
        .post('/test-country')
        .send(requestCountry);
    expect(response.text).toEqual('Success');
  });

  test('Test Cases for Country continent Code', async () => {
    const invalidCountry1 = {
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country Continent Code Should not be Empty.`);

    const invalidCountry2 = {
      'continent_code': 21,
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country Continent Code Should Alphabetic.`);

    const invalidCountry3 = {
      'continent_code': 'ASAS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country Continent Code Should min 2 max 2.`);
    const invalidCountry4 = {
      'continent_code': 'A',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Country Continent Code Should min 2 max 2.`);

    const invalidCountry5 = {
      'continent_code': 'asa',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response5 = await testApp
        .post('/test-country')
        .send(invalidCountry5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Continent Code Should min 2 max 2. Country Continent Code Should in Upper Case.`);

    const invalidCountry6 = {
      'continent_code': 'as',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response6 = await testApp
        .post('/test-country')
        .send(invalidCountry6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Continent Code Should in Upper Case.`);

    const invalidCountry7 = {
      'continent_code': 'a',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response7 = await testApp
        .post('/test-country')
        .send(invalidCountry7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Continent Code Should min 2 max 2. Country Continent Code Should in Upper Case.`);
  });

  test('Test Cases for Country ISO-2', async () => {
    const invalidCountry1 = {
      'continent_code': 'AB',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country ISO-2 Should not be Empty.`);

    const invalidCountry2 = {
      'continent_code': 'AB',
      'iso_2': 12,
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country ISO-2 Should Alphabetic.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AFAF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country ISO-2 Should min 2 max 2.`);

    const invalidCountry4 = {
      'continent_code': 'AB',
      'iso_2': 'A',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Country ISO-2 Should min 2 max 2.`);

    const invalidCountry5 = {
      'continent_code': 'AB',
      'iso_2': 'af',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response5 = await testApp
        .post('/test-country')
        .send(invalidCountry5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-2 Should be in Upper Case.`);

    const invalidCountry6 = {
      'continent_code': 'AF',
      'iso_2': 'afafa',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response6 = await testApp
        .post('/test-country')
        .send(invalidCountry6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-2 Should min 2 max 2. Country ISO-2 Should be in Upper Case.`);

    const invalidCountry7 = {
      'continent_code': 'AF',
      'iso_2': 1234,
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response7 = await testApp
        .post('/test-country')
        .send(invalidCountry7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-2 Should Alphabetic. Country ISO-2 Should min 2 max 2.`);
  });

  test('Test Cases for Country ISO-3', async () => {
    const invalidCountry1 = {
      'continent_code': 'AB',
      'iso_2': 'AF',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country ISO-3 Should not be Empty.`);

    const invalidCountry2 = {
      'continent_code': 'AB',
      'iso_2': 'AF',
      'iso_3': 123,
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country ISO-3 Should Alphabetic.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFGH',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country ISO-3 Should min 3 max 3.`);

    const invalidCountry4 = {
      'continent_code': 'AB',
      'iso_2': 'AF',
      'iso_3': 'A',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Country ISO-3 Should min 3 max 3.`);

    const invalidCountry5 = {
      'continent_code': 'AB',
      'iso_2': 'AF',
      'iso_3': 'afg',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response5 = await testApp
        .post('/test-country')
        .send(invalidCountry5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-3 Should be in Upper Case.`);

    const invalidCountry6 = {
      'continent_code': 'AF',
      'iso_2': 'AF',
      'iso_3': 'afgh',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response6 = await testApp
        .post('/test-country')
        .send(invalidCountry6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-3 Should min 3 max 3. Country ISO-3 Should be in Upper Case.`);

    const invalidCountry7 = {
      'continent_code': 'AF',
      'iso_2': 'AF',
      'iso_3': 1234,
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response7 = await testApp
        .post('/test-country')
        .send(invalidCountry7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-3 Should Alphabetic. Country ISO-3 Should min 3 max 3.`);
  });

  test('Test Cases for Country ISO Numeric', async () => {
    const invalidCountry1 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country ISO Numeric Should not be Empty.`);

    const invalidCountry2 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 'cd',
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-Numeric Should be Numeric and min 1 max 3 Digit.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 0,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-Numeric Should be Numeric and min 1 max 3 Digit.`);

    const invalidCountry4 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 9999,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-Numeric Should be Numeric and min 1 max 3 Digit.`);
  });

  test('Test Cases for Country Fips Code', async () => {
    const invalidCountry1 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 12,
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country Fips Code Should Alphabetic.`);

    const invalidCountry2 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'A',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country Fips Code Should min 2 max 2.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AFLL',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country Fips Code Should min 2 max 2.`);

    const invalidCountry4 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 1234,
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Fips Code Should Alphabetic. Country Fips Code Should min 2 max 2.`);

    const invalidCountry5 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'a',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response5 = await testApp
        .post('/test-country')
        .send(invalidCountry5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Fips Code Should min 2 max 2. Country Fips Code Should be in Upper Case.`);

    const invalidCountry6 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'ah',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response6 = await testApp
        .post('/test-country')
        .send(invalidCountry6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Fips Code Should be in Upper Case.`);

    const invalidCountry7 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'ahhh',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response7 = await testApp
        .post('/test-country')
        .send(invalidCountry7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Fips Code Should min 2 max 2. Country Fips Code Should be in Upper Case.`);
  });

  test('Test Cases for Country ISD Code', async () => {
    const invalidCountry1 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country ISD Code Should not be Empty.`);

    const invalidCountry2 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 'sd',
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country ISD Code Should be Numeric and min 1 max 3 Digit.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 9999,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country ISD Code Should be Numeric and min 1 max 3 Digit.`);

    const invalidCountry4 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': false,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Country ISD Code Should be Numeric and min 1 max 3 Digit.`);
  });

  test('Test Cases for Country Common Name', async () => {
    const invalidCountry1 = {
      'continent_code': 'AB',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country Common Name Should not be Empty.`);

    const invalidCountry2 = {
      'continent_code': 'AB',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 123,
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country Common Name Should Alphabetic.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': '@#$%&',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country Common Name Should Alphabetic.`);

    const invalidCountry4 = {
      'continent_code': 'AB',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Af',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Country Common Name Should min 3 max 30.`);

    const invalidCountry5 = {
      'continent_code': 'AB',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'AfghanistanAfghanistanAfghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response5 = await testApp
        .post('/test-country')
        .send(invalidCountry5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Common Name Should min 3 max 30.`);

    const invalidCountry6 = {
      'continent_code': 'AF',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      // eslint-disable-next-line
      'common_name': 'AfghanistanAfghanistanAfghanistanAfghanistanAfghanistanAfghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response6 = await testApp
        .post('/test-country')
        .send(invalidCountry6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Common Name Should min 3 max 30.`);

    const invalidCountry7 = {
      'continent_code': 'AF',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 1,
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response7 = await testApp
        .post('/test-country')
        .send(invalidCountry7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Common Name Should Alphabetic. Country Common Name Should min 3 max 30.`);
  });

  test('Test Cases for Country Official Name', async () => {
    const invalidCountry1 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country Official Name Should not be Empty.`);

    const invalidCountry2 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 12345,
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country Official Name Should Alphabetic.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': '@#$%&*',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country Official Name Should Alphabetic.`);

    const invalidCountry4 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'AfghanistanAfghanistanAfghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Country Official Name Should min 3 max 30.`);

    const invalidCountry5 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Af',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response5 = await testApp
        .post('/test-country')
        .send(invalidCountry5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Official Name Should min 3 max 30.`);

    const invalidCountry6 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      // eslint-disable-next-line
      'official_name': 'AfghanistanAfghanistanAfghanistanAfghanistanAfghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Afghan',
    };
    const response6 = await testApp
        .post('/test-country')
        .send(invalidCountry6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Official Name Should min 3 max 30.`);

  });

  test('Test Cases for Country Endonym', async () => {
    const invalidCountry1 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'demonym': 'Afghan',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Country Endonym Should not be Empty.`);

    const invalidCountry2 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 12345,
      'demonym': 'Afghan',
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country Endonym Should be Character.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'اف',
      'demonym': 'Afghan',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country Endonym Should min 3 max 30.`);

    const invalidCountry4 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      // eslint-disable-next-line
      'endonym': 'افغانستانافغانستانافغانستانافغانستانافغانستانافغانستانافغانستانافغانستانافغانستانافغانستان',
      'demonym': 'Afghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Country Endonym Should min 3 max 30.`);

    const invalidCountry5 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 11,
      'demonym': 'Afghan',
    };
    const response5 = await testApp
        .post('/test-country')
        .send(invalidCountry5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Endonym Should be Character. Country Endonym Should min 3 max 30.`);
  });

  test('Test Cases for Country Demonym', async () => {
    const invalidCountry1 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
    };
    const response1 = await testApp
        .post('/test-country')
        .send(invalidCountry1);
    expect(response1.body.success).toEqual(undefined);

    const invalidCountry2 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 1234,
    };
    const response2 = await testApp
        .post('/test-country')
        .send(invalidCountry2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(`Country Demonym Should Character.`);

    const invalidCountry3 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 'Af',
    };
    const response3 = await testApp
        .post('/test-country')
        .send(invalidCountry3);
    expect(response3.body).toBeDefined();
    expect(response3.body.success).toBeDefined();
    expect(response3.body.success).toEqual(false);
    expect(response3.body.errors).toBeDefined();
    expect(response3.body.errors.error)
        .toEqual(`Country Demonym Should min 3 max 30.`);

    const invalidCountry4 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      // eslint-disable-next-line
      'demonym': 'AfghanAfghanAfghanAfghanAfghanAfghanAfghanAfghanAfghanAfghan',
    };
    const response4 = await testApp
        .post('/test-country')
        .send(invalidCountry4);
    expect(response4.body).toBeDefined();
    expect(response4.body.success).toBeDefined();
    expect(response4.body.success).toEqual(false);
    expect(response4.body.errors).toBeDefined();
    expect(response4.body.errors.error)
        .toEqual(`Country Demonym Should min 3 max 30.`);

    const invalidCountry5 = {
      'continent_code': 'AS',
      'iso_2': 'AF',
      'iso_3': 'AFG',
      'iso_numeric': 4,
      'fips_code': 'AF',
      'isd_code': 93,
      'common_name': 'Afghanistan',
      'official_name': 'Afghanistan',
      'endonym': 'افغانستان',
      'demonym': 1,
    };
    const response5 = await testApp
        .post('/test-country')
        .send(invalidCountry5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Demonym Should Character. Country Demonym Should min 3 max 30.`);
  });

  test('Correct input of Country', async () => {
    const requestCountry = {

    };
    const response = await testApp
        .post('/test-country')
        .send(requestCountry);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country Continent Code Should not be Empty. Country ISO-2 Should not be Empty. Country ISO-3 Should not be Empty. Country ISO Numeric Should not be Empty. Country ISD Code Should not be Empty. Country Common Name Should not be Empty. Country Official Name Should not be Empty. Country Endonym Should not be Empty.`);
  });
});

describe(' Test Country Validator', () => {
  test('Correct Param input of Country', async () => {
    // eslint-disable-next-line
    const iso_numeric: number = 3;
    const response = await testApp
        .get('/test-country/' + Number(iso_numeric));
    expect(response.text).toEqual('Success');
  });
  test('Incorrect Param input of Country', async () => {
    // eslint-disable-next-line
    const iso_numeric: String = 'AFG';
    const response = await testApp
    // eslint-disable-next-line
        .get('/test-country/' + iso_numeric);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Country ISO-Numeric Should be Numeric and min 1 max 3 Digit.`);
  });
});
