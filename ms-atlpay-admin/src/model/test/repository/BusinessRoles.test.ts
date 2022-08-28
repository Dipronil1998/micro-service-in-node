import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {BusinessRoles} from '../../repository/BusinessRoles';
import * as typeorm from 'typeorm';
import {BusinessRole} from '../../entity/BusinessRole';

describe('Test cases of Business Roles repository', ()=>{
  let businessRoleOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    businessRoleOptions = new RepositoryParameter(
        'BusinessRole',
        BusinessRole,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Business Role repository', ()=>{
    const businessRoles: BusinessRoles = new BusinessRoles(businessRoleOptions);
    expect(businessRoles instanceof BusinessRoles).toBe(true);
  });
});
