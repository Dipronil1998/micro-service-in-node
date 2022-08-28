import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Repository for Access Role Control Policies
 * @class{AccessRoleControlPolicies}
 * @extends{AppRepository}
 */
export class AccessRoleControlPolicies extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
