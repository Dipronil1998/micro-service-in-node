import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {UserAuthenticationValidation} from
  '../UserAuthenticationValidation';
const app: express.Application = express();
app.use(bodyParser.json());

app.post('/signup',
    new UserAuthenticationValidation('UserAuthentication validator')
        .validationChain,
    new UserAuthenticationValidation('UserAuthentication validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Signup Success');
    },
);

app.put('/update/:id',
    new UserAuthenticationValidation('UserAuthentication validator')
        .updateValidationChain,
    new UserAuthenticationValidation('UserAuthentication validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Data Updated Successfully');
    },
);

app.put('/:id/password/change',
    new UserAuthenticationValidation('UserAuthentication validator')
        .updatePasswordValidationChain,
    new UserAuthenticationValidation('UserAuthentication validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Password Changed Successfully');
    },
);
const testApp = supertest(app);

describe('User Validation Signup Route', () => {
  test('Correct input of User Authentication', async () => {
    const requestUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    const response = await testApp
        .post('/signup')
        .send(requestUserAuthentication);
    expect(response.text).toEqual('Signup Success');
  });

  test('Testing For User Authentication First Name', async () => {
    const invalidUserAuthentication = {
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`First name should not be empty.`);

    const invalidUserAuthentication1 = {
      'first_name': 77777,
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`First name should be alphabetic.`);

    const invalidUserAuthentication2 = {
      'first_name': 'U',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`First name should be minimum 2 and maximum 30 character.`);

    const invalidUserAuthentication3 = {
      'first_name': 'Us',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication3);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication4 = {
      'first_name': 'UserFirstNameUserFirstNameUser',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication4);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication5 = {
      'first_name': 'UserFirstNameUserFirstNameUserF',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`First name should be minimum 2 and maximum 30 character.`);

    const invalidUserAuthentication6 = {
      'first_name': 'UserFirstName1',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`First name should be alphabetic.`);
  });

  test('Testing For User Authentication Middle Name', async () => {
    const invalidUserAuthentication = {
      'first_name': 'UserFirstName',
      'middle_name': 'UserMiddleName1',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Middle name should be alphabetic.`);

    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'middle_name': 555,
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Middle name should be alphabetic.`);

    const invalidUserAuthentication2 = {
      'first_name': 'Us',
      'middle_name': 'UserMiddleNameUserMiddleNameUs',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication3 = {
      'first_name': 'UserFirstName',
      'middle_name': 'UserMiddleNameUserMiddleNameUse',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Middle name should be minimum 2 and maximum 30 character.`);
  });

  test('Testing For User Authentication Last Name', async () => {
    const invalidUserAuthentication = {
      'first_name': 'UserFirstName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Last name should not be empty.`);

    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 77777,
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Last name should be alphabetic.`);

    const invalidUserAuthentication2 = {
      'first_name': 'UserFirstName',
      'last_name': 'U',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Last name should be minimum 2 and maximum 30 character.`);

    const invalidUserAuthentication3 = {
      'first_name': 'UserFirstName',
      'last_name': 'Us',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication3);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication4 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastNameUserLastNameUserLa',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication4);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication5 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastNameUserLastNameUserLas',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Last name should be minimum 2 and maximum 30 character.`);

    const invalidUserAuthentication6 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName1',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Last name should be alphabetic.`);
  });

  test('Testing For User Authentication Email', async () => {
    const invalidUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email should not be empty.`);

    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);

    const invalidUserAuthentication2 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test_test.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Email is not valid.`);
  });

  test('Testing For User Authentication Recovery Email', async () => {
    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'recovery_email': 'recovery',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Recovery Email is not valid.`);

    const invalidUserAuthentication2 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@test.com',
      'recovery_email': 'recovery_test.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Recovery Email is not valid.`);

    const invalidUserAuthentication3 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'email': 'user99@email.com',
      'recovery_email': 'user99@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Email and Recovery Email Should Not be Same.`);
  });

  test('Testing For User Authentication Password', async () => {
    const invalidUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should not be empty. Password and Confirm Password Does Not Matched.`);

    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test',
      'confirm_password': 'Test',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication2 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@',
      'confirm_password': 'Test@',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication3 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'test@',
      'confirm_password': 'test@',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication4 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': '123',
      'confirm_password': '123',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication5 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': '@@@@@@@@@',
      'confirm_password': '@@@@@@@@@',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication6 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'AAAAAAAAAA',
      'confirm_password': 'AAAAAAAAAA',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication7 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'zzzzzzzz',
      'confirm_password': 'zzzzzzzz',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication7);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication8 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': '12345698725',
      'confirm_password': '12345698725',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication8);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication9 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'UserLastNameUserLastNameUser@123456',
      'confirm_password': 'UserLastNameUserLastNameUser@123456',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication9);

    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication10 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': '123456789123456789123456789123456789',
      'confirm_password': '123456789123456789123456789123456789',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication10);

    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication11 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': '1234567891234567891234567891234',
      'confirm_password': '1234567891234567891234567891234',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication11);

    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication12 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'confirm_password': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication12);

    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);

    const invalidUserAuthentication13 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'confirm_password': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'isd_code': 91,
      'mobile_no': 9874563210,
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication13);

    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password should be a alphanumeric and spcial character value.`);
  });

  test('Testing For User Authentication Confirm Password', async () => {
    const invalidUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@123456',
      'isd_code': 91,
      'mobile_no': 9874563210,
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password and Confirm Password Does Not Matched.`);

    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': 9874563210,
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Password and Confirm Password Does Not Matched.`);
  });

  test('Testing For User Authentication Pin', async () => {
    const invalidUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'pin': 'AAAA',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`PIN should be a numeric.`);

    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'pin': 777,
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`PIN should be min 4 max 6 Digit.`);

    const invalidUserAuthentication2 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'pin': 7777,
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication3 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'pin': 777777,
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication3);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication4 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'pin': 7777777,
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`PIN should be min 4 max 6 Digit.`);

    const invalidUserAuthentication5 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'pin': 'VVVDDD',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`PIN should be a numeric.`);
  });

  test('Testing For User Authentication ISD Code', async () => {
    const invalidUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`ISD Code should not be empty.`);

    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 'AA',
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`ISD Code should be a numeric.`);

    const invalidUserAuthentication2 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 99999,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`ISD Code length should be min 1 max 3.`);

    const validUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(validUserAuthentication);
    expect(response.text).toEqual('Signup Success');

    const validUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 913,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(validUserAuthentication1);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication3 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': '@#$%&*',
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`ISD Code should be a numeric. ISD Code length should be min 1 max 3.`);

    const invalidUserAuthentication4 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 'code',
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`ISD Code should be a numeric. ISD Code length should be min 1 max 3.`);

    const invalidUserAuthentication5 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 'c',
      'mobile_no': '9874563210',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error)
        .toEqual(`ISD Code should be a numeric.`);
  });

  test('Testing For User Authentication ISD Code', async () => {
    const invalidUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
    };
    let response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Mobile Number should not be empty.`);

    const invalidUserAuthentication1 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': 'MobileNumb',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Mobile Number should be a numeric value.`);

    const invalidUserAuthentication2 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': 987456321,
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Mobile Number should be 10 Digit.`);

    const validUserAuthentication = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': 9874563210,
    };
    response = await testApp
        .post('/signup')
        .send(validUserAuthentication);
    expect(response.text).toEqual('Signup Success');

    const invalidUserAuthentication3 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': 98745632100,
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual(`Mobile Number should be 10 Digit.`);

    const invalidUserAuthentication4 = {
      'first_name': 'UserFirstName',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '0000000000',
    };
    response = await testApp
        .post('/signup')
        .send(invalidUserAuthentication4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Mobile Number is Invalid.`);
  });

  test('Correct input of User Authentication', async () => {
    const requestUserAuthentication = {
    };
    const response = await testApp
        .post('/signup')
        .send(requestUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`First name should not be empty. Last name should not be empty. Email should not be empty. Password should not be empty. ISD Code should not be empty. Mobile Number should not be empty.`);
  });
});

describe('User Validation Update Route', () => {
  test('Correct input of User Update', async () => {
    const requestUserAuthentication = {
      'first_name': 'first',
      'middle_name': 'and',
      'last_name': 'user',
      'recovery_email': 'abc@email.com',
      'isd_code': 110,
      'mobile_no': 7455692500,
    };
    const response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(requestUserAuthentication);
    expect(response.text).toEqual('Data Updated Successfully');
  });

  test('Testing For User Update First Name', async () => {
    const invalidUserAuthentication = {
      'middle_name': 'and',
      'last_name': 'user',
      'recovery_email': 'abc@email.com',
      'isd_code': 110,
      'mobile_no': 7455692500,
    };
    let response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication);
    expect(response.body.success).toEqual(undefined);

    const invalidUserAuthentication1 = {
      'first_name': 646161,
      'middle_name': 'and',
      'last_name': 'user',
      'recovery_email': 'abc@email.com',
      'isd_code': 110,
      'mobile_no': 7455692500,
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`First name should be alphabetic.`);

    const invalidUserAuthentication2 = {
      'first_name': 'f',
      'middle_name': 'and',
      'last_name': 'user',
      'recovery_email': 'abc@email.com',
      'isd_code': 110,
      'mobile_no': 7455692500,
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`First name should be min 2 max 30 character.`);

    const invalidUserAuthentication5 = {
      'first_name': 'firstfirstnamefirst namefirst name',
      'middle_name': 'and',
      'last_name': 'user',
      'recovery_email': 'abc@email.com',
      'isd_code': 110,
      'mobile_no': 7455692500,
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`First name should be min 2 max 30 character.`);

    const invalidUserAuthentication6 = {
      'first_name': '!@#$%%',
      'last_name': 'UserLastName',
      'email': 'test@email.com',
      'password': 'Test@12345',
      'confirm_password': 'Test@12345',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`First name should be alphabetic.`);
  });

  test('Testing For User Update Middle Name', async () => {
    const invalidUserAuthentication0 = {
      'first_name': 'first',
      'middle_name': 'and',
      'last_name': 'user',
      'recovery_email': 'abc@email.com',
      'isd_code': 110,
      'mobile_no': 7455692500,
    };
    const response0 = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication0);
    expect(response0.body.success).toEqual(undefined);

    const invalidUserAuthentication = {
      'first_name': 'first',
      'middle_name': '!@#$',
      'last_name': 'user',
      'recovery_email': 'abc@email.com',
      'isd_code': 110,
      'mobile_no': 7455692500,
    };
    let response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Middle name should be alphabetic.`);

    const invalidUserAuthentication1 = {
      'first_name': 'first',
      'middle_name': 541651,
      'last_name': 'user',
      'recovery_email': 'abc@email.com',
      'isd_code': 110,
      'mobile_no': 7455692500,
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Middle name should be alphabetic.`);

    const invalidUserAuthentication2 = {
      'first_name': 'User',
      'middle_name': 'UserMiddleNameUserMiddleNameUsUserMiddleNa',
      'last_name': 'LastName',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Middle name should be min 2 max 30 character.`);

    const invalidUserAuthentication3 = {
      'first_name': 'UserFirstName',
      'middle_name': 'U',
      'last_name': 'UserLastName',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Middle name should be min 2 max 30 character.`);
  });

  test('Testing For User Update Last Name', async () => {
    const invalidUserAuthentication = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'LastName',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication);
    expect(response.body.success).toEqual(undefined);

    const invalidUserAuthentication1 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 4165151651,
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Last name should be alphabetic.`);

    const invalidUserAuthentication2 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'LAST NAMELASTNAMELASTNAMELAST NAME',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Last name should be min 2 max 30 character.`);

    const invalidUserAuthentication3 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': '!@#$%',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Last name should be alphabetic.`);

    const invalidUserAuthentication5 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'L',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Last name should be min 2 max 30 character.`);

    const invalidUserAuthentication6 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': '!@#$%&*',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Last name should be alphabetic.`);
  });

  test('Testing For User Update Recovery Email', async () => {
    const invalidUserAuthentication = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication);
    expect(response.body.success).toEqual(undefined);

    const invalidUserAuthentication1 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abcemail.com',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Recovery Email is not valid.`);

    const invalidUserAuthentication2 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 616515416515,
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Recovery Email is not valid.`);
  });

  test('Testing For User Authentication Recovery Email', async () => {
    const invalidUserAuthentication1 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': true,
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Recovery Email is not valid.`);

    const invalidUserAuthentication2 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': '!@#.$%&*',
      'isd_code': 91,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Recovery Email is not valid.`);
  });

  test('Testing For User Update ISD Code', async () => {
    const invalidUserAuthentication = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'mobile_no': '9874563210',
    };
    let response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication);
    expect(response.body.success).toEqual(undefined);

    const invalidUserAuthentication1 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 'asd',
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`ISD Code should be a numeric and min 1 max 3 Digit.`);

    const invalidUserAuthentication2 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 2131231232,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`ISD Code should be a numeric and min 1 max 3 Digit.`);

    const validUserAuthentication = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': true,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(validUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`ISD Code should be a numeric and min 1 max 3 Digit.`);

    const validUserAuthentication1 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 2.22,
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(validUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`ISD Code should be a numeric and min 1 max 3 Digit.`);

    const invalidUserAuthentication3 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': '!@#',
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`ISD Code should be a numeric and min 1 max 3 Digit.`);

    const invalidUserAuthentication4 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 'sbdshb',
      'mobile_no': '9874563210',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`ISD Code should be a numeric and min 1 max 3 Digit.`);
  });

  test('Testing For User Authentication ISD Code', async () => {
    const invalidUserAuthentication = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': 9874563210,
    };
    let response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication);
    expect(response.body.success).toEqual(undefined);

    const invalidUserAuthentication1 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': 'vvccvsddda',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Mobile Number should be a numeric value.`);

    const invalidUserAuthentication2 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': 987456,
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Mobile Number should be 10 Digit.`);

    const invalidUserAuthentication3 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': 0,
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Mobile Number should be 10 Digit. Mobile Number is Invalid.`);

    const invalidUserAuthentication4 = {
      'first_name': 'FirstName',
      'middle_name': 'User',
      'last_name': 'Last',
      'recovery_email': 'abc@email.com',
      'isd_code': 91,
      'mobile_no': '0000000000',
    };
    response = await testApp
        .put('/update/23067031-c81d-49ea-8edc-688e462efb76')
        .send(invalidUserAuthentication4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Mobile Number is Invalid.`);
  });

  test('Correct input of User Authentication', async () => {
    const requestUserAuthentication = {
    };
    const response = await testApp
        .post('/signup')
        .send(requestUserAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`First name should not be empty. Last name should not be empty. Email should not be empty. Password should not be empty. ISD Code should not be empty. Mobile Number should not be empty.`);
  });

  test('Testing For NewPassword and ConfirmPassword', async () => {
    const invalidUserPassword1 = {
      'confirm_password': 'Test@12345',
    };
    const response = await testApp
        .put('/23067031-c81d-49ea-8edc-688e462efb76/password/change')
        .send(invalidUserPassword1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
    .toEqual(`Password should not be empty. Password and Confirm Password Does Not Matched.`);

    const invalidUserPassword2 = {
      'new_password': 'Test@12345',
      'confirm_password': 'Test@1234',
    };
    const response2 = await testApp
        .put('/23067031-c81d-49ea-8edc-688e462efb76/password/change')
        .send(invalidUserPassword2);

    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
    .toEqual(`Password and Confirm Password Does Not Matched.`);
  });
});
