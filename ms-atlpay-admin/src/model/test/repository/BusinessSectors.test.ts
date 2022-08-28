import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {BusinessSectors} from '../../repository/BusinessSectors';
import * as typeorm from 'typeorm';
import {BusinessSector} from '../../entity/BusinessSector';

describe('Test cases of Business Sector repository', ()=>{
  let BusinessSectorOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    BusinessSectorOptions = new RepositoryParameter(
        'BusinessSector',
        BusinessSector,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Business Sector repository', ()=>{
    const businessSectors: BusinessSectors =
    new BusinessSectors(BusinessSectorOptions);
    expect(businessSectors instanceof BusinessSectors).toBe(true);
  });
});
