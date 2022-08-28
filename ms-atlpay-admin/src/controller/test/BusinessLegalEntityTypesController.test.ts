import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../../config/app';
import {httpDataNotFound, ormDBName} from '../../../config/bootstrap';
import {BusinessLegalEntityTypesSeed}
  from '../../../config/seeds/BusinessLegalEntityTypesSeed';
import {DBService} from '../../service/DBService';
const App = supertest(app.app);

describe('GET /businesslegalentitytype', ()=>{
  const dbService: DBService = new DBService();
  const validCode : string = 'TRUST';
  const inValidCode : string = 'TRUSTS';
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new BusinessLegalEntityTypesSeed().run();
    });
  });

  test('To get all data of Business Entity Type', async ()=>{
    const response = await App.get('/v1/admin/businesslegalentitytype');
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Entity Type by valid CODE', async ()=>{
    const response = await App.get('/v1/admin/businesslegalentitytype/' +
    validCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Entity Type by invalid CODE', async ()=>{
    const response = await App.get('/v1/admin/businesslegalentitytype/' +
    inValidCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Entity Type by invalid CODE', async ()=>{
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_legal_entity_types CASCADE');
    const response = await App.get('/v1/admin/businesslegalentitytype');
    const jsonResponse = JSON.parse(response.text);
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await dbService.close();
  });
});
