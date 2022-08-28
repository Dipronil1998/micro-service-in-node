import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {BusinessLegalEntityTypes} from
  '../../repository/BusinessLegalEntityTypes';
import * as typeorm from 'typeorm';
import {BusinessLegalEntityType} from '../../entity/BusinessLegalEntityType';

describe('Test cases of Business Legal Entity Types repository', ()=>{
  let BusinessLegalEntityTypeOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    BusinessLegalEntityTypeOptions = new RepositoryParameter(
        'BusinessLegalEntityType',
        BusinessLegalEntityType,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Business Legal Entity Type repository', ()=>{
    const businessLegalEntityTypes: BusinessLegalEntityTypes =
    new BusinessLegalEntityTypes(BusinessLegalEntityTypeOptions);
    expect(businessLegalEntityTypes instanceof BusinessLegalEntityTypes)
        .toBe(true);
  });
});
