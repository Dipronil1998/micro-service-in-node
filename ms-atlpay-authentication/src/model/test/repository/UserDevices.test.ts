import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {UserDevices} from '../../repository/UserDevices';
import * as typeorm from 'typeorm';
import {UserDevice} from '../../entity/UserDevice';

describe('Test cases of UserDevices repository', ()=>{
  let UserDeviceOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    UserDeviceOptions =
        new RepositoryParameter(
            'UserDevice',
            UserDevice,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of UserDevices repository', ()=>{
    const userDevices : UserDevices =
      new UserDevices(UserDeviceOptions);
    expect(userDevices instanceof UserDevices).toBe(true);
  });
});
