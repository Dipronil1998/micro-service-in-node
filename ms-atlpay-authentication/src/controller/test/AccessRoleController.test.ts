import supertest from 'supertest';
import {AccessRoleController} from '../AccessRoleController';
import {DBService} from '../../service/DBService';
import {httpDataNotFound, ormDBName}
  from '../../../config/bootstrap';
import {getConnection} from 'typeorm';
import {AccessRoleSeed} from '../../../config/seeds/AccessRoleSeed';
import express from 'express';
import bodyParser from 'body-parser';
import {ErrorHandlerMiddleware} from '../../middleware/ErrorHandlerMiddleware';
import {AdminAuthenticationSeed} from
  '../../../config/seeds/AdminAuthenticationSeed';
import {UsersAuthenticationSeed} from
  '../../../config/seeds/UsersAuthenticationSeed';
const app: express.Application = express();
app.use(bodyParser.json());

app.get('/accessrole', new AccessRoleController().find);
app.get('/accessrole/admin', new AccessRoleController().getAdmin);
app.get('/accessrole/merchant', new AccessRoleController().getMerchant);
app.use(new ErrorHandlerMiddleware().errorHandler);

const testApp = supertest(app);

describe('GET /v1/auth/role', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new AccessRoleSeed().run();
      await new AdminAuthenticationSeed().run();
      await new UsersAuthenticationSeed().run();
    });
  });
  test('Test For GET Data /v1/auth/role', async () => {
    const response = await testApp.get('/accessrole');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });
  test('Test For Get Data GET /v1/auth/role/admin', async () => {
    const response = await testApp.get('/accessrole/admin');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });
  test('Test For Data Not Found Admin Role', async ()=> {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE admin_authentications CASCADE');
    const response = await testApp.get('/accessrole/admin');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });
  test('Test For Get Data GET /v1/auth/role/merchant', async () => {
    const response = await testApp.get('/accessrole/merchant');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });
  test('Test For Data Not Found Merchant Role', async ()=> {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE user_authentications CASCADE');
    const response = await testApp.get('/accessrole/merchant');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });
  test('GET Data Not Found Error /v1/auth/role', async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE access_roles CASCADE');
    const response = await testApp.get('/accessrole');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });
  afterAll(async () => {
    await dbService.close();
  });
});
