import {AppRepository, RepositoryParameter}
  from './AppRepository';

/**
 * UserDevices class
 * @extends{AppRepository}
 * @class
 */
export class UserDevices extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
