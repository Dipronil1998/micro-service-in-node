import supertest from 'supertest';
import {DBService} from '../../service/DBService';
import {
  userBlockAccount, incorrectPassword,
  httpEmailAlreadyExsits,
  userDataNotFound, ormDBName, httpSuccessDataUpdate,
  httpDataNotFound, httpPageNotFoundMessage, emailAvailable,
  twofaOtpSentmessage,
  twoFactorAuthenticationMethod,
  downloadGoogleAuthenticator, enterGoogleAuthenticator,
}
  from '../../../config/bootstrap';
import {getConnection} from 'typeorm';
import {AdminAuthentication}
  from '../../model/entity/AdminAuthentication';
import {RepositoryParameter} from '../../model/repository/AppRepository';
import {Platform} from '../../model/entity/Platform';
import {Platforms} from '../../model/repository/Platforms';
import {PlatformsSeed} from '../../../config/seeds/PlatformsSeed';
import {AccessRoleSeed} from '../../../config/seeds/AccessRoleSeed';
import {GenerateToken} from '../../utils/GenerateToken';
import {AdminAuthenticationSeed} from
  '../../../config/seeds/AdminAuthenticationSeed';
import bodyParser from 'body-parser';
import express from 'express';
import {AdminAuthenticationController} from '../AdminAuthenticationController';
import {AdminAuthenticationValidation} from
  '../../validation/AdminAuthenticationValidation';
import {PageNotFoundMiddleware} from '../../middleware/PageNotFoundMiddleware';
import {ErrorHandlerMiddleware} from '../../middleware/ErrorHandlerMiddleware';
import {AdminDeviceController} from '../AdminDeviceController';
import {AdminLoginLogController} from '../AdminLoginLogController';
import {TwoFactorAuthController} from '../TwoFactorAuthController';

const app: express.Application = express();
app.use(bodyParser.json());

app.post('/admin/create',
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .validationChain,
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .validationErrorHandle,
    new AdminAuthenticationController().create);

app.post('/admin/login',
    new AdminAuthenticationController().login,
    new AdminDeviceController().create,
    new AdminLoginLogController().create,
    new TwoFactorAuthController().create);

app.put('/admin/:id/block',
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .blockUntilValidationChain,
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .validationErrorHandle,
    new AdminAuthenticationController().blockAdmin);

app.put('/admin/:id/unblock',
    new AdminAuthenticationController().unBlockAdmin);

app.get('/admin/email/:email/exist',
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .checkEmailExistsValidatationChain,
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .validationErrorHandle,
    new AdminAuthenticationController().checkEmailExist);

app.put('/admin/:id/password/change',
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .paramValidateChain,
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .updatePasswordValidationChain,
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .validationErrorHandle,
    new AdminAuthenticationController().changePassword);

app.put('/admin/:id',
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .paramValidateChain,
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .updateValidationChain,
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .validationErrorHandle,
    new AdminAuthenticationController().update);

app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);

const testApp = supertest(app);

let token: any;
let appTokenId: string;
let appSecretId: string;
const password: string = new GenerateToken().generateRandomToken(10);
const getDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  let month: number | string = d.getMonth() + 2;
  if (month < 10) {
    month = '0' + month;
  }
  const day = d.getDate() + 3;
  const date: string | Date = year + '-' + month + '-' + day;
  return date;
};

describe('Test cases API to Create User', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async () => {
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

  test('test cases for valid input data', async () => {
    const admin = {
      'first_name': 'AdminFirstName',
      'middle_name': 'Middle',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
      'password': password,
    };
    const response = await testApp.post('/admin/create')
        .send(admin);
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });

  test('test cases for empty input data', async () => {
    const admin = {
      'first_name': '',
      'last_name': '',
      'email': '',
    };
    const response = await testApp.post('/admin/create')
        .send(admin);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  test('test cases for same email input data', async () => {
    const admin = {
      'first_name': 'AdminFirstName',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    const response = await testApp.post('/admin/create')
        .send(admin);
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

describe('Test cases API to Login User', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async () => {
      await new AdminAuthenticationSeed().run();
    }); ;
  });

  test('test cases for valid input data By First Time', async () => {
    const admin = {
      'email': 'arnab@agpaytech.co.uk',
      'password': 'Admin@123',
    };
    const response = await testApp.post('/admin/login').send(admin);
    const jsonResponse = JSON.parse(response.text);
    if (twoFactorAuthenticationMethod === 'email') {
      expect(response.status).toEqual(200);
      expect(jsonResponse.success).toEqual(true);
      expect(jsonResponse.info.message).toBeDefined();
      expect(jsonResponse.info.message).toEqual(twofaOtpSentmessage);
      expect(response.status).not.toEqual(400);
    } else if (twoFactorAuthenticationMethod === 'google') {
      expect(response.status).toEqual(200);
      expect(jsonResponse.success).toEqual(true);
      expect(jsonResponse.info.message).toBeDefined();
      expect(jsonResponse.info.qr).toBeDefined();
      expect(jsonResponse.info.message).toEqual(downloadGoogleAuthenticator);
      expect(response.status).not.toEqual(400);
    }
  });

  test('test cases for valid input data By Second Time', async () => {
    const admin = {
      'email': 'arnab@agpaytech.co.uk',
      'password': 'Admin@123',
    };
    const response = await testApp.post('/admin/login')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    if (twoFactorAuthenticationMethod === 'google') {
      expect(response.status).toEqual(200);
      expect(jsonResponse.success).toEqual(true);
      expect(jsonResponse.info.message).toBeDefined();
      expect(jsonResponse.info.qr).toBeDefined();
      expect(jsonResponse.info.message).toEqual(enterGoogleAuthenticator);
      expect(response.status).not.toEqual(400);
    }
  });

  test('test cases for inValid admin', async () => {
    const admin = {
      'email': 'user123@email.com',
      'password': '1234567@Ab',
    };
    const response = await testApp.post('/admin/login')
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(userDataNotFound);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  test('test cases for inValid Password', async () => {
    const admin = {
      'email': 'test@email.com',
      'password': '1234567abc',
    };
    const response = await testApp.post('/admin/login')
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(incorrectPassword);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });
  // test('test cases for blocked admin', async () => {
  //   const update:any = {_allowLogin: false};
  //   await getConnection(ormDBName)
  //       .createQueryBuilder()
  //       .update(AdminAuthentication)
  //       .set(update)
  //       .where('_email = :email', {email: 'test@email.com'})
  //       .execute();
  //   const admin = {
  //     'email': 'test@email.com',
  //     'password': password
  //   };
  //   const response = await App.post('/v1/auth/admin/login')
  //       .set({app_token_id: appTokenId, app_secret_id: appSecretId})
  //       .send(admin);
  //   const jsonResponse = JSON.parse(response.text);
  //   expect(jsonResponse.errors.error)
  //       .toEqual(userBlockAccount);
  //   expect(response.status).toEqual(400);
  //   expect(jsonResponse.success).toEqual(false);
  //   expect(response.status).not.toEqual(200);
  // });
  test('test cases for Empty input data', async () => {
    const admin = {
      'email': ' ',
      'password': ' ',
    };
    const response = await testApp.post('/admin/login')
        .send(admin);
    expect(response.status).toEqual(400);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  afterAll(async () => {
    // await getConnection(ormDBName).manager
    //   .query('TRUNCATE TABLE admin_authentications CASCADE');
    await dbService.close();
  });
});

describe('Test cases for User Block Unblock', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });

  test('Block A Admin By Valid Admin Id', async () => {
    const validUserId: string = (await getConnection(ormDBName).manager
        .query('SELECT * FROM admin_authentications'))[0].id;
    const blockAdmin = {
      'block_until': getDate(),
    };
    const response = await testApp.put('/admin/' + validUserId + '/block')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(blockAdmin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Block A Admin By Invalid Admin Id', async () => {
    const inValidUserId: string = '37edb0ce-6da0-4377-ba7c-d82f19e46c7c';
    const blockAdmin = {
      'block_until': getDate(),
    };
    const response = await testApp.put('/admin/' + inValidUserId + '/block')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(blockAdmin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });

  test('Unblock A Admin By Valid Admin Id', async () => {
    const validUserId: string = (await getConnection(ormDBName).manager
        .query('SELECT * FROM admin_authentications'))[0].id;
    const response = await testApp.put('/admin/' + validUserId + '/unblock')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(jsonResponse.success).toEqual(true);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Unblock A Admin By Invalid Admin Id', async () => {
    const inValidUserId: string = '37edb0ce-6da0-4377-ba7c-d82f19e46c7c';
    const response = await testApp.put('/admin/' + inValidUserId + '/unblock')
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
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE admin_authentications CASCADE');
    await dbService.close();
  });
});

describe('Test cases for Change Password', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const admin = {
      'first_name': 'admin',
      'last_name': 'admin',
      'user_name': 'admin2',
      'email': 'admin@email.com',
    };
    await testApp.post('/admin/create')
        .send(admin);
  });

  // test('test cases for current And New Password Match Error',
  //     async () => {
  //       const admin = {
  //         'current_password': '1234567@Admin',
  //         'new_password': '1234567@Admin',
  //         'confirm_password': '1234567@Admin',
  //       };
  //       const adminData: any = await getConnection(ormDBName).manager
  //           .query(`SELECT id FROM admin_authentications
  //         WHERE email='admin@email.com'`);
  //       const id = adminData[0].id;
  //       const response =
  //            await App.put('/v1/auth/admin/'+id+'/password/change')
  //           .set({app_token_id: appTokenId, app_secret_id: appSecretId})
  //           .send(admin);
  //       const jsonResponse = JSON.parse(response.text);
  //       expect(response.status).toEqual(400);
  //       expect(jsonResponse.success).toEqual(false);
  //       expect(jsonResponse.errors.error)
  //           .toEqual(currentAndNewPasswordMatchError);
  //       expect(response.status).not.toEqual(200);
  //     });

  test('test cases for Incorrect Password', async () => {
    const admin = {
      'current_password': '1234567@Abcd',
      'new_password': '12345@Adm',
      'confirm_password': '12345@Adm',
    };
    const adminData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM admin_authentications
          WHERE email='admin@email.com'`);
    const id = adminData[0].id;
    const response = await testApp.put('/admin/' + id + '/password/change')
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(incorrectPassword);
    expect(response.status).toEqual(400);
    expect(jsonResponse.errors.error).toEqual(incorrectPassword);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  test('Test Cases For InValid Current Password', async () => {
    const admin = {
      'current_password': '1234567@Admi',
      'new_password': '12345@Adm',
      'confirm_password': '12345@Adm',
    };
    const adminData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM admin_authentications
          WHERE email='admin@email.com'`);
    const id = adminData[0].id;
    const response = await testApp.put('/admin/' + id + '/password/change')
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(incorrectPassword);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  //   test('Test Cases For Password Change', async () => {
  //     const admin = {
  //       'current_password': '1234567@Admin',
  //       'new_password': '1234567@Ad',
  //       'confirm_password': '1234567@Ad',
  //     };
  //     const adminData: any = await getConnection(ormDBName).manager
  //         .query(`SELECT id FROM admin_authentications
  //           WHERE email='admin@email.com'`);
  //     const id = adminData[0].id;
  //     const response = await App.put('/v1/auth/admin/'+id+'/password/change')
  //         .set({app_token_id: appTokenId, app_secret_id: appSecretId})
  //         .send(admin);
  //     expect(response.status).toEqual(200);
  //     const jsonResponse = JSON.parse(response.text);
  //     expect(jsonResponse.success).toEqual(true);
  //     expect(response.status).not.toEqual(400);
  //     expect(jsonResponse.info.message).toEqual(passwordUpdatedSucessfully);
  //   });

  test('test cases for blocked Admin', async () => {
    const update: any = {_allowLogin: false};
    await getConnection(ormDBName)
        .createQueryBuilder()
        .update(AdminAuthentication)
        .set(update)
        .where('_email = :email', {email: 'admin@email.com'})
        .execute();
    const admin = {
      'current_password': '1234567@Admin',
      'new_password': '12345@Ad',
      'confirm_password': '12345@Ad',
    };
    const adminData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM admin_authentications
          WHERE email='admin@email.com'`);
    const id = adminData[0].id;
    const response = await testApp.put('/admin/' + id + '/password/change')
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(jsonResponse.errors.error).toEqual(userBlockAccount);
    expect(response.status).not.toEqual(200);
  });

  test('test cases for Data Not Found', async () => {
    const admin = {
      'current_password': '1234567@Admin',
      'new_password': '12345@Ad',
      'confirm_password': '12345@Ad',
    };
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE admin_authentications CASCADE');
    const adminData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM admin_authentications
          WHERE email='admin@email.com'`);
    const id = adminData[0]?.id;
    const response = await testApp.put('/admin/' + id + '/password/change')
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(400);
    expect(jsonResponse.errors.error).toEqual(userDataNotFound);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE admin_authentications CASCADE');
    await dbService.close();
  });
});

describe('Test Cases For Update Admin Profile PUT /v1/auth/admin/:id', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const admin = {
      'first_name': 'admin',
      'middle_name': 'middleName',
      'last_name': 'admin',
      'email': 'admin@email.com',
    };
    await testApp.post('/admin/create')
        .send(admin);
  });

  test('Update First Name of Admin', async () => {
    const admin = {
      'first_name': 'Updateadminfirstname',
    };
    const adminData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM admin_authentications
          WHERE email='admin@email.com'`);
    const id = adminData[0].id;
    const response = await testApp.put('/admin/' + id)
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(200);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
    expect(response.type).toEqual('application/json');
  });

  test('Update Middle Name of Admin', async () => {
    const admin = {
      'middle_name': 'Updateadminmiddlename',
    };
    const adminData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM admin_authentications
          WHERE email='admin@email.com'`);
    const id = adminData[0].id;
    const response = await testApp.put('/admin/' + id)
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(200);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
    expect(response.type).toEqual('application/json');
  });

  test('Update Last Name of Admin', async () => {
    const admin = {
      'last_name': 'Updateadminlastname',
    };
    const adminData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM admin_authentications
          WHERE email='admin@email.com'`);
    const id = adminData[0].id;
    const response = await testApp.put('/admin/' + id)
        .set({app_token_id: appTokenId, app_secret_id: appSecretId})
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(200);
    expect(jsonResponse.info.message).toEqual(httpSuccessDataUpdate);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
    expect(response.type).toEqual('application/json');
  });

  test('Update Data of Admin Not Exists', async () => {
    const admin = {
      'last_name': 'Updateadminlastname',
    };
    const id = 'ea58f72d-08ec-470c-82f8-9fdcee9d4d25';
    const response = await testApp.put('/admin/' + id)
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(404);
    expect(jsonResponse.errors.error).toEqual(httpDataNotFound);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(201);
    expect(response.type).toEqual('application/json');
  });

  test('Get Page Not Found', async () => {
    const admin = {
      'last_name': 'Updateadminlastname',
    };
    const adminData: any = await getConnection(ormDBName).manager
        .query(`SELECT id FROM admin_authentications
          WHERE email='admin@email.com'`);
    const id = adminData[0].id;
    const response = await testApp.put('/admins/' + id)
        .send(admin);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(404);
    expect(jsonResponse.errors.error).toEqual(httpPageNotFoundMessage);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(201);
    expect(response.type).toEqual('application/json');
  });

  afterAll(async () => {
    await dbService.close();
  });
});

describe('Test Cases For Check Email Exist', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
  });
  test('Test For Email Available', async () => {
    const email: string = 'admin1@email.com';
    const response = await testApp.get('/admin/email/' + email + '/exist')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.info.message).toEqual(emailAvailable);
    expect(response.status).toEqual(200);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(400);
  });
  test('Test For Email Available', async () => {
    const email: string = 'admin@email.com';
    const response = await testApp.get('/admin/email/' + email + '/exist')
        .set({app_token_id: appTokenId, app_secret_id: appSecretId});
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error).toEqual(httpEmailAlreadyExsits);
    expect(response.status).toEqual(400);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(200);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE admin_authentications CASCADE');
    await dbService.close();
  });
});
