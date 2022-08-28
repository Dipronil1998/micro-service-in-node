import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Platform Repository
 */
export class Platforms extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
