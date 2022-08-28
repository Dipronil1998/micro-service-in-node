import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {
  httpDataNotFound, httpPageNotFoundMessage,
  httpSuccessDataCreate,
  httpSuccessDataDelete, httpSuccessDataUpdate, ormDBName,
} from '../../../config/bootstrap';
const App = supertest(app.app);

describe('Test cases API to insert Country', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('test cases for valid input data', async () => {
    const country = {
      'continent_code': 'CC',
      'iso_2': 'IN',
      'iso_3': 'ISO',
      'iso_numeric': 66,
      'fips_code': 'FC',
      'isd_code': 10,
      'common_name': 'Common',
      'official_name': 'Official',
      'endonym': 'Official',
      'demonym': 'Official',
      'official_currency_code': 'OCC',
    };
    const response = await App.post('/v1/base/country').send(country);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataCreate);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('test cases for missing input data', async () => {
    const country = {

    };
    const response = await App.post('/v1/base/country').send(country);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(500);
  });

  test('test cases for without demonym', async () => {
    const country = {
      'continent_code': 'DD',
      'iso_2': 'IT',
      'iso_3': 'ITT',
      'iso_numeric': 40,
      'fips_code': 'FD',
      'isd_code': 13,
      'common_name': 'Common name',
      'official_name': 'Official name',
      'endonym': 'Official',
      'official_currency_code': 'ADD',
    };
    const response = await App.post('/v1/base/country').send(country);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });

  test('test cases for without fips_code', async () => {
    const country = {
      'continent_code': 'QQ',
      'iso_2': 'AK',
      'iso_3': 'AKL',
      'iso_numeric': 8,
      'isd_code': 66,
      'common_name': 'Common name',
      'official_name': 'Official name',
      'endonym': 'endonym',
      'demonym': 'demonym',
      'official_currency_code': 'AZZ',
    };
    const response = await App.post('/v1/base/country').send(country);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('GET Current Country by IP', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('GET error PageNotFound Current-Country', async () => {
    const response = await App.get('/v1/base/country/ip/currents');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(500);
  });
  test('GET Location by Current-Country API', async () => {
    const response = await App.get('/v1/base/country/ip/current');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.info.message);
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
    expect(response.status).not.toEqual(500);
  });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('Update /country/:iso_numeric', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('Update /country/:iso_numeric', async () => {
    const country = {
      'continent_code': 'UP',
      'iso2': 'IT',
      'iso3': 'ITT',
      'iso_numeric': 40,
      'fips_code': 'FD',
      'isd_code': 13,
      'common_name': 'common name',
      'official_name': 'official name',
      'endonym': 'endonym',
      'demonym': 'demonym',
      'official_currency_code': 'ADD',
    };
    const countryIsoNumeric: number = 40;
    const response = await App.put('/v1/base/country/' + countryIsoNumeric)
        .send(country);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });

  test('Update country for invalid iso_numeric',
      async () => {
        const countryIsoNumeric: number = 494;
        const response = await App.put('/v1/base/country/' + countryIsoNumeric);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
      });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('Update Single country status', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('Block country', async () => {
    const country = {
      'iso_numeric': 40,
      'block_country': true,
    };
    const response = await App.put('/v1/base/country/changestatus')
        .send(country);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.info.message)
        .toEqual('official name has been disabled');
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Block country error', async () => {
    const country = {
      'iso_numeric': 400,
      'block_country': true,
    };
    const response = await App.put('/v1/base/country/changestatus')
        .send(country);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('Update Multiple country status', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('Block multiple country', async () => {
    const country = [
      {
        'iso_numeric': 8,
        'block_country': true,
      },
      {
        'iso_numeric': 40,
        'block_country': true,
      },
    ];
    const response = await App.put('/v1/base/country/changestatus/country')
        .send(country);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(200);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Block multiple countries errro', async () => {
    const country = [{
      'iso_numeric': 400,
      'block_country': true,
    }];
    const response = await App.put('/v1/base/country/changestatus/country')
        .send(country);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('GET country', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('GET /country', async () => {
    const response = await App.get('/v1/base/country');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('GET /country/:iso_numeric', async () => {
    const isoNumeric: number = 66;
    const response = await App.get('/v1/base/country/' + isoNumeric);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('GET error /country', async () => {
    const response = await App.get('/v1/base/countries');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(500);
  });
  test('retrieving country for invalid iso_numeric GET /country/:isoNumeric',
      async () => {
        const isoNumeric: number = 240;
        const response = await App.get('/v1/base/country/' + isoNumeric);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(200);
        expect(response.status).not.toEqual(500);
      });
  test('retrieving country for invalid validator isoNumeric',
      async () => {
        const isoNumeric: number = 4444;
        const response = await App.get('/v1/base/country/' + isoNumeric);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
        // eslint-disable-next-line
        .toEqual('Country ISO-Numeric Should be Numeric and min 1 max 3 Digit.');
        expect(response.status).toEqual(400);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(200);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving country for DataNotFound GET /country',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE countries CASCADE');
        const response = await App.get('/v1/base/country');
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
        expect(response.status).not.toEqual(200);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving country for DataNotFound iso GET /country/:isoNumeric',
      async () => {
        const isoNumeric: number = 240;
        const response = await App.get('/v1/base/country/' + isoNumeric);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('Delete /country/:iso_numeric', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const country = {
      'continent_code': 'CC',
      'iso_2': 'IS',
      'iso_3': 'ISO',
      'iso_numeric': 166,
      'fips_code': 'FC',
      'isd_code': 10,
      'common_name': 'Common',
      'official_name': 'Official',
      'endonym': 'Official',
      'demonym': 'Official',
      'official_currency_code': 'OCC',
    };
    await App.post('/v1/base/country').send(country);
  });
  test('Delete country for valid iso_numeric DELETE /country/:iso_numeric',
      async () => {
        const countryIsoNumeric: number = 166;
        const response = await App.delete('/v1/base/country/' +
        countryIsoNumeric);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.info.message).toEqual(httpSuccessDataDelete);
        expect(response.status).toEqual(200);
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(500);
      });
  test('Delete country for invalid iso_numeric DELETE /country/:iso_numeric',
      async () => {
        const countryIsoNumeric: number = 66;
        const response = await App.delete('/v1/base/country/' +
        countryIsoNumeric);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });

  afterAll(async () => {
    await dbService.close();
  });
});
