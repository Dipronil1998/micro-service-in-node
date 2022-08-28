import supertest from 'supertest';
import {DBService} from '../../service/DBService';
import {
  emailSendedSucessfully,
  httpPageNotFoundMessage,
  ormDBName,
  passwordUpdatedSucessfully,
  resetPasswordLinkExpired,
  userDataNotFound,
} from '../../../config/bootstrap';
import {getConnection} from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import {ErrorHandlerMiddleware}
  from '../../middleware/ErrorHandlerMiddleware';
import {PageNotFoundMiddleware}
  from '../../middleware/PageNotFoundMiddleware';
import {UserAuthenticationValidation}
  from '../../validation/UserAuthenticationValidation';
import {ResetPasswordController}
  from '../ResetPasswordController';
import {UserAuthenticationController}
  from '../UserAuthenticationController';
import {ResetPasswordToken} from '../../model/entity/ResetPasswordToken';
import {UserAuthentication} from '../../model/entity/UserAuthentication';
const app: express.Application = express();
app.use(bodyParser.json());

app.post('/auth/user/signup',
    new UserAuthenticationValidation('UserAuthentication validator')
        .validationChain,
    new UserAuthenticationValidation('UserAuthentication validator')
        .validationErrorHandle,
    new UserAuthenticationController().signup);
app.put('/auth/user/password/forget',
    new UserAuthenticationValidation('UserAuthentication Validation')
        .emailValidateChain,
    new UserAuthenticationValidation('UserAuthentication Validation')
        .validationErrorHandle,
    new UserAuthenticationController().checkUserStatus,
    new ResetPasswordController().createResetPasswordToken,
    new ResetPasswordController().sendResetPasswordMail);
app.put('/auth/user/password/reset/:token',
    new ResetPasswordController().checkResetToken,
    new UserAuthenticationValidation('UserAuthentication Validation')
        .updatePasswordValidationChain,
    new UserAuthenticationValidation('UserAuthentication Validation')
        .validationErrorHandle,
    new UserAuthenticationController().resetPassword,
    new ResetPasswordController().changeTokenStatus);

app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);

const testApp = supertest(app);
let resetToken: any;
describe('Test cases for User reset password', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    const user = {
      'first_name': 'partha',
      'last_name': 'saha',
      'user_name': 'partha99',
      'email': 'partha@agpaytech.co.uk',
      'password': '12345@Ab',
      'confirm_password': '12345@Ab',
      'isd_code': 91,
      'mobile_no': 7544842321,
    };
    await testApp.post('/auth/user/signup').send(user);

    const userData: UserAuthentication =
            await getConnection(ormDBName).manager
                .query(`SELECT id FROM user_authentications
          WHERE email='partha@agpaytech.co.uk'`);
    // @ts-ignore
    userId = userData[0].id;
  });

  test('Test For Forget Password', async () => {
    const user = {
      'email': 'partha@agpaytech.co.uk',
    };
    const response = await testApp.put('/auth/user/password/forget')
        .send(user);
    const resetPasswordTokenDetails: ResetPasswordToken =
            await getConnection(ormDBName).manager
                .query(`SELECT token FROM reset_password_tokens`);
    // @ts-ignore
    resetToken = resetPasswordTokenDetails[0].token;

    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.info.message)
        .toEqual(emailSendedSucessfully);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test Error For Forget Password', async () => {
    const changePassword = {
      'new_password': '12345@Admin',
      'confirm_password': '12345@Admin',
    };
    const response = await testApp
        .put('/auth/user/password/resets/' + resetToken)
        .send(changePassword);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(200);
  });

  test('Test For Forget Password with email Token', async () => {
    const changePassword = {
      'new_password': '12345@Admin',
      'confirm_password': '12345@Admin',
    };
    const response = await testApp
        .put('/auth/user/password/reset/' + resetToken)
        .send(changePassword);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.info.message)
        .toEqual(passwordUpdatedSucessfully);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Test For invalid email', async () => {
    const user = {
      'email': 'xyz@email.com',
    };
    const response = await testApp.put('/auth/user/password/forget')
        .send(user);
    const resetPasswordTokenDetails: ResetPasswordToken =
            await getConnection(ormDBName).manager
                .query(`SELECT token FROM reset_password_tokens`);
    // @ts-ignore
    resetToken = resetPasswordTokenDetails[0].token;

    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error)
        .toEqual(userDataNotFound);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(200);
  });

  test('Test For Forget Password with Invalid email Link', async () => {
    const changePassword = {
      'new_password': '12345@Admin',
      'confirm_password': '12345@Admin',
    };
    const response = await testApp
        .put('/auth/user/password/reset/' + resetToken)
        .send(changePassword);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toBeDefined();
    expect(response.status).toBeDefined();
    expect(jsonResponse.errors.error)
        .toEqual(resetPasswordLinkExpired);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(200);
  });

  afterAll(async () => {
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE user_authentications CASCADE');
    await getConnection(ormDBName).manager
        .query('TRUNCATE TABLE reset_password_tokens CASCADE');
    await dbService.close();
  });
});
