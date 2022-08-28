import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository, RepositoryParameter} from
  '../../repository/AppRepository';
import * as typeorm from 'typeorm';
import {Merchant} from '../../entity/Merchant';
import {Merchants} from '../../repository/Merchants';
describe('Test cases of Merchant repository', ()=>{
  let merchantOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    merchantOptions =
        new RepositoryParameter(
            'BusinessBankDetail',
            Merchant,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });

  test('Create new Instance of Merchant repository', ()=>{
    const merchants : Merchants = new Merchants(merchantOptions);
    expect(merchants instanceof Merchants).toBe(true);
  });
});
