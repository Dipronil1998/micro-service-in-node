import axios, {AxiosResponse} from 'axios';
import {Request} from 'express';
import {AUTH_BASE_URL} from '../../config/bootstrap';
import {AppService} from './AppService';
/**
 * Authentication service
 * @class{AutheticationService}
 * @extends{AppService}
 */
export class AutheticationService extends AppService {
  /**
     * Constructor Method
     * @constructor
     */
  constructor() {
    super('Authentication service');
  }
  /**
     * Get all Access Roles
     * @param{Request} request
     */
  public getAccessRole = async (request : Request)=>{
    try {
      const appTokenId: any = request.headers?.app_token_id;
      const appSecretId: any = request.headers?.app_secret_id;
      const authenticationHeader: string | undefined =
        request.headers?.authorization;
      let token : string;
      if (authenticationHeader) {
        token = authenticationHeader.split(' ')[1];
      } else {
        token ='';
      }
      const header ={
        app_token_id: appTokenId,
        app_secret_id: appSecretId,
        Authorization: 'Bearer '+token,
      };
      const response : AxiosResponse = await axios
          .get(AUTH_BASE_URL+'/role', {headers: header});
      if (response && !response.data.success) {
        throw Error();
      }
      if (response && response.data.success) {
        const accessRoles = response.data.info;
        return accessRoles;
      } else {
        throw response;
      }
    } catch (error: any) {
      throw error;
    }
  };
}
