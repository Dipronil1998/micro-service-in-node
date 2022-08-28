import {
  HTTP_APP_CREDENTIALS_NOT_PRESENT, HTTP_ERROR_BLOCK_ACCOUNT,
  HTTP_ERROR_CODE_BAD_REQUEST, HTTP_ERROR_CODE_FORBIDDEN,
  HTTP_ERROR_CODE_INTERNAL_SERVER_ERROR,
  HTTP_ERROR_CODE_PAGE_NOT_FOUND, HTTP_ERROR_CODE_UNAUTHORIZED_CLIENT,
  HTTP_ERROR_DATA_NOT_FOUND,
  HTTP_ERROR_EMAIL_ALREADY_EXSISTS,
  HTTP_ERROR_INCORRECT_PASSWORD,
  HTTP_ERROR_MESSAGE_GENERAL_SERVER_ERROR,
  HTTP_ERROR_MESSAGE_MISSING_AUTH_TOKEN, HTTP_ERROR_MESSAGE_PAGE_NOT_FOUND,
  HTTP_ERROR_MESSAGE_UNAUTHORIZED_CLIENT,
  HTTP_ERROR_PASSWORD_CONFIRM_PASSWORD_MISMATCH,
  HTTP_INVALID_APP_KEY,
  HTTP_SUCCESS_CODE_OK, HTTP_SUCCESS_MESSAGE_DATA_DELETE,
  HTTP_SUCCESS_MESSAGE_DATA_UPDATE,
  HTTP_SUCCESS_MESSAGE_USER_CREATED,
  HTTP_SUCCESS_MESSAGE_USER_LOGIN,
  HTTP_SUCCESS_MESSAGE_VALID_TOKEN,
  HTTP_ERROR_MESSAGE_INVAILD_INPUT,
  HTTP_SUCCESS_PASSWORD_UPDATED,
  HTTP_ERROR_OLD_PASSWORD_CHOSEN,
  HTTP_ERROR_SAME_CURRENT_AND_NEW_PASSWORD,
  HTTP_ERROR_SAME_EMAIL_AND_RECOVERY_EMAIL,
  HTTP_SUCCESS_EMAIL_AVAILABLE,
  HTTP_ERROR_USERNAME_ALREADY_EXSISTS,
  HTTP_SUCCESS_USERNAME_AVAILABLE,
  HTTP_LOCATION_NOT_FOUND,
  HTTP_SUCCESS_MESSAGE_OTP_SENT,
  HTTP_ERROR_MESSAGE_INVALID_OTP,
  IP_DATA_BASE_API_URL,
  HTTP_ERROR_SUSPEND_ACCOUNT,
  HTTP_SUCCESS_SUSPEND_ACCOUNT,
  HTTP_SUCCESS_MESSAGE_ADMIN_NOTE_ADDED,
  HTTP_SUCCESS_DOWNLOAD_GOOGLE_AUTHENTICATOR,
  HTTP_SUCCESS_ENTER_GOOGLE_AUTHENTICATOR,
} from '../constant';

describe('Test cases for Constant', () => {
  test('test cases for General server error', async () => {
    expect(HTTP_ERROR_MESSAGE_GENERAL_SERVER_ERROR)
        .toEqual('Please try again after some time');
    expect(HTTP_ERROR_MESSAGE_GENERAL_SERVER_ERROR).not.toEqual('Not Match');
  });

  test('test cases for Success Code', async () => {
    expect(HTTP_SUCCESS_CODE_OK).toEqual(200);
    expect(HTTP_SUCCESS_CODE_OK).not.toEqual('Not 200');
  });

  test('test cases for Internal Server error', async () => {
    expect(HTTP_ERROR_CODE_INTERNAL_SERVER_ERROR).toEqual(500);
    expect(HTTP_ERROR_CODE_INTERNAL_SERVER_ERROR).not.toEqual('Not 500');
  });

  test('test cases for Page Not Found', async () => {
    expect(HTTP_ERROR_MESSAGE_PAGE_NOT_FOUND).toEqual('Page Not Found');
    expect(HTTP_ERROR_MESSAGE_PAGE_NOT_FOUND).not.toEqual('Page found');
  });

  test('test cases for Page Not Found HTTP Status Code', async () => {
    expect(HTTP_ERROR_CODE_PAGE_NOT_FOUND).toEqual(404);
    expect(HTTP_ERROR_CODE_PAGE_NOT_FOUND).not.toEqual('Page 404');
  });

  test('test cases for Data Not Found', async () => {
    expect(HTTP_ERROR_DATA_NOT_FOUND).toEqual('Data Not Found');
    expect(HTTP_ERROR_DATA_NOT_FOUND).not.toEqual('Data Found');
  });

  test('test cases for Data Delete Successfylly', async () => {
    expect(HTTP_SUCCESS_MESSAGE_DATA_DELETE)
        .toEqual('Data Deleted Successfully');
    expect(HTTP_SUCCESS_MESSAGE_DATA_DELETE).not.toEqual('Data Deleted Failed');
  });

  test('test cases for Data Update Successfylly', async () => {
    expect(HTTP_SUCCESS_MESSAGE_DATA_UPDATE)
        .toEqual('Data Updated Successfully');
    expect(HTTP_SUCCESS_MESSAGE_DATA_UPDATE).not.toEqual('Data Updated Failed');
  });

  test('test cases for HTTP Error Code', async () => {
    expect(HTTP_ERROR_CODE_BAD_REQUEST).toEqual(400);
    expect(HTTP_ERROR_CODE_BAD_REQUEST).not.toEqual('Not 400');
  });

  test('test cases for Email Already Exists', async () => {
    expect(HTTP_ERROR_EMAIL_ALREADY_EXSISTS).toEqual('Email Already Exists');
    expect(HTTP_ERROR_EMAIL_ALREADY_EXSISTS).not.toEqual('Email is not Exists');
  });

  test('test cases for Incorrect Password', async () => {
    expect(HTTP_ERROR_INCORRECT_PASSWORD).toEqual('Incorrect Password');
    expect(HTTP_ERROR_INCORRECT_PASSWORD).not.toEqual('Correct Password');
  });

  test('test cases for The Account is Temporarily Blocked', async () => {
    expect(HTTP_ERROR_BLOCK_ACCOUNT)
        .toEqual('The Account is Temporarily Blocked');
    expect(HTTP_ERROR_BLOCK_ACCOUNT)
        .not.toEqual('The Account is Temporarily UnBlocked');
  });

  test('test cases for User Created Successfully', async () => {
    expect(HTTP_SUCCESS_MESSAGE_USER_CREATED)
        .toEqual('User Created Successfully');
    expect(HTTP_SUCCESS_MESSAGE_USER_CREATED)
        .not.toEqual('User Created Failed');
  });

  test('test cases for Login Successfully', async () => {
    expect(HTTP_SUCCESS_MESSAGE_USER_LOGIN).toEqual('Login Successfully');
    expect(HTTP_SUCCESS_MESSAGE_USER_LOGIN).not.toEqual('Login Failed');
  });

  test('test cases for Password and Confirm Password Does Not Matched',
      async () => {
        expect(HTTP_ERROR_PASSWORD_CONFIRM_PASSWORD_MISMATCH)
            .toEqual('Password and Confirm Password Does Not Matched');
        expect(HTTP_ERROR_PASSWORD_CONFIRM_PASSWORD_MISMATCH)
            .not.toEqual('Password and Confirm Password Matched!');
      });

  test('test cases for App Credentials Not Present in Header', async () => {
    expect(HTTP_APP_CREDENTIALS_NOT_PRESENT)
        .toEqual('App Credentials Not Present in Header');
    expect(HTTP_APP_CREDENTIALS_NOT_PRESENT)
        .not.toEqual('App Credentials Present in Header');
  });

  test('test cases for App Credentials Are Invalid', async () => {
    expect(HTTP_INVALID_APP_KEY).toEqual('App Credentials Are Invalid');
    expect(HTTP_INVALID_APP_KEY).not.toEqual('App Credentials Are Valid');
  });

  test('test cases for HTTP Error Code Unauthorized Client', async () => {
    expect(HTTP_ERROR_CODE_UNAUTHORIZED_CLIENT).toEqual(401);
    expect(HTTP_ERROR_CODE_UNAUTHORIZED_CLIENT).not.toEqual(400);
  });

  test('test cases for Missing Authentication Token', async () => {
    expect(HTTP_ERROR_MESSAGE_MISSING_AUTH_TOKEN)
        .toEqual('Missing Authentication Token');
    expect(HTTP_ERROR_MESSAGE_MISSING_AUTH_TOKEN)
        .not.toEqual('Authentication Token');
  });

  test('test cases for Unauthorized Client', async () => {
    expect(HTTP_ERROR_MESSAGE_UNAUTHORIZED_CLIENT)
        .toEqual('Unauthorized Client');
    expect(HTTP_ERROR_MESSAGE_UNAUTHORIZED_CLIENT)
        .not.toEqual('Authorized Client');
  });

  test('test cases for HTTP Error Code Forbidden', async () => {
    expect(HTTP_ERROR_CODE_FORBIDDEN).toEqual(403);
    expect(HTTP_ERROR_CODE_FORBIDDEN).not.toEqual(400);
  });

  test('test cases for HTTTP Invalid Input', () => {
    expect(HTTP_ERROR_MESSAGE_INVAILD_INPUT)
        .toEqual('Invalid Input in request body');
    expect(HTTP_ERROR_MESSAGE_INVAILD_INPUT)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for HTTTP Invalid Input', () => {
    expect(HTTP_SUCCESS_MESSAGE_VALID_TOKEN)
        .toEqual('Token verified');
    expect(HTTP_SUCCESS_MESSAGE_VALID_TOKEN)
        .not
        .toEqual('Token verified Done');
  });

  test('test cases for HTTTP Invalid Input', () => {
    expect(HTTP_ERROR_SAME_EMAIL_AND_RECOVERY_EMAIL)
        .toEqual('Email and Recovery Email Should Not be Same');
    expect(HTTP_ERROR_SAME_EMAIL_AND_RECOVERY_EMAIL)
        .not
        .toEqual('Email and Recovery Email Should be Same');
  });

  test('test cases for HTTTP Invalid Input', () => {
    expect(HTTP_ERROR_SAME_CURRENT_AND_NEW_PASSWORD)
        .toEqual('Current and New Password Should Not be Same');
    expect(HTTP_ERROR_SAME_CURRENT_AND_NEW_PASSWORD)
        .not
        .toEqual('Current and New Password Shouldbe Same');
  });

  test('test cases for HTTTP Invalid Input', () => {
    expect(HTTP_ERROR_OLD_PASSWORD_CHOSEN)
        .toEqual('You have Already Used this Password in Past');
    expect(HTTP_ERROR_OLD_PASSWORD_CHOSEN)
        .not
        .toEqual('You have Already Used this Password');
  });

  test('test cases for HTTTP Invalid Input', () => {
    expect(HTTP_SUCCESS_PASSWORD_UPDATED)
        .toEqual('Password Updated Successfully');
    expect(HTTP_SUCCESS_PASSWORD_UPDATED)
        .not
        .toEqual('Password Updated');
  });

  test('test cases for Available Email', () => {
    expect(HTTP_SUCCESS_EMAIL_AVAILABLE)
        .toEqual('Email is Available For Use');
    expect(HTTP_SUCCESS_EMAIL_AVAILABLE)
        .not
        .toEqual('Email is not Available For Use');
  });

  test('test cases for Username Already Exists', () => {
    expect(HTTP_ERROR_USERNAME_ALREADY_EXSISTS)
        .toEqual('Username Already Exists');
    expect(HTTP_ERROR_USERNAME_ALREADY_EXSISTS)
        .not
        .toEqual('Username Already Exist');
  });

  test('test cases for Username is Available', () => {
    expect(HTTP_SUCCESS_USERNAME_AVAILABLE)
        .toEqual('Username is Available For Use');
    expect(HTTP_SUCCESS_USERNAME_AVAILABLE)
        .not
        .toEqual('Username is Available');
  });

  test('test cases for LOCATION NOT FOUND', () => {
    expect(HTTP_LOCATION_NOT_FOUND)
        .toEqual('Location Not Found');
    expect(HTTP_LOCATION_NOT_FOUND)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for SUCCESS_MESSAGE_OTP_SENT', () => {
    expect(HTTP_SUCCESS_MESSAGE_OTP_SENT)
        .toEqual('OTP is sent to registered email');
    expect(HTTP_SUCCESS_MESSAGE_OTP_SENT)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for ERROR_MESSAGE_INVALID_OTP', () => {
    expect(HTTP_ERROR_MESSAGE_INVALID_OTP)
        .toEqual('Invalid OTP');
    expect(HTTP_ERROR_MESSAGE_INVALID_OTP)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for IP_DATA_BASE_API_URL', () => {
    expect(IP_DATA_BASE_API_URL)
        .toEqual('https://api.ipdata.co/');
    expect(IP_DATA_BASE_API_URL)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for ERROR_SUSPEND_ACCOUNT', () => {
    expect(HTTP_ERROR_SUSPEND_ACCOUNT)
        .toEqual('The Account is suspended');
    expect(HTTP_ERROR_SUSPEND_ACCOUNT)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for SUSPEND_ACCOUNT', () => {
    expect(HTTP_SUCCESS_SUSPEND_ACCOUNT)
        .toEqual('The account has been successfully suspended');
    expect(HTTP_SUCCESS_SUSPEND_ACCOUNT)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for ADMIN_NOTE_ADDED', () => {
    expect(HTTP_SUCCESS_MESSAGE_ADMIN_NOTE_ADDED)
        .toEqual('Admin note added successfully');
    expect(HTTP_SUCCESS_MESSAGE_ADMIN_NOTE_ADDED)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for GOOGLE_AUTHENTICATOR', () => {
    expect(HTTP_SUCCESS_DOWNLOAD_GOOGLE_AUTHENTICATOR)
    // eslint-disable-next-line
        .toEqual('Download Google Authenticator App from app store and scan QR to generate OTP');
    expect(HTTP_SUCCESS_DOWNLOAD_GOOGLE_AUTHENTICATOR)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for GOOGLE_AUTHENTICATOR_OTP', () => {
    expect(HTTP_SUCCESS_ENTER_GOOGLE_AUTHENTICATOR)
        .toEqual('Please open Google Authenticator and enter OTP');
    expect(HTTP_SUCCESS_ENTER_GOOGLE_AUTHENTICATOR)
        .not
        .toEqual('Invalid Input type');
  });
});
