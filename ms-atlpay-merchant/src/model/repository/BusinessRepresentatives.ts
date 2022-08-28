import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * BusinessRepresentatives Repository
 */
export class BusinessRepresentatives extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
