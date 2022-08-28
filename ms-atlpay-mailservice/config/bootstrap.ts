import dotenv from 'dotenv';
import path from 'path';
import * as constant from './constant';
import * as envalid from 'envalid';
dotenv.config({path: path
    .join(__dirname, `./.env.${process.env.NODE_ENV}`)});
const env = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str({choices:
        ['production', 'development', 'test', 'local']}),
  DB_TYPE: envalid.str(),
  DB_HOSTNAME: envalid.host(),
  DB_PORT: envalid.port(),
  DB_USER: envalid.str(),
  DB_PASSWORD: envalid.str(),
  DB_DATABASE: envalid.str(),
  PORT: envalid.port(),
  ORM_DB_NAME: envalid.str(),
  MAIL_HOST: envalid.host(),
  MAIL_PORT: envalid.port(),
  MAIL_AUTH_USER: envalid.str(),
  MAIL_AUTH_PASS: envalid.str(),
});
export const dbType : any = env.DB_TYPE;
export const dbHostName : string = env.DB_HOSTNAME;
export const dbport : number = env.DB_PORT;
export const dbUser : string = env.DB_USER;
export const dbPassword : string = env.DB_PASSWORD;
export const dbDatabase : string = env.DB_DATABASE;
export const port : number = env.PORT;
export const ormDBName : string = env.ORM_DB_NAME;
export const mailHost: string =env.MAIL_HOST;
export const mailPort: number = env.MAIL_PORT;
export const mailAuthUser: string = env.MAIL_AUTH_USER;
export const mailAuthPass: string = env.MAIL_AUTH_PASS;
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
export const httpBadRequestCode : number =
    constant.HTTP_ERROR_CODE_BAD_REQUEST;
export const mailSentSuccessfullyMessage: string =
    constant.HTTP_SUCCESS_MAIL_SENT;
export const invalidInputMessage : string =
    constant.HTTTP_ERROR_MESSAGE_INVAILD_INPUT;
