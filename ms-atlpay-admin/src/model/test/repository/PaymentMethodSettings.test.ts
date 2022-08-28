import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {PaymentMethodSettings} from '../../repository/PaymentMethodSettings';
import * as typeorm from 'typeorm';
import {PaymentMethodSetting} from '../../entity/PaymentMethodSetting';

describe('Test cases of Partner Document Pages repository', ()=>{
  let paymentMethodSettingOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    paymentMethodSettingOptions = new RepositoryParameter(
        'PaymentMethodSetting',
        PaymentMethodSetting,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Partner Document Pages repository', ()=>{
    const paymentMethodSettings: PaymentMethodSettings =
    new PaymentMethodSettings(paymentMethodSettingOptions);
    expect(paymentMethodSettings instanceof PaymentMethodSettings).toBe(true);
  });
});
