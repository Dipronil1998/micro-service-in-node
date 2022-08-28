import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Repository for Access Controls
 * @class{AccessControls}
 * @extends{AppRepository}
 */
export class AccessControls extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
