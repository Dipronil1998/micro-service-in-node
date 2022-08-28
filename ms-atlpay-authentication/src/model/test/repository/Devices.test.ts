import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {Devices} from '../../repository/Devices';
import * as typeorm from 'typeorm';
import {Device} from '../../entity/Device';

describe('Test cases of Devices repository', ()=>{
  let DeviceOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    DeviceOptions =
        new RepositoryParameter(
            'Device',
            Device,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Devices repository', ()=>{
    const devices : Devices =
      new Devices(DeviceOptions);
    expect(devices instanceof Devices).toBe(true);
  });
});
