import {NextFunction, Request, Response} from 'express-serve-static-core';
import {getConnection, UpdateResult} from 'typeorm';
import {
  httpAppCredentialsNotPresent,
  httpDataNotFound,
  httpInvalidAppCredential,
  httpSuccessDataUpdate, ormDBName, tokenVerfied,
} from '../../config/bootstrap';
import {AppKeyNotPresentException}
  from '../exception/AppKeyNotPresentException';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidAppCredentialException} from
  '../exception/InvalidAppCredentialException';
import {Platform} from '../model/entity/Platform';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {Platforms} from '../model/repository/Platforms';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
/**
 * Platform controller
 * @class
 * @extends{AppController}
 */
export class PlatfromController extends AppController {
  private _dataBaseName: any;
  /**
     * Constructor Method.
     * @constructor
     */
  constructor() {
    super('Platform Controller');
    this._dataBaseName = ormDBName;
  }
  /**
     * Get Platform list
     * @param{Request} request - Request
     * @param{Response} response - Response
     * @param{NextFunction} next - Next Function
     */
  public find = async (request: Request,
      response: Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const platformParameter: RepositoryParameter = new RepositoryParameter(
          'Platform',
          Platform,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const platformRepo: Platforms = new Platforms(platformParameter);
      let platformList: Platform[] = await platformRepo.find();
      if (platformList.length !== 0) {
        response.setHeader('Content-Type', 'application/json');
        platformList = platformRepo.toJson(platformList);
        new ResponseService().sendSuccessResponse(response, platformList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error) {
      next(error);
    }
  };

  /**
     * Find Platfrom by Code
     * @param{Request} req - Request
     * @param{Response} res - Response
     * @param{NextFunction} next - next function
     */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const platformParameter: RepositoryParameter = new RepositoryParameter(
          'Platform',
          Platform,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const code: string = req.params.code;
      const platformRepo: Platforms = new Platforms(platformParameter);
      platformRepo.initializeAssociations();
      let platform: any[] = await platformRepo.getOnCondition({_code: code});
      if (platform) {
        res.setHeader('Content-Type', 'application/json');
        platform = platformRepo.toJson(platform);
        new ResponseService().sendSuccessResponse(res, platform);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Platform Token validate controller
   * @param{Request} request - Request
   * @param{Response} response - Response
   * @param{NextFunction} next - Next Function
   */
  public authVerifySecretToken = async (request: Request, response: Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const isValidPlatform: boolean =
      await this.verifyPlatformSecretKeyToken(request, response);
      if (isValidPlatform=== true) {
        new ResponseService().sendSuccessResponse(response, tokenVerfied);
      } else {
        throw isValidPlatform;
      }
    } catch (err:any) {
      next(err);
    }
  };

  /**
   * Verify platform secret key and token
   * @param{Request} request
   * @param{Response} response
   * @return{Promise<boolean>}
   */
  public verifyPlatformSecretKeyToken = async (
      request: Request, response: Response,
  ) : Promise<boolean> =>{
    this._request = request;
    this._response = response;
    try {
      const platformParameter: RepositoryParameter = new RepositoryParameter(
          'Platform',
          Platform,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const platformRepo: Platforms = new Platforms(platformParameter);
      platformRepo.initializeAssociations();
      const headerData: any = JSON.parse(JSON.stringify(request.headers));
      const authTokenId: string = headerData.app_token_id;
      const authSecretId: string = headerData.app_secret_id;
      if (!authTokenId || !authSecretId) {
        throw new AppKeyNotPresentException(httpAppCredentialsNotPresent);
      } else {
        const isPlatformExsist:boolean = await platformRepo.exists(
            {_appTokenId: authTokenId, _appSecretId: authSecretId});
        if (isPlatformExsist) {
          return true;
        } else {
          throw new InvalidAppCredentialException(httpInvalidAppCredential);
        }
      }
    } catch (error: any) {
      return error;
    }
  };
  /**
     * Enable a Platform by Id
     * @param{Request} request - Request
     * @param{Response} response - Response
     * @param{NextFunction} next - Next Function
     */
  public enable = async (request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      await this.changeAvailabilityStatus(request, response, true);
    } catch (error) {
      next(error);
    }
  };
  /**
    * Disable a Platform by Id
    * @param{Request} request - Request
    * @param{Response} response - Response
    * @param{NextFunction} next - Next Function
    */
  public disable = async (request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      await this.changeAvailabilityStatus(request, response, false);
    } catch (error) {
      next(error);
    }
  };
  /**
   * Change Status of Platform
   * @param{Request} request
   * @param{Response} response
   * @param{boolean} status
   */
  private changeAvailabilityStatus = async (request: Request,
      response: Response,
      status: boolean) => {
    this._request = request;
    this._response = response;
    try {
      const platformParameter: RepositoryParameter = new RepositoryParameter(
          'Platform',
          Platform,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const platformRepo: Platforms =
      new Platforms(platformParameter);
      const code: string = request.params.code;
      const updateResult: UpdateResult = await
      platformRepo.updateAll({_isEnable: status}, {_code: code});
      if (updateResult.affected !== 0) {
        new ResponseService().sendSuccessResponse(
            response, httpSuccessDataUpdate);
      } else {
        throw new DataNotFoundException('Invalid Platform');
      }
    } catch (error) {
      throw error;
    }
  };
}
