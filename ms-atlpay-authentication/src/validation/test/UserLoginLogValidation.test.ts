import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {UserLoginLogValidation} from
  '../UserLoginLogValidation';
const app: express.Application = express();
app.use(bodyParser.json());
app.get('/test-loginlog/:email',
    new UserLoginLogValidation('UserLoginLog validator')
        .validationChain,
    new UserLoginLogValidation('UserLoginLog validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Get Userloginlog');
    },
);

const testApp = supertest(app);

describe('Test for Userloginlogs Validator', ()=>{
  test('Correct Params For Userloginlogs', async () => {
    const email = 'test@test.com';
    const response = await testApp
        .get('/test-loginlog/'+ email);
    expect(response.text).toEqual('Get Userloginlog');
  });

  test('Testing For User Loginlog email params', async () => {
    const invalidEmail = 'test@test';
    let response = await testApp
        .get('/test-loginlog/'+ invalidEmail);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);

    const invalidEmail1 = '12345';
    response = await testApp
        .get('/test-loginlog/'+ invalidEmail1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);

    const invalidEmail2 = 'test_test.com';
    response = await testApp
        .get('/test-loginlog/'+ invalidEmail2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);

    const invalidEmail3 = 'example@234.234.234.234';
    response = await testApp
        .get('/test-loginlog/'+ invalidEmail3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);

    const invalidEmail4 = 'example@[234.234.234.234]';
    response = await testApp
        .get('/test-loginlog/'+ invalidEmail4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);

    const invalidEmail5 = '@#@@##@%^%#$@#$@#.com';
    response = await testApp
        .get('/test-loginlog/'+ invalidEmail5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);

    const invalidEmail6 = 'email@111.222.333.44444';
    response = await testApp
        .get('/test-loginlog/'+ invalidEmail6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);
  });
});
