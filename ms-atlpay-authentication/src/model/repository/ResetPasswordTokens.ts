import moment from 'moment';
import {EntityManager} from 'typeorm';
import {dateTimeFormat} from '../../../config/bootstrap';
import {AdminAuthentication} from '../entity/AdminAuthentication';
import {ResetPasswordToken} from '../entity/ResetPasswordToken';
import {UserAuthentication} from '../entity/UserAuthentication';
import {AppRepository, RepositoryParameter} from './AppRepository';

/**
 * ResetPasswordTokens Repository
 */
export class ResetPasswordTokens extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * isTokenValid method
   * @param{string} token
   */
  public async isTokenValid(token: string): Promise<boolean> {
    try {
      const resetPasswordTokenDetail: ResetPasswordToken | undefined =
        await this.connection
            .getRepository(ResetPasswordToken)
            .createQueryBuilder('resetPasswordToken')
            .where('resetPasswordToken.token = :token', {token: token})
            .getOne();

      if (!resetPasswordTokenDetail) {
        return false;
      }
      if (resetPasswordTokenDetail?.isValidToken !== false) {
        const tokenExpireTime:any =
        moment(resetPasswordTokenDetail?.tokenExpireTime)
            .format(dateTimeFormat);
        const currentTime:any = moment().format(dateTimeFormat);
        if (moment(tokenExpireTime).isAfter(moment(currentTime))) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err: any) {
      return false;
    }
  }

  /**
   * get Id From Token method
   * @param{string} token
   */
  public async getIdFromToken(token: string): Promise<string> {
    const manager: EntityManager = this.connection.manager;
    const userAuthenticationDetail: UserAuthentication[] =
      await manager.query(`
    SELECT "user_authentication_id"
    FROM reset_password_tokens where token = $1`, [token],
      );
    const userId: string =
      // @ts-ignore
      userAuthenticationDetail[0].user_authentication_id;
    return userId;
  }

  /**
   * get Admin Id From Token method
   * @param{string} token
   */
  public async getAdminIdFromToken(token: string): Promise<string> {
    const manager: EntityManager = this.connection.manager;
    const adminAuthenticationDetail: AdminAuthentication[] =
      await manager.query(`
    SELECT "admin_authentication_id"
    FROM reset_password_tokens where token = $1`, [token],
      );
    const adminId: string =
      // @ts-ignore
      adminAuthenticationDetail[0].admin_authentication_id;

    return adminId;
  }
}
