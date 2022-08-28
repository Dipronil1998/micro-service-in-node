import dotenv from 'dotenv';
import path from 'path';
import * as constant from './constant';
import * as envalid from 'envalid';
dotenv.config({path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`)});
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
  JWT_SECRET_KEY: envalid.str(),
  PASSWORD_HASH_KEY: envalid.num(),
  PIN_HASH_KEY: envalid.num(),
  TOKEN_EXPIRE_TIME_IN_MINUTES: envalid.num(),
  IP_DATA_API_KEY: envalid.str(),
  OTP_LENGTH: envalid.num(),
  TWO_FACTOR_AUTH: envalid.str({choices: ['email', 'google']}),
  MAIL_HOST: envalid.host(),
  MAIL_PORT: envalid.port(),
  MAIL_AUTH_USER: envalid.str(),
  MAIL_AUTH_PASS: envalid.str(),
  OTP_EXPIRE_TIME_IN_MINUTES: envalid.num(),
  FORGET_PASSWORD_URL: envalid.url(),
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
export const passwordHashKey:number = env.PASSWORD_HASH_KEY;
export const pinHashKey:number = env.PIN_HASH_KEY;
export const expireTokenTimeInMinutes: number =
    env.TOKEN_EXPIRE_TIME_IN_MINUTES;
export const ipDataApiKey: string =
    env.IP_DATA_API_KEY;
export const FORGET_PASSWORD_URL:string = env.FORGET_PASSWORD_URL;
export const twoFactorAuthenticationMethod : string = env.TWO_FACTOR_AUTH;
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
export const httpLoggedOutSucessfully : string =
    constant.HTTP_SUCCESS_MESSAGE_LOGGED_OUT_SUCESSFULLY;
export const httpBadRequestCode : number = constant.HTTP_ERROR_CODE_BAD_REQUEST;

export const httpEmailAlreadyExsits : string =
    constant.HTTP_ERROR_EMAIL_ALREADY_EXSISTS;
export const userDataNotFound : string =
    constant.HTTP_ERROR_USER_NOT_FOUND;
export const incorrectPassword:string=constant.HTTP_ERROR_INCORRECT_PASSWORD;
export const userBlockAccount:string=constant.HTTP_ERROR_BLOCK_ACCOUNT;
export const userCreated:string = constant.HTTP_SUCCESS_MESSAGE_USER_CREATED;
export const adminAdded:string = constant
    .HTTP_SUCCESS_MESSAGE_ADMIN_ADDED_SUCESSFULLY;
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
// export const forbidden: number = constant.HTTP_ERROR_CODE_FORBIDDEN;
export const invalidInputMessage : string =
    constant.HTTP_ERROR_MESSAGE_INVAILD_INPUT;
export const tokenVerfied : string= constant.HTTP_SUCCESS_MESSAGE_VALID_TOKEN;
export const emailAndRecoveryEmailMatchError : string = constant
    .HTTP_ERROR_SAME_EMAIL_AND_RECOVERY_EMAIL;
export const currentAndNewPasswordMatchError : string =
    constant.HTTP_ERROR_SAME_CURRENT_AND_NEW_PASSWORD;
export const oldPasswordChosen : string =
    constant.HTTP_ERROR_OLD_PASSWORD_CHOSEN;
export const passwordUpdatedSucessfully : string =
    constant.HTTP_SUCCESS_PASSWORD_UPDATED;
export const emailSendedSucessfully : string =
    constant.HTTP_SUCESS_MESSAGE_EMAIL_SENT;
export const resetPasswordLinkExpired : string =
    constant.HTTP_RESET_LINK_EXPIRE;
export const emailAvailable : string = constant.HTTP_SUCCESS_EMAIL_AVAILABLE;
export const userNameAvailable : string =
    constant.HTTP_SUCCESS_USERNAME_AVAILABLE;
export const httpUserNameAlreadyExsits : string =
    constant.HTTP_ERROR_USERNAME_ALREADY_EXSISTS;
export const locationNotFound :string = constant.HTTP_LOCATION_NOT_FOUND;
export const twofaOtpSentmessage : string =
    constant.HTTP_SUCCESS_MESSAGE_OTP_SENT;
export const mailHost: string = env.MAIL_HOST;
export const mailPort: number = env.MAIL_PORT;
export const mailAuthUser: string = env.MAIL_AUTH_USER;
export const mailAuthPass: string = env.MAIL_AUTH_PASS;
export const otpLength : number = env.OTP_LENGTH;
export const invalidOTP : string = constant.HTTP_ERROR_MESSAGE_INVALID_OTP;
export const otpExpire: number = env.OTP_EXPIRE_TIME_IN_MINUTES;
export const ipDataApiUrl:string = constant.IP_DATA_BASE_API_URL;
export const userSuspendAccount:string=constant.HTTP_ERROR_SUSPEND_ACCOUNT;
export const suspendAccountSuccessfully: string =
    constant.HTTP_SUCCESS_SUSPEND_ACCOUNT;
export const adminNoteAdded: string =
    constant.HTTP_SUCCESS_MESSAGE_ADMIN_NOTE_ADDED;
export const downloadGoogleAuthenticator: string =
    constant.HTTP_SUCCESS_DOWNLOAD_GOOGLE_AUTHENTICATOR;
export const enterGoogleAuthenticator: string =
    constant.HTTP_SUCCESS_ENTER_GOOGLE_AUTHENTICATOR;
export const dateTimeFormat: string = constant.DATE_TIME_FORMAT;
export const resetPasswordTokenLength : number =
    constant.RESET_PASSWORD_TOKEN_LENGTH;
