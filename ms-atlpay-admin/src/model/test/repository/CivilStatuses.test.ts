import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {CivilStatuses} from '../../repository/CivilStatuses';
import * as typeorm from 'typeorm';
import {CivilStatus} from '../../entity/CivilStatus';

describe('Test cases of Civil Statuses repository', ()=>{
  let civilStatusOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    civilStatusOptions = new RepositoryParameter(
        'CivilStatus',
        CivilStatus,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Civil Status repository', ()=>{
    const civilStatuses: CivilStatuses = new CivilStatuses(civilStatusOptions);
    expect(civilStatuses instanceof CivilStatuses).toBe(true);
  });
});
