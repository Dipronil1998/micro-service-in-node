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
  IP_DATA_API_KEY: envalid.str(),
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
export const httpSuccessDataCreate : string =
    constant.HTTP_SUCCESS_MESSAGE_DATA_CREATE;
export const httpSuccessDataDelete : string =
    constant.HTTP_SUCCESS_MESSAGE_DATA_DELETE;
export const httpSuccessDataUpdate : string =
    constant.HTTP_SUCCESS_MESSAGE_DATA_UPDATE;
export const httpBadRequestCode : number =
    constant.HTTP_ERROR_CODE_BAD_REQUEST;
export const invalidInputMessage : string =
    constant.HTTTP_ERROR_MESSAGE_INVAILD_INPUT;
export const locationNotFound :string = constant.HTTP_LOCATION_NOT_FOUND;
export const ipDataApiKey: string = env.IP_DATA_API_KEY;
export const ipDataApiUrl:string = constant.IP_DATA_API_URL;
