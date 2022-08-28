import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Languages class
 * @class
 * @extends{AppRepository}
 */
export class Languages extends AppRepository {
  /**
   * Initializes a new instance
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
