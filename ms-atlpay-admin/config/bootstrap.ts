import dotenv from 'dotenv';
import path from 'path';
import * as constant from './constant';
import * as envalid from 'envalid';
dotenv.config({path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`)});
const env = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str(
      {choices: ['production', 'development', 'test', 'local']}),
  DB_TYPE: envalid.str(),
  DB_HOSTNAME: envalid.host(),
  DB_PORT: envalid.port(),
  DB_USER: envalid.str(),
  DB_PASSWORD: envalid.str(),
  DB_DATABASE: envalid.str(),
  PORT: envalid.port(),
  ORM_DB_NAME: envalid.str(),
  JWT_SECRET_KEY: envalid.str(),
  EXCHANGE_RATE_API: envalid.url(),
  EXCHANGE_RATE_API_KEY: envalid.str(),
  AUTH_MASTER_URL: envalid.str(),
});
export const dbType : any = env.DB_TYPE;
export const dbHostName : string = env.DB_HOSTNAME;
export const dbport : number = env.DB_PORT;
export const dbUser : string = env.DB_USER;
export const dbPassword : string = env.DB_PASSWORD;
export const dbDatabase : string = env.DB_DATABASE;
export const port : number = env.PORT;
export const ormDBName : string = env.ORM_DB_NAME;
export const environment : string = env.NODE_ENV;
export const jwtSecretKey: string = env.JWT_SECRET_KEY;
export const exchangeRateAPI : string = env.EXCHANGE_RATE_API;
export const exchangeRateAPIKey : string = env.EXCHANGE_RATE_API_KEY;
export const AUTH_MASTER_URL : string = env.AUTH_MASTER_URL;
export const generalServerErrorMessage : string =
    constant.HTTP_ERROR_MESSAGE_GENERAL_SERVER_ERROR;
export const httpSuccessCode : number = constant.HTTP_SUCCESS_CODE_OK;
export const httpInternalServerErrorCode : number =
    constant.HTTP_ERROR_CODE_INTERNAL_SERVER_ERROR;
export const httpPageNotFoundMessage : string =
    constant.HTTP_ERROR_MESSAGE_PAGE_NOT_FOUND;
export const httpPageNotFoundCode : number =
    constant.HTTP_ERROR_CODE_PAGE_NOT_FOUND;
export const httpDataNotFound : string =
    constant.HTTP_ERROR_DATA_NOT_FOUND;
export const httpSuccessDataDelete : string =
    constant.HTTP_SUCCESS_MESSAGE_DATA_DELETE;
export const httpSuccessDataUpdate : string =
    constant.HTTP_SUCCESS_MESSAGE_DATA_UPDATE;
export const httpSuccessDataAdded : string =
    constant.HTTP_SUCCESS_MESSAGE_DATA_ADDED;
export const httpBadRequestCode : number = constant.HTTP_ERROR_CODE_BAD_REQUEST;

export const httpEmailAlreadyExsits : string =
    constant.HTTP_ERROR_EMAIL_ALREADY_EXSISTS;
export const userDataNotFound : string =
    constant.HTTP_ERROR_USER_NOT_FOUND;
export const incorrectPassword:string=constant.HTTP_ERROR_INCORRECT_PASSWORD;
export const userBlockAccount:string=constant.HTTP_ERROR_BLOCK_ACCOUNT;
export const userCreated:string = constant.HTTP_SUCCESS_MESSAGE_USER_CREATED;
export const passwordConfirmPasswordMismatchError:string =
    constant.HTTP_ERROR_PASSWORD_CONFIRM_PASSWORD_MISMATCH;
export const loginSuccess:string = constant.HTTP_SUCCESS_MESSAGE_USER_LOGIN;
export const httpAppCredentialsNotPresent:string =
    constant.HTTP_APP_CREDENTIALS_NOT_PRESENT;
export const httpInvalidAppCredential:string = constant.HTTP_INVALID_APP_KEY;

export const missingAuthenticationToken: string =
    constant.HTTP_ERROR_MESSAGE_MISSING_AUTH_TOKEN;
export const unauthorizedClient : number =
    constant.HTTP_ERROR_CODE_UNAUTHORIZED_CLIENT;
export const unauthorizedClientMessage : string =
    constant.HTTP_ERROR_MESSAGE_UNAUTHORIZED_CLIENT;
export const forbidden: number = constant.HTTP_ERROR_CODE_FORBIDDEN;
export const invalidPageOrSize:string = constant.HTTP_INVALID_PAGE_OR_SIZE;
export const invalidInputMessage : string =
    constant.HTTTP_ERROR_MESSAGE_INVAILD_INPUT;
