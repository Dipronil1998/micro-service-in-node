import {UserLoginLog} from '../entity/UserLoginLog';
import {AppRepository, RepositoryParameter}
  from './AppRepository';
/**
 * UserLoginLogs
 * @extends{AppRepository}
 * @class
 */
export class UserLoginLogs extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * get UserLoginLog By Email
   * @param{string} email
   * @return{Promise}
   */
  public async getUserLoginLogByEmail(email:string):Promise<any> {
    const user:UserLoginLog[] =await this.find();
    const users=user.filter((user)=>{
      return user.userAuthentication.email==email;
    });
    return users;
  }

  /**
   * get UserLoginLog By Id
   * @param{string} id
   * @return{Promise}
   */
  public async getUserLoginLogById(id:string):Promise<any> {
    const user:UserLoginLog[] =await this.find();
    const users=user.filter((user)=>{
      return user.userAuthentication.id==id;
    });
    return users;
  }
}
