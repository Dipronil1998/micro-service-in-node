import supertest from 'supertest';
import {Connection, getConnection} from 'typeorm';
import {app} from '../../../config/app';
import {
  httpDataNotFound, httpPageNotFoundMessage,
  httpSuccessDataDelete, httpSuccessDataUpdate, ormDBName,
}
  from '../../../config/bootstrap';
import {Currency} from '../../model/entity/Currency';
import {DBService} from '../../service/DBService';
import {CurrenciesSeed} from '../../../config/seeds/CurrenciesSeed';
const App = supertest(app.app);

describe('Test for GET Currency', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async () => {
      await new CurrenciesSeed().run();
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });
  });
  test('GET /currency', async () => {
    const response = await App.get('/v1/base/currency');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);

    expect(response.status).not.toEqual(500);
  });
  test('GET error /currency', async () => {
    const response = await App.get('/v1/base/currencies');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET /currency/:iso', async () => {
    const iso: string = 'XAF';
    const response = await App.get('/v1/base/currency/' + iso);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(500);
  });
  test('Retreving Currency for DataNotFound GET /currency',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE currencies CASCADE');
        const response = await App.get('/v1/base/currency');
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving Currency for DataNotFound iso GET /currency/:iso',
      async () => {
        const iso: string = 'AZB';
        const response = await App.get('/v1/base/currency/' + iso);
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

describe('Test for UPDATE Currency', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const currency = new Currency();
    currency.iso = 'AZB',
    currency.isoNumeric = 449,
    currency.commonName = 'baijani mana',
    currency.officialName = 'Azerbaijan',
    currency.icon = '',
    currency.createdOn = new Date(),
    currency.modifiedOn = new Date();
    const connection: Connection = getConnection(ormDBName);
    await connection.manager.save(currency);
  });
  test('Updating Currency for Valid iso PUT /currency/:iso',
      async () => {
        const currency = {
          'iso_numeric': 944,
          'common_name': 'Azerbaijani',
          'official_name': 'Azerbaijan',
          'icon': '#',
        };
        const iso: string = 'AZB';
        const response = await App.put('/v1/base/currency/' + iso)
            .send(currency);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
        expect(response.status).toEqual(200);
        expect(response.status).not.toEqual(404);
        expect(response.status).not.toEqual(500);
      },
  );
  test('Updating Currency for inValid iso PUT /currency/:iso',
      async () => {
        const currency = {
          iso: 'ABC',
        };
        const iso: string = 'AZB';
        const response = await App.put('/v1/base/currency/' + iso)
            .send(currency);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual('Invalid ISO');
        expect(response.status).toEqual(400);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      },
  );
  test('Updating Currency for invalid iso PUT /currency/:iso',
      async () => {
        const iso: string = 'XYZ';
        const response = await App.put('/v1/base/currency/' + iso);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving Currency for DataNotFound PUT /currency',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE currencies CASCADE');
        const iso: string = 'XYZ';
        const response = await App.put('/v1/base/currency/' + iso);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test for DELETE/currency', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const currency = new Currency();
    currency.iso = 'AZB',
    currency.isoNumeric = 449,
    currency.commonName = 'baijani mana',
    currency.officialName = 'Azerbaijan',
    currency.icon = '';
    currency.createdOn = new Date();
    currency.modifiedOn = new Date();
    const connection: Connection = getConnection(ormDBName);
    await connection.manager.save(currency);
  });
  test('DELETE /currency/:iso', async () => {
    const iso: string = 'AZB';
    const response = await App.delete('/v1/base/currency/' + iso);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataDelete);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });
  test('DELETE error /currency', async () => {
    const response = await App.delete('/v1/base/currencies');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('Deleteing Currency for invalid iso DELETE /currency/:iso',
      async () => {
        const iso: string = 'AZB';
        const response = await App.delete('/v1/base/currency/' + iso);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE currencies CASCADE');
    await dbService.close();
  });
});
