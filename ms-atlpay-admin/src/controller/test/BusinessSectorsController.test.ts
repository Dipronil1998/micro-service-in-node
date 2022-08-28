
import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../../config/app';
import {httpDataNotFound, ormDBName} from '../../../config/bootstrap';
import {BusinessSectorsSeed} from '../../../config/seeds/BusinessSectorsSeed';
import {DBService} from '../../service/DBService';
const App = supertest(app.app);

describe('GET /businesssectors', ()=>{
  const dbService: DBService = new DBService();
  const validCode : string = 'TRAVEL';
  const inValidCode : string = 'TRAVELS';
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new BusinessSectorsSeed().run();
    });
  });

  test('To get all data of Business Sectors', async ()=>{
    const response = await App.get('/v1/admin/businesssectors');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Sectors by valid CODE', async ()=>{
    const response = await App.get('/v1/admin/businesssectors/' + validCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Sectors by invalid CODE', async ()=>{
    const response = await App.get('/v1/admin/businesssectors/' + inValidCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(404);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Sectors by invalid CODE', async ()=>{
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_sectors CASCADE');
    const response = await App.get('/v1/admin/businesssectors');
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
