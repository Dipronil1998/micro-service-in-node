import {AppRepository, RepositoryParameter}
  from './AppRepository';

/**
 * UserAccountRequests class
 * @extends{AppRepository}
 * @class
 */
export class UserAccountRequests extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
