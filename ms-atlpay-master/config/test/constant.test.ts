import {HTTP_ERROR_CODE_BAD_REQUEST, HTTP_ERROR_CODE_INTERNAL_SERVER_ERROR,
  HTTP_ERROR_CODE_PAGE_NOT_FOUND, HTTP_ERROR_DATA_NOT_FOUND,
  HTTP_ERROR_MESSAGE_GENERAL_SERVER_ERROR, HTTP_ERROR_MESSAGE_PAGE_NOT_FOUND,
  HTTP_SUCCESS_CODE_OK, HTTP_SUCCESS_MESSAGE_DATA_DELETE,
  HTTP_SUCCESS_MESSAGE_DATA_UPDATE,
  HTTP_SUCCESS_MESSAGE_DATA_CREATE,
  HTTTP_ERROR_MESSAGE_INVAILD_INPUT,
  HTTP_LOCATION_NOT_FOUND}
  from '../constant';

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
        .toEqual('Data Delete Successfully');
    expect(HTTP_SUCCESS_MESSAGE_DATA_DELETE).not.toEqual('Data Delete Failed');
  });

  test('test cases for Data Update Successfylly', async () => {
    expect(HTTP_SUCCESS_MESSAGE_DATA_UPDATE)
        .toEqual('Data Update Successfully');
    expect(HTTP_SUCCESS_MESSAGE_DATA_UPDATE).not.toEqual('Data Update Failed');
  });

  test('test cases for HTTP Error Code', async () => {
    expect(HTTP_ERROR_CODE_BAD_REQUEST).toEqual(400);
    expect(HTTP_ERROR_CODE_BAD_REQUEST).not.toEqual('Not 400');
  });

  test('test cases for Country Create Successfylly', async () => {
    expect(HTTP_SUCCESS_MESSAGE_DATA_CREATE)
        .toEqual('Create Country Successfully');
    expect(HTTP_SUCCESS_MESSAGE_DATA_CREATE).not.toEqual('Not 500');
    expect(HTTP_SUCCESS_MESSAGE_DATA_CREATE).not
        .toEqual('Create Country Failed');
  });

  test('test cases for HTTTP Invalid Input', ()=>{
    expect(HTTTP_ERROR_MESSAGE_INVAILD_INPUT)
        .toEqual('Invalid Input in request body');
    expect(HTTTP_ERROR_MESSAGE_INVAILD_INPUT)
        .not
        .toEqual('Invalid Input type');
  });

  test('test cases for LOCATION NOT FOUND', ()=>{
    expect(HTTP_LOCATION_NOT_FOUND)
        .toEqual('Location Not Found');
    expect(HTTP_LOCATION_NOT_FOUND)
        .not
        .toEqual('Invalid Input type');
  });
});

