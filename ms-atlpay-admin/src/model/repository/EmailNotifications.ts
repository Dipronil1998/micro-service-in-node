import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Email Notification Repository
 */
export class EmailNotifications extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
