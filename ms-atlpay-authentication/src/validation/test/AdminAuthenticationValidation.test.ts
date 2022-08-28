import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {AdminAuthenticationValidation} from
  '../AdminAuthenticationValidation';
const app: express.Application = express();
app.use(bodyParser.json());

app.post('/signup',
    new AdminAuthenticationValidation('AdminAuthentication validator')
        .validationChain,
    new AdminAuthenticationValidation('AdminAuthentication validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Signup Success');
    },
);
app.put('/:id/password/change',
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .updatePasswordValidationChain,
    new AdminAuthenticationValidation('AdminAuthentication Validation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Password Changed Successfully');
    },
);

const testApp = supertest(app);

describe('Admin Validation Signup', () => {
  test('Correct input of Admin Authentication', async () => {
    const requestAdminAuthentication = {
      'first_name': 'AdminFirstName',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    const response = await testApp.post('/signup')
        .send(requestAdminAuthentication);
    expect(response.text).toEqual('Signup Success');
  });

  test('Testing For Admin Authentication First Name', async () => {
    const invalidAdminAuthentication = {
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`First name should not be empty.`);

    const invalidAdminAuthentication1 = {
      'first_name': 77777,
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`First name should be alphabetic.`);

    const invalidAdminAuthentication2 = {
      'first_name': 'U',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
            .toEqual(`First name should be minimum 2 and maximum 30 character.`);

    const invalidAdminAuthentication5 = {
      'first_name': 'AdminFirstNameAdminFirstNameAdminF',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
            .toEqual(`First name should be minimum 2 and maximum 30 character.`);

    const invalidAdminAuthentication6 = {
      'first_name': 'Admin#$%Name1',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`First name should be alphabetic.`);
  });

  test('Testing For Admin Authentication Middle Name', async () => {
    const invalidAdminAuthentication2 = {
      'first_name': 'AdminFirstName',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    const response2 = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication2);
    expect(response2.body.success).toEqual(undefined);

    const invalidAdminAuthentication = {
      'first_name': 'AdminFirstName',
      'middle_name': 'Admin#$%&e Name1',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Middle name should be alphabetic.`);

    const invalidAdminAuthentication1 = {
      'first_name': 'AdminFirstName',
      'middle_name': 555,
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Middle name should be alphabetic.`);

    const invalidAdminAuthentication3 = {
      'first_name': 'AdminFirstName',
      'middle_name': 'AdminMiddleNameAdminMiddleNameUse',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
            .toEqual(`Middle name should be minimum 2 and maximum 30 character.`);

    const invalidAdminAuthentication4 = {
      'first_name': 'AdminFirstName',
      'middle_name': 'A',
      'last_name': 'AdminLastName',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
            .toEqual(`Middle name should be minimum 2 and maximum 30 character.`);
  });

  test('Testing For Admin Authentication Last Name', async () => {
    const invalidAdminAuthentication = {
      'first_name': 'AdminFirstName',
      'email': 'test@email.com',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Last name should not be empty.`);

    const invalidAdminAuthentication1 = {
      'first_name': 'AdminFirstName',
      'last_name': 77777,
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Last name should be alphabetic.`);

    const invalidAdminAuthentication2 = {
      'first_name': 'AdminFirstName',
      'last_name': 'U',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
            .toEqual(`Last name should be minimum 2 and maximum 30 character.`);

    const invalidAdminAuthentication5 = {
      'first_name': 'AdminFirstName',
      'last_name': 'AdminLastNameAdminLastNameAdminLas',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication5);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
            .toEqual(`Last name should be minimum 2 and maximum 30 character.`);

    const invalidAdminAuthentication6 = {
      'first_name': 'AdminFirstName',
      'last_name': 'Admin#$%&Name1',
      'email': 'test@email.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication6);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Last name should be alphabetic.`);
  });

  test('Testing For Admin Authentication Email', async () => {
    const invalidAdminAuthentication = {
      'first_name': 'AdminFirstName',
      'last_name': 'AdminLastName',
    };
    let response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Email should not be empty.`);

    const invalidAdminAuthentication1 = {
      'first_name': 'AdminFirstName',
      'last_name': 'AdminLastName',
      'email': 'test',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Email is not valid.`);

    const invalidAdminAuthentication2 = {
      'first_name': 'AdminFirstName',
      'last_name': 'AdminLastName',
      'email': 'test_test.com',
    };
    response = await testApp
        .post('/signup')
        .send(invalidAdminAuthentication2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Email is not valid.`);
  });
  test('Empty input of Admin Authentication', async () => {
    const requestAdminAuthentication = {

    };
    const response = await testApp.post('/signup')
        .send(requestAdminAuthentication);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
            .toEqual(`First name should not be empty. Last name should not be empty. Email should not be empty.`);
  });
});

describe('Update Password Validation', () => {
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
