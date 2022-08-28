import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Mail Repository class.
 * @class
 */
export class Mails extends AppRepository {
  /**
   * Constructor Method.
   * @constructor
   * @param{RepositoryParameter} repositoryOptions
   */
  constructor(repositoryOptions: RepositoryParameter) {
    super(repositoryOptions);
  }
}
