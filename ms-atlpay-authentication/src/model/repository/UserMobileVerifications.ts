import {AppRepository, RepositoryParameter} from './AppRepository';

/**
 * UserMobileVerifications class
 * @extends{AppRepository}
 * @class
 */
export class UserMobileVerifications extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
