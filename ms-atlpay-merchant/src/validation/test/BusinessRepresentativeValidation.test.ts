import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {BusinessRepresentativeValidation} from
  '../BusinessRepresentativeValidation';
const app: express.Application = express();
app.use(bodyParser.json());
app.post('/test-business-representative',
    new BusinessRepresentativeValidation('business representative validator')
        .validationChain,
    new BusinessRepresentativeValidation('business representative validator')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.get('/test-business-representative/:id',
    new BusinessRepresentativeValidation('BusinessRepresentativeValidation')
        .paramValidateChain,
    new BusinessRepresentativeValidation('BusinessRepresentativeValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.put('/test-update-business-representative/:id',
    new BusinessRepresentativeValidation('BusinessRepresentativeValidation')
        .updateValidationChain,
    new BusinessRepresentativeValidation('BusinessRepresentativeValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);

const testApp = supertest(app);

describe('Test Business Representative Param', () => {
  test('Correct Param of BusinessRepresentative', async () => {
    const response = await testApp
    // eslint-disable-next-line
      .get('/test-business-representative/06411238-131a-42dd-b716-81adb2d834c4');
    expect(response.text).toEqual('Success');
  });
});

describe('Test Business Representative validation', () => {
  test('Correct input of Business Representative', async () => {
    const requestBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    const response = await testApp
        .post('/test-business-representative')
        .send(requestBusinessRepresentative);
    expect(response.text).toEqual('Success');
  });
  test('Empty input of Business Representative', async () => {
    const requestBusinessRepresentative = {

    };
    const response = await testApp
        .post('/test-business-representative')
        .send(requestBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual(`Business Representative First Name Should not be Empty. Business Representative Last Name Should not be Empty. Business Representative Email Should not be Empty. Business Representative Job Title Should not be Empty. Business Representative Date Of Birth Should not be Empty. Business Representative Business Address Line1 Should not be Empty. Business Representative Phone Number Should not be Empty.`);
  });


  test('Testing of Business Representative First Name', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(`Business Representative First Name Should not be Empty.`);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 123,
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative First Name should be Alphabetic.');
    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'A',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative First Name Should be min 2 max 40 character.');
  });

  test('Testing of Business Representative Middle Name', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 1234,
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
        .toEqual('Business Representative Middle Name should be Alphabetic.');

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'M',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Middle Name should be min 2 max 40 character.');
  });

  test('Testing of Business Representative Last Name', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
        .toEqual('Business Representative Last Name Should not be Empty.');

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 123,
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
        .toEqual('Business Representative Last Name Should be Alphabetic.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'A',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
        .toEqual('Business Representative Last Name Should be min 2 max 40.');
  });

  test('Testing of Business Representative email', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
        .toEqual('Business Representative Email Should not be Empty.');
    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': '@arnab.co.uk',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Email is not Valid.');
  });

  test('Testing of Business Representative Job Title', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Job Title Should not be Empty.');
    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 123,
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Job Title Should be Alphabetic.');

    const requestBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'A',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(requestBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Job Title Should be min 2 max 40.');
  });

  test('Testing of Date of Birth', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Date Of Birth Should not be Empty.');
    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': 1234,
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Date Of Birth Should be in YYYY-MM-DD format.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '2066-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Date Of Birth Should be Before Current Date.');
    const invalidBusinessRepresentative3 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '0000-00-00',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Date Of Birth Should be in YYYY-MM-DD format.');

    const invalidBusinessRepresentative4 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '29-0-1992',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Date Of Birth Should be in YYYY-MM-DD format.');
  });

  test('Testing of Business Representative Address Line1', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);

    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line1 Should not be Empty.');

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 12345678,
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line1 Should be Alphabetic.');
    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'A',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line1 Should be min 2 max 100.');

    const invalidBusinessRepresentative3 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      // eslint-disable-next-line
      'business_representative_business_address_line_1': 'business_representative_date_of_birthbusiness_representative_date_of_birthbusiness_representative_dat',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line1 Should be min 2 max 100.');
  });
  test('Testing of Business Representative Address Line 2', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': true,
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line2 Should be Alphabetic.');

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'a',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line2 Should be min 2 max 100.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      // eslint-disable-next-line
      'business_representative_business_address_line_2': 'business_representative_date_of_birthbusiness_representative_date_of_birthbusiness_representative_dat',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line2 Should be min 2 max 100.');
  });

  test('Testing of Business Representative Address Line 3', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 12345,
      'business_representative_phone_number': 9999999999,
    };

    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line3 Should be Alphabetic.');

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'a',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line3 Should be min 2 max 100.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      // eslint-disable-next-line
      'business_representative_business_address_line_3': 'business_representative_date_of_birthbusiness_representative_date_of_birthbusiness_representative_dat',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Business Address Line3 Should be min 2 max 100.');
  });

  test('Testing of Business Representative Phone number', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 'address Line 3',
    };

    let response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Phone Number Should not be Empty.');

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 'address Line 3',
      'business_representative_phone_number': '99999999999',
    };

    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Phone Number is Invalid.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 'address Line 3',
      'business_representative_phone_number': '9999999999999',
    };

    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Phone Number is Invalid.');

    const invalidBusinessRepresentative3 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 'address Line 3',
      'business_representative_phone_number': '0000000000',
    };

    response = await testApp
        .post('/test-business-representative')
        .send(invalidBusinessRepresentative3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    // eslint-disable-next-line
    expect(response.body.errors.error).toEqual('Business Representative Phone Number is Invalid.');
  });
});

describe('Update Business Representative validation', () => {
  test('Correct input of Business Representative', async () => {
    const requestBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    const response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(requestBusinessRepresentative);
    expect(response.text).toEqual('Success');
  });

  test('Testing of Business Representative First Name', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 123,
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative First Name should be Alphabetic.');
    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'A',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative First Name Should be min 2 max 40 character.');
  });

  test('Testing of Business Representative Middle Name', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 1234,
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Middle Name should be Alphabetic.');

    const invalidBusinessRepresentative6 = {
      'business_representative_first_name': 'First Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    const response6 = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative6);
    expect(response6.body.success).toEqual(undefined);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'M',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Middle Name should be min 2 max 40 character.');
  });

  test('Testing of Business Representative Last Name', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 123,
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
        .toEqual('Business Representative Last Name Should be Alphabetic.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'A',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();

    expect(response.body.errors.error)
        .toEqual('Business Representative Last Name Should be min 2 max 40.');
  });

  test('Testing of Business Representative email', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': '@arnab.co.uk',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Email is not Valid.');
  });

  test('Testing of Business Representative Job Title', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 123,
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Job Title Should be Alphabetic.');

    const requestBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'A',
      'business_representative_date_of_birth': '1966-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(requestBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Job Title Should be min 2 max 40.');
  });

  test('Testing of Date of Birth', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': 1234,
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Date Of Birth Should be in YYYY-MM-DD format.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '2066-01-25',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Date Of Birth Should be Before Current Date.');
    const invalidBusinessRepresentative3 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '0000-00-00',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Date Of Birth Should be in YYYY-MM-DD format.');

    const invalidBusinessRepresentative4 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '29-0-1992',
      'business_representative_business_address_line_1': 'Test address',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };

    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative4);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Date Of Birth Should be in YYYY-MM-DD format.');
  });

  test('Testing of Business Representative Address Line1', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 12345678,
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line1 Should be Alphabetic.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'A',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line1 Should be min 2 max 100.');

    const invalidBusinessRepresentative3 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      // eslint-disable-next-line
      'business_representative_business_address_line_1': 'business_representative_date_of_birthbusiness_representative_date_of_birthbusiness_representative_dat',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line1 Should be min 2 max 100.');
  });
  test('Testing of Business Representative Address Line 2', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': true,
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line2 Should be Alphabetic.');

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'a',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line2 Should be min 2 max 100.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      // eslint-disable-next-line
      'business_representative_business_address_line_2': 'business_representative_date_of_birthbusiness_representative_date_of_birthbusiness_representative_dat',
      'business_representative_business_address_line_3': 'address line 3',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line2 Should be min 2 max 100.');
  });

  test('Testing of Business Representative Address Line 3', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 12345,
      'business_representative_phone_number': 9999999999,
    };

    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line3 Should be Alphabetic.');

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address line 2',
      'business_representative_business_address_line_3': 'a',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line3 Should be min 2 max 100.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      // eslint-disable-next-line
      'business_representative_business_address_line_3': 'business_representative_date_of_birthbusiness_representative_date_of_birthbusiness_representative_dat',
      'business_representative_phone_number': 9999999999,
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
      .toEqual('Business Representative Business Address Line3 Should be min 2 max 100.');
  });

  test('Testing of Business Representative Phone number', async () => {
    const invalidBusinessRepresentative = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 'address Line 3',
    };

    let response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative);
    expect(response.body.success).toEqual(undefined);

    const invalidBusinessRepresentative1 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 'address Line 3',
      'business_representative_phone_number': '99999999999',
    };
    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative1);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Phone Number is Invalid.');

    const invalidBusinessRepresentative2 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 'address Line 3',
      'business_representative_phone_number': '9999999999999',
    };

    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative2);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Phone Number is Invalid.');

    const invalidBusinessRepresentative3 = {
      'business_representative_first_name': 'First Name',
      'business_representative_middle_name': 'Middle Name',
      'business_representative_last_name': 'Last Name',
      'business_representative_email': 'test@gmail.com',
      'business_representative_job_title': 'CTO',
      'business_representative_date_of_birth': '1999-01-01',
      'business_representative_business_address_line_1': 'address Line 1',
      'business_representative_business_address_line_2': 'address Line 2',
      'business_representative_business_address_line_3': 'address Line 3',
      'business_representative_phone_number': '0000000000',
    };

    response = await testApp
    // eslint-disable-next-line
      .put('/test-update-business-representative/06411238-131a-42dd-b716-81adb2d834c4')
        .send(invalidBusinessRepresentative3);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Business Representative Phone Number is Invalid.');
  });
});
