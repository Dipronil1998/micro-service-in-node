import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * currencies class
 * @class
 */
export class Currencies extends AppRepository {
  /**
   * Initializes a new instance
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
