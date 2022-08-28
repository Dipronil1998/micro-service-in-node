import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {Currencies} from '../../repository/Currencies';
import * as typeorm from 'typeorm';
import {Currency} from '../../entity/Currency';

describe('Test cases of Currencies repository', ()=>{
  let CurrencyOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    CurrencyOptions =
        new RepositoryParameter(
            'Currency',
            Currency,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of  repository', ()=>{
    const currencies : Currencies =
      new Currencies(CurrencyOptions);
    expect(currencies instanceof Currencies).toBe(true);
  });
});
