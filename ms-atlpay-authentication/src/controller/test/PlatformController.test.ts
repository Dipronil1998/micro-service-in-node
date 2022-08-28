import supertest from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../../config/app';
import {httpAppCredentialsNotPresent, httpDataNotFound,
  httpInvalidAppCredential, httpSuccessDataUpdate,
  ormDBName} from '../../../config/bootstrap';
import {Platform} from '../../model/entity/Platform';
import {RepositoryParameter} from '../../model/repository/AppRepository';
import {Platforms} from '../../model/repository/Platforms';
import {DBService} from '../../service/DBService';
import {PlatformsSeed} from '../../../config/seeds/PlatformsSeed';
const App = supertest(app.app);

let token: any;
let appTokenId: string;
let appSecretId: string;
describe('Test for PUT /auth/platform/id', () => {
  const dbService: DBService = new DBService();
  const validCode = 'WWW';
  const inValidCode = 'WWA';
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new PlatformsSeed().run();
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

  test('ENABLE Platform', async () => {
    const updateData = {
      '_isEnable': false,
    };
    const response = await
    App.put('/v1/auth/platform/' + validCode + '/enable/')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('ENABLE Platform by wrong code', async () => {
    const updateData = {
      '_isEnable': false,
    };
    const response =
    await App.put('/v1/auth/platform/' + inValidCode + '/enable/')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual('Invalid Platform');
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });
  test('DISABLE for Platform', async () => {
    const updateData = {
      '_isEnable': true,
    };
    const response =
    await App.put('/v1/auth/platform/' + validCode + '/disable/')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });
  test('DISABLE Platform by wrong id', async () => {
    const updateData = {
      '_isEnable': false,
    };
    const response = await App.put('/v1/auth/platform/'+inValidCode+'/disable/')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(updateData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual('Invalid Platform');
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test for GET /auth/platform', () => {
  const dbService: DBService = new DBService();
  const validCode = 'WWW';
  const inValidCode = 'WWA';
  beforeAll(async () => {
    await dbService.connect();
  });

  test('GET Data for Platform /auth/platform', async () => {
    const response = await App.get('/v1/auth/platform')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });
  test('GET Infomation by code /auth/platform', async () => {
    const response = await App.get('/v1/auth/platform/' + validCode)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    expect(response.status).toEqual(200);
  });
  test('GET Infomation by wrong code /auth/info', async () => {
    const response = await App.get('/v1/auth/platform/' + inValidCode)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(400);
  });

  test('Verify Correct Auth Token', async () => {
    const response = await App.get('/v1/auth/platform/verify')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(400);
  });

  test('Verify Blank Auth Token', async () => {
    const response = await App.get('/v1/auth/platform/verify');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpAppCredentialsNotPresent);
    expect(response.status).toEqual(401);
    expect(response.status).not.toEqual(400);
  });

  test('Verify Incorrect Auth Token', async () => {
    const response = await App.get('/v1/auth/platform/verify')
        .set({app_token_id: '84512ea8-9e12-11ec-b909-0242ac120002',
          app_secret_id: '8451356a-9e12-11ec-b909-0242ac120002'});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpInvalidAppCredential);
    expect(response.status).toEqual(401);
    expect(response.status).not.toEqual(400);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE platforms CASCADE');
    await dbService.close();
  });
});
