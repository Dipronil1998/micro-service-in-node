import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {AccessRoles} from '../../repository/AccessRoles';
import * as typeorm from 'typeorm';
import {AccessRole} from '../../entity/AccessRole';

describe('Test cases of AccessRoles repository', ()=>{
  let accessRoleOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    accessRoleOptions =
        new RepositoryParameter(
            'AccessRole',
            AccessRole,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of AccessRoles repository', ()=>{
    const accessRole : AccessRoles =
      new AccessRoles(accessRoleOptions);
    expect(accessRole instanceof AccessRoles).toBe(true);
  });
});
