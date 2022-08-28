import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository, RepositoryParameter}
  from '../../repository/AppRepository';
import * as typeorm from 'typeorm';
import {BusinessRepresentatives} from
  '../../repository/BusinessRepresentatives';
import {BusinessRepresentative} from
  '../../entity/BusinessRepresentative';
describe('Test cases of Business representative repository', ()=>{
  let businessRepresentativeOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    businessRepresentativeOptions =
        new RepositoryParameter(
            'BusinessBankDetail',
            BusinessRepresentative,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Business representative  repository', ()=>{
    const businessRepresentatives : BusinessRepresentatives =
      new BusinessRepresentatives(businessRepresentativeOptions);
    expect(businessRepresentatives instanceof BusinessRepresentatives)
        .toBe(true);
  });
});
