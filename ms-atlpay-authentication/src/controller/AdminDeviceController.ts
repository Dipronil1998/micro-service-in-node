import {Request, Response} from 'express';
import {NextFunction} from 'express-serve-static-core';
import {ormDBName} from '../../config/bootstrap';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {AdminDevice} from './../model/entity/AdminDevice';
import {getConnection} from 'typeorm';
import {AdminDevices} from '../model/repository/AdminDevices';
/**
 * Admin Devices Controller
 * @class
 * @extends{AppController}
 */
export class AdminDeviceController extends AppController {
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
    super('Admin Device Controller');
    this._dataBaseName = ormDBName;
  }
  /**
     * Create Admin devices
     * @param{Request} request Request
     * @param{Response} response Response
     * @param{NextFunction} next Next Function
     */
  public create =
    async (request: Request, response: Response, next : NextFunction)=>{
      this._request = request;
      this._response = response;
      try {
        const adminDeviceParameter: RepositoryParameter =
          new RepositoryParameter(
              'Admin Device',
              AdminDevice,
              this._dataBaseName,
              'none',
              getConnection(this._dataBaseName),
          );
        const adminDeviceRepo: AdminDevices =
            new AdminDevices(adminDeviceParameter);
        const device = request.body.device;
        const userAuthentication = request.body.user_authentication;
        const adminDevice: AdminDevice| boolean =
        await adminDeviceRepo.getOnCondition(
            {_userAuthentication: userAuthentication,
              _device: device},
        );
        if (!(adminDevice instanceof AdminDevice)) {
          const adminDevice : AdminDevice = new AdminDevice();
          adminDevice.adminAuthentication = userAuthentication;
          adminDevice.device = device;
          adminDevice.lastUsed = new Date();
          await adminDeviceRepo.save(adminDevice);
        } else {
          adminDevice.lastUsed = new Date();
          await adminDeviceRepo.save(adminDevice);
        }
        next();
      } catch (error: any) {
        next(error);
      }
    };
}
