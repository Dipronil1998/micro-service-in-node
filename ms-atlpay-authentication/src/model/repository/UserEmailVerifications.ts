import {AppRepository, RepositoryParameter}
  from './AppRepository';

/**
 * UserEmailValidations class
 * @extends{AppRepository}
 * @class
 */
export class UserEmailVerifications extends AppRepository {
  /**
   * @constructor
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
