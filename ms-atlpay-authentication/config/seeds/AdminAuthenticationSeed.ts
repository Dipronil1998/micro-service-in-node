import {ormDBName, passwordHashKey} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {AccessRole} from '../../src/model/entity/AccessRole';
import {AdminAuthentication} from
  './../../src/model/entity/AdminAuthentication';
import {getConnection} from 'typeorm';
import {AdminAuthentications} from
  './../../src/model/repository/AdminAuthentications';
import * as bcrypt from 'bcrypt';
/**
 * Admin authentication Seed
 * @class{AdminAuthenticationSeed}
 */
export class AdminAuthenticationSeed {
  /**
      * Run Method.
      * Write your database seeder using this method.
      * @return{void}
      */
  public async run(): Promise<void> {
    const dbName: string = ormDBName;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'authentication',
          AdminAuthentication,
          dbName,
          'none',
          getConnection(dbName),
      );
      const authRepository: AdminAuthentications =
        new AdminAuthentications(authParameter);
      const adminAuthenticationEntity: AdminAuthentication =
        authRepository.newEntity();
      adminAuthenticationEntity.allowLogin = true;
      adminAuthenticationEntity.firstName = 'super';
      adminAuthenticationEntity.lastName = 'admin';
      adminAuthenticationEntity.email = 'arnab@agpaytech.co.uk';
      adminAuthenticationEntity.password =
        await bcrypt.hash('Admin@123', passwordHashKey);
      adminAuthenticationEntity.accountStatus = 'LIVE';
      const accressRole =
        await authParameter.connection.getRepository(AccessRole)
            .findOne({where: {_title: 'Super Administrator'}});
      if (accressRole) {
        adminAuthenticationEntity.accessRole = accressRole;
      }
      const isAdminExists: boolean =
                await authRepository.exists({_email: 'arnab@agpaytech.co.uk'});
      if (isAdminExists === false) {
        await authRepository.save(adminAuthenticationEntity);
      }

      console.log('Admin Authentication Seed Inserted');
    } catch (error: any) {
      console.log(error);
    }
  }
}
