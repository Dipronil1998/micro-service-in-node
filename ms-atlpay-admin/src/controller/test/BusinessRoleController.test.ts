
import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../../config/app';
import {httpDataNotFound, ormDBName} from '../../../config/bootstrap';
import {BusinessRoleSeed} from '../../../config/seeds/BusinessRoleSeed';
import {DBService} from '../../service/DBService';
const App = supertest(app.app);

describe('GET /businessrole', ()=>{
  const dbService: DBService = new DBService();
  const validCode : string = 'DIRECTOR';
  const inValidCode : string = 'DIRECTORS';
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new BusinessRoleSeed().run();
    });
  });

  test('To get all data of Business Role', async ()=>{
    const response = await App.get('/v1/admin/businessrole');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Role by valid CODE', async ()=>{
    const response = await App.get('/v1/admin/businessrole/' + validCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Role by invalid CODE', async ()=>{
    const response = await App.get('/v1/admin/businessrole/' + inValidCode);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  test('To get data of Business Role by invalid CODE', async ()=>{
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE business_roles CASCADE');
    const response = await App.get('/v1/admin/businessrole');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.type).toEqual('application/json');
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await dbService.close();
  });
});
