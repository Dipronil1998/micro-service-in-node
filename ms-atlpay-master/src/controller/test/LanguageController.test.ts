import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {DBService} from '../../service/DBService';
import express from 'express';
import bodyParser from 'body-parser';
import {ErrorHandlerMiddleware} from '../../middleware/ErrorHandlerMiddleware';
import {PageNotFoundMiddleware} from '../../middleware/PageNotFoundMiddleware';
import {LanguagesSeed} from '../../../config/seeds/LanguagesSeed';
import {httpDataNotFound, httpPageNotFoundMessage, ormDBName}
  from '../../../config/bootstrap';
import {LanguageController} from '../LanguageController';
const app: express.Application = express();
app.use(bodyParser.json());

app.get('/language', new LanguageController('Language Controller')
    .find);
app.get('/language/:code', new LanguageController('Language Controller')
    .get);
app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);

const testApp = supertest(app);

describe('Test For GET /v1/base/language', () => {
  const dbService: DBService = new DBService();
  const validCode: string = 'arg';
  const inValidCode: string = 'arz';
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new LanguagesSeed().run();
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });
  });

  test('', ()=> {
    expect(2).toEqual(2);
  });

  test('Test For Get All Data of Language', async () => {
    const response = await testApp.get('/language');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Valid Data of Continent', async () => {
    const response = await testApp.get('/language/' + validCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Invalid Data of Language', async () => {
    const response = await testApp.get('/language/' + inValidCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Get Page Not Found', async () => {
    const response = await testApp.get('/languages');
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
        .query('TRUNCATE TABLE languages CASCADE');
    const response = await testApp.get('/language');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE languages CASCADE');
    await dbService.close();
  });
});
