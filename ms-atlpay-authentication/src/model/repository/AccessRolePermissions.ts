import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Repository for Access Role Permissions
 * @class{AccessRolePermissions}
 * @extends{AppRepository}
 */
export class AccessRolePermissions extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
