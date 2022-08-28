import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {AdminLoginLogs} from '../../repository/AdminLoginLogs';
import * as typeorm from 'typeorm';
import {AdminLoginLog} from '../../entity/AdminLoginLog';

describe('Test cases of AdminLoginLogs repository', ()=>{
  let adminLoginLogOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    adminLoginLogOptions =
        new RepositoryParameter(
            'AdminLoginLog',
            AdminLoginLog,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of AdminLoginLogs repository', ()=>{
    const adminLoginLog : AdminLoginLogs =
      new AdminLoginLogs(adminLoginLogOptions);
    expect(adminLoginLog instanceof AdminLoginLogs).toBe(true);
  });
});
