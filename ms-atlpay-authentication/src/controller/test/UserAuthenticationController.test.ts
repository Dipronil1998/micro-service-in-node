import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {
  httpPageNotFoundMessage, httpDataNotFound,
  userBlockAccount, incorrectPassword, httpEmailAlreadyExsits,
  userDataNotFound, ormDBName,
  emailAndRecoveryEmailMatchError,
  httpSuccessDataUpdate,
  emailAvailable,
  httpUserNameAlreadyExsits,
  userNameAvailable,
  currentAndNewPasswordMatchError,
}
  from '../../../config/bootstrap';
import {getConnection} from 'typeorm';
import {UserAuthentication}
  from '../../model/entity/UserAuthentication';
import {RepositoryParameter} from '../../model/repository/AppRepository';
import {Platform} from '../../model/entity/Platform';
import {Platforms} from '../../model/repository/Platforms';
import {PlatformsSeed} from '../../../config/seeds/PlatformsSeed';
import {AccessRoleSeed} from '../../../config/seeds/AccessRoleSeed';
import {UsersAuthenticationSeed}
  from '../../../config/seeds/UsersAuthenticationSeed';

const App = supertest(app.app);

let token: any;
let appTokenId: string;
let appSecretId: string;
describe('Test cases API to Create User', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async () => {
      await new PlatformsSeed().run();
      await new AccessRoleSeed().run();
      await new UsersAuthenticationSeed().run();
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

  test('test cases for valid input data', async () => {
    const user = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'email': 'user@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'pin': '12345',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    const response = await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);

    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.jwt).toBeDefined();
    expect(response.status).not.toEqual(400);
  });
  test('test cases for valid input data', async () => {
    const user = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'email': 'user99@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'pin': '12345',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    const response = await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.jwt).toBeDefined();
    expect(response.status).not.toEqual(400);
  });
  test('test cases for empty input data', async () => {
    const user = {
      'first_name': '',
      'last_name': '',
      'user_name': '',
      'email': '',
      'password': '',
      'confirm_password': '',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    const response = await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for same email input data', async () => {
    const user = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'email': 'user@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    const response = await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpEmailAlreadyExsits);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test cases API to Update User', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect()
        .then(async () => {
          await new PlatformsSeed().run();
        });
    const dbName: any = ormDBName;
    const platformParameter: RepositoryParameter =
            new RepositoryParameter(
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

  test('test cases for valid update data', async () => {
    const user = {
      'first_name': 'user',
      'middle_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'recovery_email': 'abc@email.com',
      'pin': '12345',
      'isd_code': 91,
      'mobile_no': 7544842320,
    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });
  test('test cases for valid update data', async () => {
    const user = {
      'first_name': 'user',
      'mobile_no': 7544842321,
    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });
  test('test cases for invalid update data', async () => {
    const user = {
      'mobile_no': 'sdfdsfdsfd',
    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for Same Email and RecoveryEmail', async () => {
    const user = {
      'recovery_email': 'user@email.com',
    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error)
        .toEqual(emailAndRecoveryEmailMatchError);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for empty data', async () => {
    const user = {

    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test cases API to Login User', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  //   test('test cases for valid input data', async () => {
  //     const user = {
  //       'email': 'user@email.com',
  //       'password': '1234567@Ab',
  //     };
  //     const response = await App.post('/v1/auth/user/login')
  //         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
  //         .send(user);
  //     const jsonResponse = JSON.parse(response.text);
  //     expect(response.status).toEqual(200);
  //     expect(jsonResponse.info.message).toEqual(twofaOtpSentmessage)
  //     expect(jsonResponse.success).toEqual(true);
  //     expect(jsonResponse.info.jwt).toBeDefined();
  //     expect(response.status).not.toEqual(400);
  //   });
  test('test cases for inValid user', async () => {
    const user = {
      'email': 'user123@email.com',
      'password': '1234567@Ab',
    };
    const response = await App.post('/v1/auth/user/login')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(userDataNotFound);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for inValid Password', async () => {
    const user = {
      'email': 'user@email.com',
      'password': '1234567abc',
    };
    const response = await App.post('/v1/auth/user/login')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(incorrectPassword);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  //   test('test cases for Unauthorized Client', async () => {
  //     const user = {
  //       'email': 'arnab@agpaytech.co.uk',
  //       'password': '1234',
  //     };
  //     const response = await App.post('/v1/auth/user/login')
  //         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
  //         .send(user);
  //     const jsonResponse = JSON.parse(response.text);
  //     expect(jsonResponse.errors.error)
  //         .toEqual(unauthorizedClientMessage);
  //     expect(response.status).toEqual(401);
  //     expect(jsonResponse.success).toEqual(false);
  //     expect(response.status).not.toEqual(200);
  //   });
  test('test cases for Empty input data', async () => {
    const user = {
      'email': ' ',
      'password': ' ',
    };
    const response = await App.post('/v1/auth/user/login')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

// describe('Test for verify JWT', () => {
//   const dbService: DBService = new DBService();
//   beforeAll(async () => {
//     await dbService.connect();
//   });
//   test('test cases for valid input data', async () => {
//     const user = {
//       'email': 'user@email.com',
//       'password': '1234567@Ab',
//     };
//     const response = await App.post('/v1/auth/user/login')
//         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
//         .send(user);
//     expect(response.status).toEqual(200);
//     const jsonResponse = JSON.parse(response.text);
//     expect(jsonResponse.success).toEqual(true);
//     expect(jsonResponse.info.jwt).toBeDefined();
//     expect(response.status).not.toEqual(400);
//     const jwt = jsonResponse.info.jwt.access_token;

//     const response1 = await App.get('/v1/auth/user/jwt/verify')
//         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
//         .set('Authorization', 'Authorization ' + jwt);
//     expect(response1.status).toEqual(200);
//     const jsonResponse1 = JSON.parse(response1.text);
//     expect(jsonResponse1.success).toEqual(true);
//     expect(jsonResponse1.info).toBeDefined();
//     expect(response1.status).not.toEqual(400);

//     const response2 = await App.get('/v1/auth/user/jwt/verify')
//         .set({app_token_id: appTokenId, app_secret_id: appSecretId});
//     expect(response2.status).toEqual(401);
//     const jsonResponse2 = JSON.parse(response2.text);
//     expect(jsonResponse2.success).toEqual(false);
//     expect(jsonResponse2.info).not.toBeDefined();
//     expect(jsonResponse2.errors.error)
//         .toEqual(missingAuthenticationToken);
//     expect(response2.status).not.toEqual(500);

//     const response3 = await App.get('/v1/auth/user/jwt/verify')
//         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
//         .set('Authorization', 'Auth' + jwt);
//     expect(response3.status).toEqual(401);
//     const jsonResponse3 = JSON.parse(response3.text);
//     expect(jsonResponse3.success).toEqual(false);
//     expect(jsonResponse3.info).not.toBeDefined();
//     expect(jsonResponse3.errors.error)
//         .toEqual(unauthorizedClientMessage);
//     expect(response3.status).not.toEqual(500);
//   });

//   afterAll(async () => {
//     await getConnection(ormDBName).manager
//     .query('TRUNCATE TABLE user_authentications CASCADE');
//     await dbService.close();
//   });
// });

// describe('Test for verify JWT with AppPlatform', () => {
//   const dbService: DBService = new DBService();
//   beforeAll(async () => {
//     await dbService.connect();
//   });
//   test('test cases for valid input data', async () => {
//     const user = {
//       'email': 'user@email.com',
//       'password': '1234567@Ab',
//     };
//     const response = await App.post('/v1/auth/user/login')
//         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
//         .send(user);
//     expect(response.status).toEqual(200);
//     const jsonResponse = JSON.parse(response.text);
//     expect(jsonResponse.success).toEqual(true);
//     expect(jsonResponse.info.jwt).toBeDefined();
//     expect(response.status).not.toEqual(400);
//     const jwt = jsonResponse.info.jwt.access_token;

//     const response1 = await App.get('/v1/auth/user/token/jwt/verify')
//         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
//         .set('Authorization', 'Authorization ' + jwt);
//     expect(response1.status).toEqual(200);
//     const jsonResponse1 = JSON.parse(response1.text);
//     expect(jsonResponse1.success).toEqual(true);
//     expect(jsonResponse1.info).toBeDefined();
//     expect(response1.status).not.toEqual(400);

//     const response2 = await App.get('/v1/auth/user/token/jwt/verify')
//         .set({app_token_id: appTokenId, app_secret_id: appSecretId});
//     expect(response2.status).toEqual(401);
//     const jsonResponse2 = JSON.parse(response2.text);
//     expect(jsonResponse2.success).toEqual(false);
//     expect(jsonResponse2.info).not.toBeDefined();
//     expect(jsonResponse2.errors.error)
//         .toEqual(missingAuthenticationToken);
//     expect(response2.status).not.toEqual(500);

// eslint-disable-next-line
//     const jwt1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2UwYzRmNTYtNDAyNC00MGQ3LTk3OWMtZjE4NzFkNTFiNDAxIiwidXNlcl9lbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUyMDk5NzY4LCJleHAiOjE2NTIxMDMzNjh9.RFYsgkkQZqXcoTn1KyBOA42FWZa2nn";
//     const response3 = await App.get('/v1/auth/user/token/jwt/verify')
//         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
//         .set('Authorization', 'Authorization' + jwt1);
//     expect(response3.status).toEqual(401);
//     const jsonResponse3 = JSON.parse(response3.text);
//     expect(jsonResponse3.success).toEqual(false);
//     expect(jsonResponse3.info).not.toBeDefined();
//     expect(jsonResponse3.errors.error)
//         .toEqual(unauthorizedClientMessage);
//     expect(response3.status).not.toEqual(500);
//   });

//   afterAll(async () => {
//     await dbService.close();
//   });
// });

describe('Test for GET User', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('GET /auth/user', async () => {
    const response = await App.get('/v1/auth/user')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET error /auth/user', async () => {
    const response = await App.get('/v1/auth/users')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET /auth/user/:id', async () => {
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
              WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.get('/v1/auth/user/' + id)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});

    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('Retreving auth/user for invalid id GET /auth/user/:id',
      async () => {
        const id: string = 'ac7834be-148b-4e12-95af-4b5864aa4512';
        const response = await App.get('/v1/auth/user/' + id)
            .set({app_token_id: appTokenId, app_secret_id: appSecretId});
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving auth/user for DataNotFound GET /auth/user',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE user_authentications CASCADE');
        const response = await App.get('/v1/auth/user')
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

  test('test cases for Update unknown user', async () => {
    const user = {
      'first_name': 'user',
      'middle_name': 'user',
      'last_name': 'user',
    };
    const id: string = 'ac7834be-148b-4e12-95af-4b5864aa4512';
    const response = await App.put('/v1/auth/user/' + id)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);

    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(userDataNotFound);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test cases for Change Password', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('test cases for valid input data', async () => {
    const user = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'email': 'user@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'pin': '12345',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
  });
  test('test cases for current And New Password Match Error',
      async () => {
        const user = {
          'current_password': '1234567@Ab',
          'new_password': '1234567@Ab',
          'confirm_password': '1234567@Ab',
        };
        const userData: any = await getConnection(ormDBName).manager
            .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
        const id = userData[0].id;
        const response =
            await App.put('/v1/auth/user/' + id + '/password/change')
                .set({app_token_id: appTokenId, app_secret_id: appSecretId})
                .send(user);
        const jsonResponse = JSON.parse(response.text);
        expect(response.status).toEqual(400);
        expect(jsonResponse.success).toEqual(false);
        expect(jsonResponse.errors.error)
            .toEqual(currentAndNewPasswordMatchError);
        expect(response.status).not.toEqual(200);
      });
  test('test cases for valid input data', async () => {
    const user = {
      'current_password': '1234567@Ab',
      'new_password': '12345@Adm',
      'confirm_password': '12345@Adm',
    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id + '/password/change')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });
  test('test cases for inValid Password', async () => {
    const user = {
      'current_password': '1234567@Ab',
      'new_password': '12345@Adm',
      'confirm_password': '12345@Adm',
    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id + '/password/change')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(incorrectPassword);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for Incorrect Password', async () => {
    const user = {
      'current_password': '1234567@Abcd',
      'new_password': '12345@Adm',
      'confirm_password': '12345@Adm',
    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id + '/password/change')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(incorrectPassword);
    expect(response.status).toEqual(400);
    expect(jsonResponse.errors.error).toEqual(incorrectPassword);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for blocked user', async () => {
    const update: any = {_allowLogin: false};
    await getConnection(ormDBName)
        .createQueryBuilder()
        .update(UserAuthentication)
        .set(update)
        .where('_email = :email', {email: 'user@email.com'})
        .execute();
    const user = {
      'current_password': '1234567@Adm',
      'new_password': '12345@Ad',
      'confirm_password': '12345@Ad',
    };
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0].id;
    const response = await App.put('/v1/auth/user/' + id + '/password/change')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(userBlockAccount);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for Data Not Found', async () => {
    const user = {
      'current_password': '1234567@Adm',
      'new_password': '12345@Ad',
      'confirm_password': '12345@Ad',
    };
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE user_authentications CASCADE');
    const userData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM user_authentications
          WHERE email='user@email.com'`);
    const id = userData[0]?.id;
    const response = await App.put('/v1/auth/user/' + id + '/password/change')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(400);
    expect(jsonResponse.errors.error).toEqual(userDataNotFound);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test cases for User Block Unblock', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const user = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'email': 'user@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'pin': '12345',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
  });

  test('Block A User By Valid User Id', async () => {
    const validUserId: string = (await getConnection(ormDBName).manager
        .query('SELECT * FROM user_authentications'))[0].id;
    const date = {
      'block_until': '2023-06-16',
    };
    const response = await App.put('/v1/auth/user/' + validUserId + '/block')
        .send(date)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });
  test('test cases for blocked user', async () => {
    const user = {
      'email': 'user@email.com',
      'password': '1234567@Ab',
    };
    const response = await App.post('/v1/auth/user/login')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(userBlockAccount);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  test('Block A User By Invalid User Id', async () => {
    const inValidUserId: string = '37edb0ce-6da0-4377-ba7c-d82f19e46c7c';
    const date = {
      'block_until': '2023-06-16',
    };
    const response = await App.put('/v1/auth/user/' + inValidUserId + '/block')
        .send(date)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });
  test('Check User Status in Forget Password', async () => {
    const user = {
      'email': 'user@email.com',
    };
    const response = await App.put('/v1/auth/user/password/forget')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(userBlockAccount);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });
  test('Unblock A User By Valid User Id', async () => {
    const validUserId: string = (await getConnection(ormDBName).manager
        .query('SELECT * FROM user_authentications'))[0].id;
    const response = await App.put('/v1/auth/user/' + validUserId + '/unblock')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Unblock A User By Invalid User Id', async () => {
    const inValidUserId: string = '37edb0ce-6da0-4377-ba7c-d82f19e46c7c';
    const response =
        await App.put('/v1/auth/user/' + inValidUserId + '/unblock')
            .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test cases for Check User Status', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });

  test('Block User', async () => {
    const validUserId: string = (await getConnection(ormDBName).manager
        .query('SELECT * FROM user_authentications'))[0].id;
    await App.put('/v1/auth/user/' + validUserId + '/block')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
  });

  test('Check User Status', async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE user_authentications CASCADE');
    const user = {
      'email': 'user@email.com',
    };
    const response = await App.put('/v1/auth/user/password/forget')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(userDataNotFound);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await dbService.close();
  });
});

describe(`Test cases for Check Email Exist 
  GET /v1/auth/user/email/:email/exist`, () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const user = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'email': 'user@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'pin': '12345',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
  });

  test('Test For Already Register Email', async () => {
    const validExistEmail: string = 'user@email.com';
    const response = await App.get('/v1/auth/user/email/' + validExistEmail +
            '/exist')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpEmailAlreadyExsits);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  test('Test For Invalid Email', async () => {
    const inValidEmailExist: string = 'user@ema';
    const response = await App.get('/v1/auth/user/email/' + inValidEmailExist +
            '/exist')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual('Email is not valid.');
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  test('Test For A Valid Email', async () => {
    const validEmail: string = 'validemail@email.com';
    const response = await App.get('/v1/auth/user/email/' + validEmail +
            '/exist')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(emailAvailable);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE user_authentications CASCADE');
    await dbService.close();
  });
});

describe(`Test cases for Check Username Exist 
  GET /v1/auth/user/username/:username/exist`, () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const user = {
      'first_name': 'user',
      'last_name': 'user',
      'user_name': 'user2',
      'email': 'user@email.com',
      'password': '1234567@Ab',
      'confirm_password': '1234567@Ab',
      'pin': '12345',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    await App.post('/v1/auth/user/signup')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(user);
  });

  test('Test For Alraedy Register Username', async () => {
    const validExistUsername: string = 'user2';
    const response = await App.get('/v1/auth/user/username/' +
            validExistUsername + '/exist')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpUserNameAlreadyExsits);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  test('Test For A Valid New Username', async () => {
    const validEmail: string = 'user3';
    const response = await App.get('/v1/auth/user/username/' + validEmail +
            '/exist')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(userNameAvailable);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE user_authentications CASCADE');
    await dbService.close();
  });
});
