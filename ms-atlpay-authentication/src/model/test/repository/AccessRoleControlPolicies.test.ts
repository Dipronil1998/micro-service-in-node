import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {AccessRoleControlPolicies}
  from '../../repository/AccessRoleControlPolicies';
import * as typeorm from 'typeorm';
import {AccessRoleControlPolicy}
  from '../../entity/AccessRoleControlPolicy';

describe('Test cases of AccessRoleControlPolicies repository', ()=>{
  let accessRoleControlOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    accessRoleControlOptions =
        new RepositoryParameter(
            'AccessRoleControlPolicy',
            AccessRoleControlPolicy,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test(
      'Create new Instance of AccessRoleControlPolicies repository', ()=>{
        const accessRoleControlPolicy : AccessRoleControlPolicies =
      new AccessRoleControlPolicies(accessRoleControlOptions);
        expect(accessRoleControlPolicy instanceof AccessRoleControlPolicies)
            .toBe(true);
      });
});
