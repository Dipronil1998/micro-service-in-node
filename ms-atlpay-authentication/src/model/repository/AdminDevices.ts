import {AppRepository, RepositoryParameter}
  from './AppRepository';

/**
 * AdminDevices class
 * @extends{AppRepository}
 * @class
 */
export class AdminDevices extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
