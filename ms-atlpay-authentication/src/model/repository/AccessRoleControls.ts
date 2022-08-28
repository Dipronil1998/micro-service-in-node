import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Repository for Access Role Controls
 * @class{AccessRoleControls}
 * @extends{AppRepository}
 */
export class AccessRoleControls extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
