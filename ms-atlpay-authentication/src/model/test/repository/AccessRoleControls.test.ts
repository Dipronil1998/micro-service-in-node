import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {AccessRoleControls} from '../../repository/AccessRoleControls';
import * as typeorm from 'typeorm';
import {AccessRoleControl} from '../../entity/AccessRoleControl';

describe('Test cases of AccessRoleControls repository', ()=>{
  let accessRoleControlOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    accessRoleControlOptions =
        new RepositoryParameter(
            'AccessRoleControl',
            AccessRoleControl,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of AccessRoleControls repository', ()=>{
    const accessRoleControl : AccessRoleControls =
      new AccessRoleControls(accessRoleControlOptions);
    expect(accessRoleControl instanceof AccessRoleControls).toBe(true);
  });
});
