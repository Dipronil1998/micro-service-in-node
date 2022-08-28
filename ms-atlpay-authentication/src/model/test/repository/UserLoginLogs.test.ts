import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {UserLoginLogs} from '../../repository/UserLoginLogs';
import * as typeorm from 'typeorm';
import {UserLoginLog} from '../../entity/UserLoginLog';

describe('Test cases of UserLoginLogs repository', ()=>{
  let UserLoginLogOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    UserLoginLogOptions =
        new RepositoryParameter(
            'UserLoginLog',
            UserLoginLog,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of UserLoginLogs repository', ()=>{
    const userLoginLogs : UserLoginLogs =
      new UserLoginLogs(UserLoginLogOptions);
    expect(userLoginLogs instanceof UserLoginLogs).toBe(true);
  });
});
