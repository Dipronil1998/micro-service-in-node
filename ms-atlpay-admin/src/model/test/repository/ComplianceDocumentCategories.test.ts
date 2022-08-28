import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {ComplianceDocumentCategories} from
  '../../repository/ComplianceDocumentCategories';
import * as typeorm from 'typeorm';
import {ComplianceDocumentCategory} from
  '../../entity/ComplianceDocumentCategory';

describe('Test cases of Compliance Document Category repository', ()=>{
  let complianceDocumentCategoryOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    complianceDocumentCategoryOptions = new RepositoryParameter(
        'ComplianceDocumentCategory',
        ComplianceDocumentCategory,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Compliance Document Category repository', ()=>{
    const complianceDocumentCategories: ComplianceDocumentCategories =
    new ComplianceDocumentCategories(complianceDocumentCategoryOptions);
    expect(complianceDocumentCategories instanceof ComplianceDocumentCategories)
        .toBe(true);
  });
});
