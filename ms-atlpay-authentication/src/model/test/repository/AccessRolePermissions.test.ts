import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {AccessRolePermissions} from '../../repository/AccessRolePermissions';
import * as typeorm from 'typeorm';
import {AccessRolePermission} from '../../entity/AccessRolePermission';

describe('Test cases of AccessRolePermissions repository', ()=>{
  let accessRolePermissionOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    accessRolePermissionOptions =
        new RepositoryParameter(
            'AccessRolePermission',
            AccessRolePermission,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of AccessRolePermissions repository', ()=>{
    const accessRolePermissions : AccessRolePermissions =
      new AccessRolePermissions(accessRolePermissionOptions);
    expect(accessRolePermissions instanceof AccessRolePermissions).toBe(true);
  });
});
