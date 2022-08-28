import {AppRepository} from './AppRepository';
import * as bcrypt from 'bcrypt';
import {invalidInputMessage, passwordHashKey} from '../../../config/bootstrap';
import {AccessRole} from '../entity/AccessRole';
import {AdminAuthentication} from '../entity/AdminAuthentication';
import {InvalidInputException} from '../../exception/InvalidInputException';
/**
 * Admin authentication repository class
 * @class{AdminAuthentications}
 * @exports{AppRepository}
 */
export class AdminAuthentications extends AppRepository {
  /**
     * Corresponding bcryptPassword function
     * @param{string} password
     * @return{Promise<string>}
     */
  public async bcryptPassword(password: string): Promise<string> {
    const bcryptedPassword: string =
            await bcrypt.hash(password, passwordHashKey);
    return bcryptedPassword;
  }
  /**
     * Compare Password
     * @param{string} password
     * @param{string} storePassword
     * @return{Promise<boolean>}
     */
  public async comparePassword(password: string, storePassword: string)
        : Promise<boolean> {
    const isValid: boolean = await bcrypt.compare(password, storePassword);
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }
  /**
      * get Administrator Access Role data
      * @return{Promise<AccessRole|undefined>}
      */
  public async getAdministratorAccessRole(): Promise<AccessRole | undefined> {
    const administratorAccessRole: AccessRole | undefined =
            await this.connection
                .getRepository(AccessRole)
                .createQueryBuilder('accessRole')
                .where('accessRole.title = :title', {title: 'Administrator'})
                .getOne();

    return administratorAccessRole;
  }
  /**
   * Get admin based in status condition
   * @param{string} status
   * @return{Promise<Array<AdminAuthentication>>}
   */
  public async findbasedOnstatus(status: string):
  Promise<Array<AdminAuthentication>> {
    if (status==='LIVE') {
      return await this.findOnCondition({_accountStatus: 'LIVE'});
    } else if (status==='BLOCK') {
      return await this.findOnCondition({_accountStatus: 'BLOCK'});
    } else if (status==='SUSPENDED') {
      return await this.findOnCondition({_accountStatus: 'SUSPENDED'});
    } else if (status==='ALL') {
      return await this.findOnCondition([{_accountStatus: 'LIVE'},
        {_accountStatus: 'BLOCK'}, {_accountStatus: 'SUSPENDED'}]);
    } else {
      throw new InvalidInputException(invalidInputMessage);
    }
  }
}
