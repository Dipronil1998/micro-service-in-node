import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {httpPageNotFoundMessage, httpDataNotFound, ormDBName}
  from '../../../config/bootstrap';
import {getConnection} from 'typeorm';
import {RepositoryParameter} from '../../model/repository/AppRepository';
import {Platforms} from '../../model/repository/Platforms';
import {Platform} from '../../model/entity/Platform';
import {PlatformsSeed} from '../../../config/seeds/PlatformsSeed';
const App = supertest(app.app);

let token: any;
let appTokenId: string;
let appSecretId: string;
describe('Test for GET device', () => {
  const dbService: DBService = new DBService();
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
  test('GET /auth/device', async () => {
    const user = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'email': 'user98@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'pin': '12345',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);

    const response = await App.get('/v1/auth/device')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET error /auth/device', async () => {
    const response = await App.get('/v1/auth/users')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('Retreving /auth/device for DataNotFound GET /auth/device',
      async () => {
        const response = await App.get('/v1/auth/device')
            .set({app_token_id: appTokenId, app_secret_id: appSecretId});
        const jsonResponse = JSON.parse(response.text);
        if (!jsonResponse) {
          expect(jsonResponse.errors.error)
              .toEqual(httpDataNotFound);
          expect(response.status).toEqual(404);
          expect(jsonResponse.success).toEqual(false);
          expect(response.status).not.toEqual(500);
        }
      });
  test('GET /auth/device/:email', async () => {
    const email: string = 'user98@email.com';
    const response = await App.get('/v1/auth/device/' + email)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });
  test('Retreving auth/device for invalid email GET /auth/device/:email',
      async () => {
        const email: string = 'user123@email.com';
        const response = await App.get('/v1/auth/device/' + email)
            .set({app_token_id: appTokenId, app_secret_id: appSecretId});
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving auth/device for DataNotFound GET /auth/device',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE devices CASCADE');
        const response = await App.get('/v1/auth/device')
            .set({app_token_id: appTokenId, app_secret_id: appSecretId});
        const jsonResponse = JSON.parse(response.text);
        if (!jsonResponse) {
          expect(jsonResponse.errors.error)
              .toEqual(httpDataNotFound);
          expect(response.status).toEqual(404);
          expect(jsonResponse.success).toEqual(false);
          expect(response.status).not.toEqual(500);
        }
      });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE user_authentications CASCADE');
    await dbService.close();
  });
});
