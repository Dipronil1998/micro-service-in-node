import moment from 'moment';
import {Connection, getConnection, IsNull, Not} from 'typeorm';
import {ormDBName} from '../../config/bootstrap';
import {AdminAuthentication} from '../model/entity/AdminAuthentication';
import {logger} from '../utils/logger';
/**
 * Scheduler to unblock Admin after block until
 * @class AdminStatusUpdateScheduler
 */
export class AdminStatusUpdateScheduler {
  /**
   * Unblock Admin after block until
   */
  public UnblockAdminAfterBlockUntilDate = async (): Promise<void>=>{
    try {
      const dbConnection : Connection = getConnection(ormDBName);
      const blockedAdmins : AdminAuthentication[] = await dbConnection
          .getRepository(AdminAuthentication)
          .find({where: {'_blockUntil': Not(IsNull()),
            '_accountStatus': 'BLOCK'}});
      const today : moment.Moment = moment(moment().format('YYYY-MM-DD'));
      const unblockAdmins: AdminAuthentication[] = blockedAdmins
          .filter((admin: AdminAuthentication)=>{
            return moment(moment(admin.blockUntil)
                .format('YYYY-MM-DD'))
                .isBefore(today);
          });
      unblockAdmins.forEach(async (admin: AdminAuthentication)=>{
        admin.allowLogin=true;
        // @ts-ignore
        admin.blockUntil=null;
        admin.accountStatus = 'LIVE';
        await dbConnection.getRepository(AdminAuthentication).save(admin);
      });
      logger
          .info('Unblock admin schedule executed on '+
            today.format('YYYY-MM-DD'));
    } catch (error: any) {
      logger
          .error('Unblock admin schedule failed on ' +
            moment().format('YYYY-MM-DD'));
    }
  };
}
