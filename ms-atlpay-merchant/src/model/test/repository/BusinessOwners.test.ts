import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository, RepositoryParameter}
  from '../../repository/AppRepository';
import * as typeorm from 'typeorm';
import {BusinessOwners} from '../../repository/BusinessOwners';
import {BusinessOwner} from '../../entity/BusinessOwner';

describe('Test cases of Business owner repository', ()=>{
  let businessOwnerOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    businessOwnerOptions =
        new RepositoryParameter(
            'BusinessBankDetail',
            BusinessOwner,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Business owner repository', ()=>{
    const businessOwner : BusinessOwners =
      new BusinessOwners(businessOwnerOptions);
    expect(businessOwner instanceof BusinessOwners).toBe(true);
  });
});
