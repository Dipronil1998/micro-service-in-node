import {Connection, getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {AccessRole} from './../../src/model/entity/AccessRole';
/**
 * Access Role Seed
 * @class
 */
export class AccessRoleSeed {
  /**
   * Execute Seed.
   */
  public async run() {
    const connection: Connection = getConnection(ormDBName);
    const isSuperUserPresent : number = await connection
        .getRepository(AccessRole)
        .count(
            {where: {_title: 'Super Administrator'}});
    if (isSuperUserPresent===0) {
      let superAdminRole : AccessRole = new AccessRole();
      superAdminRole.title = 'Super Administrator';
      superAdminRole.description = `This is very special access 
        role and it should be only used for system administration. 
        Anyone having this role will have full privileges.`;
      superAdminRole.isSuperRole = true;
      superAdminRole.isSystemRole = true;
      superAdminRole.isDisabled = false;
      superAdminRole.isEditable = false;
      superAdminRole = await connection.manager.save(superAdminRole);
      const systemDaemonRole : AccessRole = new AccessRole();
      systemDaemonRole.title = 'System Daemon';
      systemDaemonRole.isSuperRole = false;
      systemDaemonRole.isSystemRole = true;
      systemDaemonRole.isDisabled = false;
      systemDaemonRole.isEditable = false;
      systemDaemonRole.parent = superAdminRole;
      const administratorRole : AccessRole = new AccessRole();
      administratorRole.title = 'Administrator';
      administratorRole.description = `This role has access 
        to the administrative capabilities.`;
      administratorRole.isSuperRole = false;
      administratorRole.isSystemRole = true;
      administratorRole.isDisabled = false;
      administratorRole.isEditable = true;
      administratorRole.parent = superAdminRole;
      const userRole : AccessRole = new AccessRole();
      userRole.title = 'Merchant';
      userRole.description = 'This role has access to the user capabilities.';
      userRole.isSuperRole =false;
      userRole.isSystemRole = false;
      userRole.isDisabled = false;
      userRole.isEditable = true;
      userRole.parent = superAdminRole;
      await connection.manager.save(administratorRole);
      await connection.manager.save(userRole);
    }
  }
}
