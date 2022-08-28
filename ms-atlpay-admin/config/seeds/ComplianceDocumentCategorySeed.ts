import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {ComplianceDocumentCategory}
  from '../../src/model/entity/ComplianceDocumentCategory';
import {ComplianceDocumentCategories}
  from '../../src/model/repository/ComplianceDocumentCategories';

/**
 * Compliance Document Category Seed
 * @class
 */
export class ComplianceDocumentCategorySeed {
  /**
     * Run Method.
     * Write your database seeder using this method.
     * @return{void}
     */
  public async run(): Promise<void> {
    try {
      const dbName: any = ormDBName;
      const ComplianceDocumentCategoryParameter: RepositoryParameter =
          new RepositoryParameter(
              'ComplianceDocumentCategory',
              ComplianceDocumentCategory,
              dbName,
              'none',
              getConnection(dbName),
          );
      const complianceDocumentCategoryRepo: ComplianceDocumentCategories =
        new ComplianceDocumentCategories(ComplianceDocumentCategoryParameter);
      complianceDocumentCategoryRepo.initializeAssociations();

      let complianceDocumentCategory: ComplianceDocumentCategory =
        complianceDocumentCategoryRepo.newEntity();
      complianceDocumentCategory.code='POI';
      complianceDocumentCategory.title='Proof of Identity';
      complianceDocumentCategory.displayOrder=1;
      let createComplianceDocumentCategory =
            await complianceDocumentCategoryRepo.exists({_code: 'POI'});
      if (createComplianceDocumentCategory === false) {
        await complianceDocumentCategoryRepo.save(complianceDocumentCategory);
      }

      complianceDocumentCategory=
        complianceDocumentCategoryRepo.newEntity();
      complianceDocumentCategory.code='POA';
      complianceDocumentCategory.title='Proof of Address';
      complianceDocumentCategory.displayOrder=2;
      createComplianceDocumentCategory =
            await complianceDocumentCategoryRepo.exists({_code: 'POA'});
      if (createComplianceDocumentCategory === false) {
        await complianceDocumentCategoryRepo.save(complianceDocumentCategory);
      }

      complianceDocumentCategory=
        complianceDocumentCategoryRepo.newEntity();
      complianceDocumentCategory.code='SOF';
      complianceDocumentCategory.title='Source of Funds';
      complianceDocumentCategory.displayOrder=3;
      createComplianceDocumentCategory =
            await complianceDocumentCategoryRepo.exists({_code: 'SOF'});
      if (createComplianceDocumentCategory === false) {
        await complianceDocumentCategoryRepo.save(complianceDocumentCategory);
      }

      complianceDocumentCategory=
        complianceDocumentCategoryRepo.newEntity();
      complianceDocumentCategory.code='BIZ';
      complianceDocumentCategory.title='Business Documents';
      complianceDocumentCategory.displayOrder=4;
      createComplianceDocumentCategory =
            await complianceDocumentCategoryRepo.exists({_code: 'BIZ'});
      if (createComplianceDocumentCategory === false) {
        await complianceDocumentCategoryRepo.save(complianceDocumentCategory);
      }
      console.log('ComplianceDocumentCategorySeed Inserted Successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
