import axios, {AxiosResponse} from 'axios';
import {Request} from 'express';
import {AUTH_MASTER_URL, generalServerErrorMessage, httpDataNotFound} from
  '../../config/bootstrap';
import {BaseException} from '../exception/BaseException';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {AppService} from './AppService';

/**
 * Master service
 * @class{MasterService}
 * @extends{AppService}
 */
export class MasterService extends AppService {
  /**
   * Constructor Method
   */
  constructor() {
    super('Master service');
  }

  /**
   * Get Currency By ISO
   * @param{Request} request
   * @param{string} currencyIso
   */
  public getCurrency = async (request: Request, currencyIso: string) => {
    try {
      const appTokenId: any = request.headers?.app_token_id;
      const appSecretId: any = request.headers?.app_secret_id;
      const authenticationHeader: string | undefined =
                request.headers?.authorization;
      let token: string;
      if (authenticationHeader) {
        token = authenticationHeader.split(' ')[1];
      } else {
        token = '';
      }
      const header = {
        app_token_id: appTokenId,
        app_secret_id: appSecretId,
        Authorization: 'Bearer ' + token,
      };
      const response: AxiosResponse = await axios
          .get(AUTH_MASTER_URL + '/currency/' + currencyIso, {headers: header});
      if (response && !response.data.success) {
        throw Error();
      }
      if (response && response.data.success) {
        const currencyInfo = response.data.info;
        return currencyInfo;
      } else {
        throw response;
      }
    } catch (error: any) {
      const errorStatus: number = error.response.status;
      if (errorStatus === 404) {
        throw new DataNotFoundException(httpDataNotFound);
      } else {
        throw new BaseException(generalServerErrorMessage);
      }
    }
  };
}
