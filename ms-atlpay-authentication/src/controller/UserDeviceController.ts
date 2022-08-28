import {Request, Response} from 'express';
import {NextFunction} from 'express-serve-static-core';
import {ormDBName} from '../../config/bootstrap';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {UserDevice} from './../model/entity/UserDevice';
import {getConnection} from 'typeorm';
import {UserDevices} from '../model/repository/UserDevices';
/**
 * User Devices Controller
 * @class
 * @extends{AppController}
 */
export class UserDeviceController extends AppController {
  /**
     * Database name
     * @var{any}
     */
  private _dataBaseName : any;
  /**
     * Constructor Method.
     * @constructor
     */
  constructor() {
    super('User Device Controller');
    this._dataBaseName = ormDBName;
  }
  /**
     * Create user devices
     * @param{Request} request Request
     * @param{Response} response Response
     * @param{NextFunction} next Next Function
     */
  public create =
    async (request: Request, response: Response, next : NextFunction)=>{
      this._request = request;
      this._response = response;
      try {
        const userDeviceParameter: RepositoryParameter =
          new RepositoryParameter(
              'User Device',
              UserDevice,
              this._dataBaseName,
              'none',
              getConnection(this._dataBaseName),
          );
        const userDeviceRepo: UserDevices =
            new UserDevices(userDeviceParameter);
        const device = request.body.device;
        const userAuthentication = request.body.user_authentication;
        const userDevice: UserDevice| boolean =
        await userDeviceRepo.getOnCondition(
            {_userAuthentication: userAuthentication,
              _device: device},
        );
        if (!(userDevice instanceof UserDevice)) {
          const userDevice : UserDevice = new UserDevice();
          userDevice.userAuthentication = userAuthentication;
          userDevice.device = device;
          userDevice.lastUsed = new Date();
          await userDeviceRepo.save(userDevice);
        } else {
          userDevice.lastUsed = new Date();
          await userDeviceRepo.save(userDevice);
        }
        next();
      } catch (error: any) {
        next(error);
      }
    };
}
