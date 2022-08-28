import {AdminLoginLog} from '../entity/AdminLoginLog';
import {AppRepository, RepositoryParameter}
  from './AppRepository';
/**
 * AdminLoginLogs
 * @extends{AppRepository}
 * @class
 */
export class AdminLoginLogs extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Get AdminLogLogin By Email
   * @param{string} email
   * @return{Promise}
   */
  public async AdminLoginLogByEmail(email: string): Promise<any> {
    const admin: AdminLoginLog[] = await this.find();
    const admins = admin.filter((admin) => {
      return admin.adminAuthentication.email == email;
    });
    return admins;
  }
  /**
   * Get AdminLoginlog By admin
   * @param{string} id
   * @return{Promise}
   */
  public async getAdminLoginLogbyAdminId(id: string): Promise<any> {
    const adminLoginlogs: AdminLoginLog[] = await this
        .connection.getRepository(AdminLoginLog)
        .createQueryBuilder('adminloginlog')
        .where('admin_authentication_id =:id', {id: id})
        .getMany();
    return adminLoginlogs;
  }
  /**
   * check Session Expiry Method
   * @param{string} id
   */
  public async checkSessionExpiry(id: string): Promise<boolean> {
    const adminLoginLog:AdminLoginLog|undefined = await this.connection
        .getRepository(AdminLoginLog)
        .createQueryBuilder('adminLoginLog')
        .where('adminLoginLog.id = :id', {id: id})
        .getOne();

    const expiry:Date|undefined = adminLoginLog?.expiry;
    if (expiry) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Check if admin is trying to login for the first time or not
   * @param{string} id
   * @return{Promise<boolean>}
   */
  public isAdminLoginFirstTime= async (id: string) : Promise<boolean> =>{
    try {
      const noOfPreviousLogin: number = await this
          .connection
          .getRepository(AdminLoginLog)
          .createQueryBuilder('adminloginlog')
          .where('admin_authentication_id =:id', {id: id})
          .getCount();
      if (noOfPreviousLogin===0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  };
  /**
   * Get last login info by admin Id
   * @param{string} id
   * @return{Promise<AdminLoginLog|boolean>}
   */
  public getLastLoginLogByAdminId = async (id : string)
    : Promise<AdminLoginLog|boolean> =>{
    try {
      const lastAdminLoginLog: AdminLoginLog[] = await this
          .connection
          .getRepository(AdminLoginLog)
          .createQueryBuilder('adminloginlog')
          .where('admin_authentication_id =:id', {id: id})
          .orderBy('adminloginlog.created_on', 'DESC')
          .limit(1)
          .getMany();
      if (lastAdminLoginLog.length===0) {
        return false;
      }
      return lastAdminLoginLog[0];
    } catch (error) {
      throw error;
    }
  };
}
