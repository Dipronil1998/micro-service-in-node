import dotenv from 'dotenv';
import path from 'path';
import * as constant from './constant';
import {cleanEnv, host, str, port, makeValidator, num} from 'envalid';
dotenv.config({path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`)});
const fileSystem = makeValidator((value) =>{
  if (value.startsWith('./')&& value.endsWith('/')) {
    return value;
  } else {
    throw new Error('Invalid File storage');
  }
});
const env = cleanEnv(process.env, {
  NODE_ENV: str({choices: ['production', 'development', 'test']}),
  DB_TYPE: str(),
  DB_HOSTNAME: host(),
  DB_PORT: port(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_DATABASE: str(),
  PORT: port(),
  ORM_DB_NAME: str(),
  FILE_SYSTEM: fileSystem(),
  FILE_SIZE: num(),
  FILE_EXTENSION_ALLOWED: str(),
});

export const dbType : any = env.DB_TYPE;
export const dbHostName : string = env.DB_HOSTNAME;
export const dbport : number = env.DB_PORT;
export const dbUser : string = env.DB_USER;
export const dbPassword : string = env.DB_PASSWORD;
export const dbDatabase : string = env.DB_DATABASE;
export const portNumber : number = env.PORT;
export const ormDBName : string = env.ORM_DB_NAME;
export const environment : string = env.NODE_ENV;
export const fileStorage : string= env.FILE_SYSTEM;
export const fileSize : number = env.FILE_SIZE;
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
export const httpBadRequestCode : number = constant.HTTP_ERROR_CODE_BAD_REQUEST;
export const passwordHashKey:any=Number(process.env.PASSWORD_HASH_KEY);
export const pinHashKey:any = Number(process.env.PIN_HASH_KEY);
export const fileExtensionAllowed : String[] =
    env.FILE_EXTENSION_ALLOWED.split(',')
        .map((extension) => extension.trim());
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
export const jwtSecretKey: string|undefined = process.env.JWT_SECRET_KEY;
export const missingAuthenticationToken: string =
    constant.HTTP_ERROR_MESSAGE_MISSING_AUTH_TOKEN;
export const unauthorizedClient : number =
    constant.HTTP_ERROR_CODE_UNAUTHORIZED_CLIENT;
export const unauthorizedClientMessage : string =
    constant.HTTP_ERROR_MESSAGE_UNAUTHORIZED_CLIENT;
export const forbidden: number = constant.HTTP_ERROR_CODE_FORBIDDEN;
export const invalidPageOrSize:string = constant.HTTP_INVALID_PAGE_OR_SIZE;
export const fileSizeExceeded: string = constant.HTTP_FILE_SIZE_EXCEEDED;
export const invalidFileType:string =
    constant.HTTP_ERROR_MESSAGE_INVALID_FILE_TYPE;
export const payLoadTooLargeCode : number =
    constant.HTTP_ERROR_CODE_PAY_LOAD_TOO_LARGE;
export const unsupportedMediaTypeCode : number =
    constant.HTTP_ERROR_CODE_UNSUPPORTED_MEDIA_TYPE;
export const invalidInputMessage : string =
    constant.HTTTP_ERROR_MESSAGE_INVAILD_INPUT;

