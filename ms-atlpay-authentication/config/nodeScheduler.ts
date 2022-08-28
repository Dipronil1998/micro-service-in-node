import cron from 'node-cron';
import {AdminStatusUpdateScheduler}
  from '../src/scheduler/AdminStatusUpdateScheduler';
/**
 * Node scheduler
 */
class NodeScheduler {
  /**
   * Schedule Jobs
   */
  public schedule() {
    cron.schedule('0 15 0 * * *',
        new AdminStatusUpdateScheduler().UnblockAdminAfterBlockUntilDate);
  }
}
export const nodeScheduler: NodeScheduler = new NodeScheduler();
