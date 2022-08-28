import {EntityManager} from 'typeorm/entity-manager/EntityManager';
import {Device} from '../entity/Device';
import {AppRepository, RepositoryParameter}
  from './AppRepository';

/**
 * Devices class
 * @extends{AppRepository}
 * @class
 */
export class Devices extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
  /**
   * get UserDevice data
   * @param{string} email
   * @return{Promise}
   */
  public async getUserDevices(email:string):Promise<Device[]> {
    const manager: EntityManager = this.connection.manager;
    const userDevices: Device[] = await (manager.query(`
    SELECT * from devices where id in(
    SELECT user_devices."device_id" from user_devices where 
        user_devices."user_authentication_id" in (
    SELECT id from user_authentications where email = $1))`, [email]));
    return userDevices;
  }
}
