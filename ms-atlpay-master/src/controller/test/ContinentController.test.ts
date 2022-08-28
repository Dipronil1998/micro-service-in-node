import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {DBService} from '../../service/DBService';
import express from 'express';
import bodyParser from 'body-parser';
import {ErrorHandlerMiddleware} from '../../middleware/ErrorHandlerMiddleware';
import {PageNotFoundMiddleware} from '../../middleware/PageNotFoundMiddleware';
import {ContinentsSeed} from '../../../config/seeds/ContinentsSeed';
import {httpDataNotFound, httpPageNotFoundMessage, ormDBName}
  from '../../../config/bootstrap';
import {ContinentController} from '../ContinentController';
const app: express.Application = express();
app.use(bodyParser.json());

app.get('/continent', new ContinentController('Continent Controller')
    .find);
app.get('/continent/:code', new ContinentController('Continent Controller')
    .get);
app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);

const testApp = supertest(app);

describe('Test For GET /v1/base/language', () => {
  const dbService: DBService = new DBService();
  const validCode: string = 'EU';
  const inValidCode: string = 'TT';
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new ContinentsSeed().run();
    });
  });

  test('Test For Get All Data of Continent', async () => {
    const response = await testApp.get('/continent');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Valid Data of Continent', async () => {
    const response = await testApp.get('/continent/' + validCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Invalid Data of Continent', async () => {
    const response = await testApp.get('/continent/' + inValidCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Page Not Found', async () => {
    const response = await testApp.get('/continents');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Data Not Found', async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE continents CASCADE');
    const response = await testApp.get('/continent');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await dbService.close();
  });
});
