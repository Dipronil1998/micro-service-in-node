import {AppRepository, RepositoryParameter} from './AppRepository';
import {DocumentRejectReason} from '../entity/DocumentRejectReason';
/**
 * Document Reject Reasons Repository
 */
export class DocumentRejectReasons extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Sort Display Order
   * @return{Promise<DocumentRejectReason[]>}
   */
  public async sortByDisplayOrder(): Promise<DocumentRejectReason[]> {
    const sortDisplayOrder: DocumentRejectReason[] =
      await this.connection
          .getRepository(DocumentRejectReason)
          .createQueryBuilder('documentRejectReason')
          .orderBy('documentRejectReason.display_order', 'ASC')
          .getMany();

    return sortDisplayOrder;
  }
}
