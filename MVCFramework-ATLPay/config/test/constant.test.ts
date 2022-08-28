import {HTTP_APP_CREDENTIALS_NOT_PRESENT,
  HTTP_ERROR_BLOCK_ACCOUNT,
  HTTP_ERROR_CODE_BAD_REQUEST, HTTP_ERROR_CODE_FORBIDDEN,
  HTTP_ERROR_CODE_INTERNAL_SERVER_ERROR,
  HTTP_ERROR_CODE_PAGE_NOT_FOUND,
  HTTP_ERROR_CODE_PAY_LOAD_TOO_LARGE,
  HTTP_ERROR_CODE_UNAUTHORIZED_CLIENT,
  HTTP_ERROR_CODE_UNSUPPORTED_MEDIA_TYPE,
  HTTP_ERROR_DATA_NOT_FOUND,
  HTTP_ERROR_EMAIL_ALREADY_EXSISTS,
  HTTP_ERROR_INCORRECT_PASSWORD,
  HTTP_ERROR_MESSAGE_GENERAL_SERVER_ERROR,
  HTTP_ERROR_MESSAGE_INVALID_FILE_TYPE,
  HTTP_ERROR_MESSAGE_MISSING_AUTH_TOKEN,
  HTTP_ERROR_MESSAGE_PAGE_NOT_FOUND,
  HTTP_ERROR_MESSAGE_UNAUTHORIZED_CLIENT,
  HTTP_ERROR_PASSWORD_CONFIRM_PASSWORD_MISMATCH,
  HTTP_FILE_SIZE_EXCEEDED,
  HTTP_INVALID_APP_KEY,
  HTTP_INVALID_PAGE_OR_SIZE,
  HTTP_SUCCESS_CODE_OK, HTTP_SUCCESS_MESSAGE_DATA_DELETE,
  HTTP_SUCCESS_MESSAGE_DATA_UPDATE,
  HTTP_SUCCESS_MESSAGE_USER_CREATED,
  HTTP_SUCCESS_MESSAGE_USER_LOGIN,
  HTTTP_ERROR_MESSAGE_INVAILD_INPUT} from '../constant';

describe('Test cases for Constant', () => {
  test('test cases for General server error', () => {
    expect(HTTP_ERROR_MESSAGE_GENERAL_SERVER_ERROR)
        .toEqual('Please try again after some time');
    expect(HTTP_ERROR_MESSAGE_GENERAL_SERVER_ERROR).not.toEqual('Not Match');
  });

  test('test cases for Success Code', () => {
    expect(HTTP_SUCCESS_CODE_OK).toEqual(200);
    expect(HTTP_SUCCESS_CODE_OK).not.toEqual('Not 200');
  });

  test('test cases for Internal Server error', () => {
    expect(HTTP_ERROR_CODE_INTERNAL_SERVER_ERROR).toEqual(500);
    expect(HTTP_ERROR_CODE_INTERNAL_SERVER_ERROR).not.toEqual('Not 500');
  });

  test('test cases for Page Not Found', () => {
    expect(HTTP_ERROR_MESSAGE_PAGE_NOT_FOUND).toEqual('Page Not Found');
    expect(HTTP_ERROR_MESSAGE_PAGE_NOT_FOUND).not.toEqual('Page found');
  });

  test('test cases for Page Not Found HTTP Status Code', () => {
    expect(HTTP_ERROR_CODE_PAGE_NOT_FOUND).toEqual(404);
    expect(HTTP_ERROR_CODE_PAGE_NOT_FOUND).not.toEqual('Page 404');
  });

  test('test cases for Data Not Found', () => {
    expect(HTTP_ERROR_DATA_NOT_FOUND).toEqual('Data Not Found');
    expect(HTTP_ERROR_DATA_NOT_FOUND).not.toEqual('Data Found');
  });

  test('test cases for Data Delete Successfylly', () => {
    expect(HTTP_SUCCESS_MESSAGE_DATA_DELETE)
        .toEqual('Data Deleted Successfully');
    expect(HTTP_SUCCESS_MESSAGE_DATA_DELETE).not.toEqual('Data Deleted Failed');
  });

  test('test cases for Data Update Successfylly', () => {
    expect(HTTP_SUCCESS_MESSAGE_DATA_UPDATE)
        .toEqual('Data Updated Successfully');
    expect(HTTP_SUCCESS_MESSAGE_DATA_UPDATE).not.toEqual('Data Updated Failed');
  });

  test('test cases for HTTP Error Code', () => {
    expect(HTTP_ERROR_CODE_BAD_REQUEST).toEqual(400);
    expect(HTTP_ERROR_CODE_BAD_REQUEST).not.toEqual('Not 400');
  });

  test('test cases for Email Already Exists', () => {
    expect(HTTP_ERROR_EMAIL_ALREADY_EXSISTS).toEqual('Email Already Exists');
    expect(HTTP_ERROR_EMAIL_ALREADY_EXSISTS).not.toEqual('Email is not Exists');
  });

  test('test cases for Incorrect Password', () => {
    expect(HTTP_ERROR_INCORRECT_PASSWORD).toEqual('Incorrect Password');
    expect(HTTP_ERROR_INCORRECT_PASSWORD).not.toEqual('Correct Password');
  });

  test('test cases for The Account is Temporarily Blocked', () => {
    expect(HTTP_ERROR_BLOCK_ACCOUNT)
        .toEqual('The Account is Temporarily Blocked');
    expect(HTTP_ERROR_BLOCK_ACCOUNT)
        .not.toEqual('The Account is Temporarily UnBlocked');
  });

  test('test cases for User Created Successfully', () => {
    expect(HTTP_SUCCESS_MESSAGE_USER_CREATED)
        .toEqual('User Created Successfully');
    expect(HTTP_SUCCESS_MESSAGE_USER_CREATED)
        .not.toEqual('User Created Failed');
  });

  test('test cases for Login Successfully', () => {
    expect(HTTP_SUCCESS_MESSAGE_USER_LOGIN).toEqual('Login Successfully');
    expect(HTTP_SUCCESS_MESSAGE_USER_LOGIN).not.toEqual('Login Failed');
  });

  test('test cases for Password and Confirm Password Does Not Matched',
      () => {
        expect(HTTP_ERROR_PASSWORD_CONFIRM_PASSWORD_MISMATCH)
            .toEqual('Password and Confirm Password Does Not Matched!');
        expect(HTTP_ERROR_PASSWORD_CONFIRM_PASSWORD_MISMATCH)
            .not.toEqual('Password and Confirm Password Matched!');
      });

  test('test cases for App Credentials Not Present in Header', () => {
    expect(HTTP_APP_CREDENTIALS_NOT_PRESENT)
        .toEqual('App Credentials Not Present in Header');
    expect(HTTP_APP_CREDENTIALS_NOT_PRESENT)
        .not.toEqual('App Credentials Present in Header');
  });

  test('test cases for App Credentials Are Invalid', () => {
    expect(HTTP_INVALID_APP_KEY).toEqual('App Credentials Are Invalid');
    expect(HTTP_INVALID_APP_KEY).not.toEqual('App Credentials Are Valid');
  });

  test('test cases for HTTP Error Code Unauthorized Client', () => {
    expect(HTTP_ERROR_CODE_UNAUTHORIZED_CLIENT).toEqual(401);
    expect(HTTP_ERROR_CODE_UNAUTHORIZED_CLIENT).not.toEqual(400);
  });

  test('test cases for Missing Authentication Token', () => {
    expect(HTTP_ERROR_MESSAGE_MISSING_AUTH_TOKEN)
        .toEqual('Missing Authentication Token');
    expect(HTTP_ERROR_MESSAGE_MISSING_AUTH_TOKEN)
        .not.toEqual('Authentication Token');
  });

  test('test cases for Unauthorized Client', () => {
    expect(HTTP_ERROR_MESSAGE_UNAUTHORIZED_CLIENT)
        .toEqual('Unauthorized Client');
    expect(HTTP_ERROR_MESSAGE_UNAUTHORIZED_CLIENT)
        .not.toEqual('Authorized Client');
  });

  test('test cases for HTTP Error Code Forbidden', () => {
    expect(HTTP_ERROR_CODE_FORBIDDEN).toEqual(403);
    expect(HTTP_ERROR_CODE_FORBIDDEN).not.toEqual(400);
  });

  test('test cases for HTTP Invalid Page and size', () => {
    expect(HTTP_INVALID_PAGE_OR_SIZE)
        .toEqual('Please Enter Correct Page or Size');
    expect(HTTP_INVALID_PAGE_OR_SIZE)
        .not
        .toEqual('Please Enter Correct Size or Page');
  });

  test('test cases for HTTP File size exceed', () => {
    expect(HTTP_FILE_SIZE_EXCEEDED)
        .toEqual(
            // eslint-disable-next-line
            'File size has exceeded File Should be up to ~ 2 MB');
    expect(HTTP_FILE_SIZE_EXCEEDED)
        .not
        .toEqual('File size has exceeded File Should be up to ~ 3 MB');
  });

  test('test cases for HTTP Invalid file type', () => {
    expect(HTTP_ERROR_MESSAGE_INVALID_FILE_TYPE).toEqual('Invalid file Type');
    expect(HTTP_ERROR_MESSAGE_INVALID_FILE_TYPE).not.toEqual('Invalid file');
  });

  test('test cases for HTTP pay load too large', () => {
    expect(HTTP_ERROR_CODE_PAY_LOAD_TOO_LARGE).toEqual(413);
    expect(HTTP_ERROR_CODE_PAY_LOAD_TOO_LARGE).not.toEqual(415);
  });

  test('test cases for HTTP unsupported media type', () => {
    expect(HTTP_ERROR_CODE_UNSUPPORTED_MEDIA_TYPE).toEqual(415);
    expect(HTTP_ERROR_CODE_UNSUPPORTED_MEDIA_TYPE).not.toEqual(413);
  });

  test('test cases for HTTTP Invalid Input', ()=>{
    expect(HTTTP_ERROR_MESSAGE_INVAILD_INPUT)
        .toEqual('Invalid Input in request body');
    expect(HTTTP_ERROR_MESSAGE_INVAILD_INPUT)
        .not
        .toEqual('Invalid Input type');
  });
});

