import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {Device} from '../model/entity/Device';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {Devices} from '../model/repository/Devices';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';

/**
 * DeviceInfoController
 * @class
 * @extends{AppController}
 */
export class DeviceController extends AppController {
  /**
   * database name
   * @var{any}
   */
  private _dataBaseName: any;

  /**
   * Constructor Method.
   * @constructor
   */
  constructor() {
    super('DeviceInfoController');
    this._dataBaseName = ormDBName;
  }
  /**
 * create Device
 * @param{Request} req - Request
 * @param{Response} res - Response
 * @param{NextFunction} next - next function
 */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const deviceParameter: RepositoryParameter = new RepositoryParameter(
          'device',
          Device,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const deviceRepo: Devices =
        new Devices(deviceParameter);
      deviceRepo.initializeAssociations();
      const device: Device = deviceRepo.newEntity();
      const agentData: any = req.useragent;

      const category: string = agentData.category;
      const os: string = agentData.os;
      const osVersion: string = agentData.os_version;
      const browserType: string = agentData.browser;
      const browserVersion: string = agentData.version;
      const vendor: string = agentData.vendor;
      const client: string = agentData.client;
      const platform: string = agentData.platform;
      const isMobile: boolean = agentData.isMobile;
      const source: string = agentData.source;
      const isBot: string = agentData.isBot;

      device.category = category;
      device.os = os;
      device.osVersion = osVersion;
      device.browserType = browserType;
      device.browserVersion = browserVersion;
      device.vendor = vendor;
      device.client = client;
      device.platform = platform;
      device.isMobile = isMobile;
      device.source = source;
      device.isBot = isBot;
      device.lastUsed = new Date();

      const cookie: any = req.cookies;
      const isCookieEmpty: boolean = Object.keys(cookie).length === 0;
      const cookiefingerPrint: string = cookie['fingerPrint'];
      if (isCookieEmpty ||
        (!cookiefingerPrint) ||
        (cookiefingerPrint &&
          !await deviceRepo.exists(
              {_fingerprint: cookiefingerPrint},
          ))) {
        const newDevice: Device | boolean =
          await deviceRepo.save(device);
        if (newDevice instanceof Device) {
          req.body.device = device;
          res.cookie('fingerPrint',
              newDevice.fingerprint,
              {maxAge: 24 * 60 * 60 * 1000 * 1000});
        } else {
          throw new InvalidInputException('Invalid Input');
        }
      } else {
        req.body.device =
          await deviceRepo.getOnCondition({_fingerprint: cookiefingerPrint});
      }
      next();
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * find data for Device
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const deviceParameter: RepositoryParameter = new RepositoryParameter(
          'device',
          Device,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const deviceRepo: Devices =
        new Devices(deviceParameter);
      deviceRepo.initializeAssociations();
      let deviceList: Device[] = await deviceRepo.find();
      if (deviceList.length !=0) {
        res.setHeader('Content-Type', 'application/json');
        deviceList = deviceRepo.toJson(deviceList);
        new ResponseService().sendSuccessResponse(res, deviceList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get data for Device
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const deviceParameter: RepositoryParameter = new RepositoryParameter(
          'device',
          Device,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const deviceRepo: Devices =
        new Devices(deviceParameter);
      deviceRepo.initializeAssociations();
      const email: string = req.params.email;
      let deviceDetails: Device[] =
        await deviceRepo.getUserDevices(email);
      if (deviceDetails && deviceDetails.length !=0) {
        res.setHeader('Content-Type', 'application/json');
        deviceDetails = deviceRepo.toJson(deviceDetails);
        new ResponseService().sendSuccessResponse(res, deviceDetails);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
