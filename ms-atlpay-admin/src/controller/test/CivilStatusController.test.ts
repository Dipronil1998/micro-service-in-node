
import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../../config/app';
import {httpDataNotFound, ormDBName} from '../../../config/bootstrap';
import {CivilStatusSeed} from '../../../config/seeds/CivilStatusSeed';
import {DBService} from '../../service/DBService';
const App = supertest(app.app);

describe('GET /civilstatus', ()=>{
  const dbService: DBService = new DBService();
  const validCode : string = 'ANNULLED';
  const inValidCode : string = 'ANNULLEDS';
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new CivilStatusSeed().run();
    });
  });

  test('To get all data of Business Status', async ()=>{
    const response = await App.get('/v1/admin/civilstatus');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Status by valid CODE', async ()=>{
    const response = await App.get('/v1/admin/civilstatus/' + validCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Status by invalid CODE', async ()=>{
    const response = await App.get('/v1/admin/civilstatus/' + inValidCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Status by invalid CODE', async ()=>{
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE civil_statuses CASCADE');
    const response = await App.get('/v1/admin/civilstatus');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await dbService.close();
  });
});
