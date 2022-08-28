import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Continents class
 * @class
 * @extends{AppRepository}
 */
export class Continents extends AppRepository {
  /**
   * Initializes a new instance
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
