import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../../config/app';
import {httpDataNotFound, httpPageNotFoundMessage, ormDBName}
  from '../../../config/bootstrap';
import {AccessRoleSeed} from '../../../config/seeds/AccessRoleSeed';
import {PlatformsSeed} from '../../../config/seeds/PlatformsSeed';
import {Platform} from '../../model/entity/Platform';
import {UserAuthentication} from '../../model/entity/UserAuthentication';
import {RepositoryParameter} from '../../model/repository/AppRepository';
import {Platforms} from '../../model/repository/Platforms';
import {DBService} from '../../service/DBService';
const App = supertest(app.app);

let token: any;
let appTokenId: string;
let appSecretId: string;
describe('Test for POST /auth/info', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new PlatformsSeed().run();
      await new AccessRoleSeed().run();
    });
    const dbName: any = ormDBName;
    const platformParameter: RepositoryParameter = new RepositoryParameter(
        'Platform',
        Platform,
        dbName,
        'none',
        getConnection(dbName),
    );
    const platformRepo: Platforms = new Platforms(platformParameter);
    platformRepo.initializeAssociations();
    token = await platformRepo.getOnCondition({_code: 'WWW'});
    appTokenId = token._appTokenId;
    appSecretId = token._appSecretId;
  });

  test('Data Insert with correct credentials', async () => {
    const userSignUp = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user',
      'email': 'user1@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId,
          app_secret_id: appSecretId})
        .send(userSignUp);
    const userLogIn = {
      email: 'user1@email.com',
      password: '1234567@Ab',
    };
    const response = await App.post('/v1/auth/user/login')
        .set({app_token_id: appTokenId,
          app_secret_id: appSecretId})
        .send(userLogIn);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Data Not Insert with incorrect credentials', async () => {
    const userLogIn = {
      email: 'user1@email.com',
      password: '1234567',
    };
    const response = await App.post('/v1/auth/user/login')
        .set({app_token_id: appTokenId,
          app_secret_id: appSecretId})
        .send(userLogIn);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test for GET /auth/info', () => {
  const validEmail: string = 'user1@email.com';
  const inValidEmail: string = 'user123@email.com';
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });

  test('GET Data for UserLoginLog /auth/info', async () => {
    const response = await App.get('/v1/auth/info')
        .set({app_token_id: appTokenId,
          app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('GET error for UserLoginInfo /auth/info', async () => {
    const response = await App.get('/v1/auth/infos')
        .set({app_token_id: appTokenId,
          app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  test('GET Infomation by Email /auth/info', async () => {
    const response = await App.get('/v1/auth/info/email/' + validEmail)
        .set({app_token_id: appTokenId,
          app_secret_id: appSecretId});
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('GET Infomation by Email /auth/info', async () => {
    const response = await App.get('/v1/auth/info/' + inValidEmail)
        .set({app_token_id: appTokenId,
          app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
  });

  test('GET blank Data for UserLoginLog /auth/info', async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE user_login_logs CASCADE');
    const response = await App.get('/v1/auth/info')
        .set({app_token_id: appTokenId,
          app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
  });

  afterAll(async () => {
    await getConnection(ormDBName).createQueryBuilder()
        .delete()
        .from(UserAuthentication)
        .where('_email = :email', {email: 'user1@email.com'})
        .execute();
    await dbService.close();
  });
});
