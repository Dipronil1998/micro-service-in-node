import {AppRepository, RepositoryParameter} from './AppRepository';
import {ComplianceDocumentCategory} from '../entity/ComplianceDocumentCategory';
/**
 * Compliance Document Category Repository
 */
export class ComplianceDocumentCategories extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Sort Display Order
   * @return{Promise<ComplianceDocumentCategory[]>}
   */
  public async sortByDisplayOrder(): Promise<ComplianceDocumentCategory[]> {
    const sortDisplayOrder: ComplianceDocumentCategory[] =
      await this.connection
          .getRepository(ComplianceDocumentCategory)
          .createQueryBuilder('complianceDocumentCategory')
          .orderBy('complianceDocumentCategory.display_order', 'ASC')
          .getMany();

    return sortDisplayOrder;
  }
}
