import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {Honorofics} from '../../repository/Honorofics';
import * as typeorm from 'typeorm';
import {Honorofic} from '../../entity/Honorofic';

describe('Test cases of Honorofics repository', ()=>{
  let honoroficOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    honoroficOptions = new RepositoryParameter(
        'Honorofic',
        Honorofic,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Honorofics repository', ()=>{
    const honorofics: Honorofics = new Honorofics(honoroficOptions);
    expect(honorofics instanceof Honorofics).toBe(true);
  });
});
