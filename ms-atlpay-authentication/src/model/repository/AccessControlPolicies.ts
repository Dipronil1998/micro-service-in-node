import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Repository for Access Control Policies
 * @class{AccessControlPolicies}
 * @extends{AppRepository}
 */
export class AccessControlPolicies extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
