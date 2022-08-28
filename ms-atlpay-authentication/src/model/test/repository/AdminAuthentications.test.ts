import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {AdminAuthentications} from '../../repository/AdminAuthentications';
import * as typeorm from 'typeorm';
import {AdminAuthentication} from '../../entity/AdminAuthentication';

describe('Test cases of AdminAuthentications repository', ()=>{
  let adminAuthenticationOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    adminAuthenticationOptions =
        new RepositoryParameter(
            'AdminAuthentication',
            AdminAuthentication,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of AdminAuthentications repository', ()=>{
    const adminAuthentication : AdminAuthentications =
      new AdminAuthentications(adminAuthenticationOptions);
    expect(adminAuthentication instanceof AdminAuthentications).toBe(true);
  });
});
