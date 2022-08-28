import {TwoFactorAuth} from '../entity/TwoFactorAuth';
import {AppRepository, RepositoryParameter}
  from './AppRepository';

/**
 * TwoFactorAuths class
 * @extends{AppRepository}
 * @class
 */
export class TwoFactorAuths extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
  /**
   * Get previous google otp by admin login log
   * @param{string} id
   * @return{Promise<boolean|string>}
   */
  public getPreviousGoogleAuthOTPByAdminLoginLogId= async (id: string)
    : Promise<boolean|string>=>{
    const twofa: TwoFactorAuth[] = await this
        .connection
        .getRepository(TwoFactorAuth)
        .createQueryBuilder('twofa')
        .where('admin_login_log_id=:id ', {id: id})
        .andWhere('type= :type', {type: 'google'}).getMany();
    if (twofa.length ===0) {
      return false;
    } else {
      return twofa[0].otp;
    }
  };
}
