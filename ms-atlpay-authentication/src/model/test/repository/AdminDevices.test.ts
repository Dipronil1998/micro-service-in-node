import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {AdminDevices} from '../../repository/AdminDevices';
import * as typeorm from 'typeorm';
import {AdminDevice} from '../../entity/AdminDevice';

describe('Test cases of AdminDevices repository', ()=>{
  let adminDevicesOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    adminDevicesOptions =
        new RepositoryParameter(
            'AdminDevice',
            AdminDevice,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of AdminDevices repository', ()=>{
    const adminDevices : AdminDevices =
      new AdminDevices(adminDevicesOptions);
    expect(adminDevices instanceof AdminDevices).toBe(true);
  });
});
