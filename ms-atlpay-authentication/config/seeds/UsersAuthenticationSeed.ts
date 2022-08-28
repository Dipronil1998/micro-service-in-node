import {getConnection} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {UserAuthentication} from '../../src/model/entity/UserAuthentication';
import {ormDBName, passwordHashKey} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {UsersAuthentications}
  from '../../src/model/repository/UsersAuthentications';
import {AccessRole} from '../../src/model/entity/AccessRole';

/**
 * User authentication seed.
 * @class{UsersAuthenticationSeed}
 */
export class UsersAuthenticationSeed {
  /**
   * Run Method.
   * Write your database seeder using this method.
   * @return{void}
   */
  public async run(): Promise<void> {
    try {
      const dbName:any=ormDBName;
      const authParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserAuthentication,
            dbName,
            'none',
            getConnection(dbName),
        );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);
      authRepo.initializeAssociations();
      const userAuthentication: UserAuthentication = authRepo.newEntity();
      userAuthentication.uin = BigInt(90000002);
      userAuthentication.allowLogin= true;
      userAuthentication.firstName = 'Super';
      userAuthentication.middleName = '';
      userAuthentication.lastName = 'User';
      userAuthentication.userName = 'super.user';
      userAuthentication.email = 'som@agpaytech.co.uk';
      userAuthentication.password = await bcrypt
          .hash('Som@123', passwordHashKey);
      userAuthentication.isEditable = false;
      userAuthentication.mobileNo = BigInt(1111111111);
      userAuthentication.isEmailVerified = true;
      userAuthentication.isdCode = 91;
      userAuthentication.isMobileNoVerified = true;
      userAuthentication.twoFactorOtpsActivated = false;
      userAuthentication.accountStatus = 'LIVE';
      const accressRole = await authRepo.connection.getRepository(AccessRole)
          .findOne({where: {_title: 'Merchant'}});
      if (accressRole) {
        userAuthentication.accessRole = accressRole;
      }
      const createUser:boolean=
      await authRepo.exists({_email: 'som@agpaytech.co.uk'});
      if (createUser===false) {
        await authRepo.save(userAuthentication);
      }

      console.log('User Authentication Seed Inserted');
    } catch (error) {
      console.log(error);
    }
  }
}
