import {SelectQueryBuilder} from 'typeorm';
import {AccessRole} from '../entity/AccessRole';
import {AdminAuthentication} from '../entity/AdminAuthentication';
import {UserAuthentication} from '../entity/UserAuthentication';
import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Repository for Access Role
 * @class{AccessRoles}
 * @extends{AppRepository}
 */
export class AccessRoles extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Get All The Merchant Information
   * @return{Promise}
   */
  public async getMerchant():Promise<UserAuthentication[]> {
    const queryBuilder: SelectQueryBuilder<UserAuthentication> =
      this.connection
          .getRepository(UserAuthentication)
          .createQueryBuilder('userAuthentication');

    const merchantRole: UserAuthentication[] = await queryBuilder
        .where(`userAuthentication.access_role_id In` +
        queryBuilder.subQuery()
            .select('accessRole.id')
            .from(AccessRole, 'accessRole')
            .where(`accessRole.title = :title`)
            .getQuery())
        .setParameters({title: 'Merchant'})
        .getMany();
    return merchantRole;
  };

  /**
   * Get All The Admin and Super Admin Information
   * @return{Promise}
   */
  public async getAdmin():Promise<AdminAuthentication[]> {
    const queryBuilder: SelectQueryBuilder<AdminAuthentication> =
      this.connection
          .getRepository(AdminAuthentication)
          .createQueryBuilder('adminAuthentication');

    const adminRole: AdminAuthentication[] = await queryBuilder
        .where(`adminAuthentication.access_role_id In` +
        queryBuilder.subQuery()
            .select('accessRole.id')
            .from(AccessRole, 'accessRole')
            .where(`accessRole.title = :adminTitle`)
            .orWhere(`accessRole.title = :superAdminTitle`)
            .getQuery())
        .setParameters({
          adminTitle: 'Administrator',
          superAdminTitle: 'Super Administrator',
        })
        .getMany();

    return adminRole;
  };
}
