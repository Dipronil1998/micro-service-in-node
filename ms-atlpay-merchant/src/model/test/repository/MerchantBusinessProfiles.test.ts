import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository, RepositoryParameter} from
  '../../repository/AppRepository';
import * as typeorm from 'typeorm';
import {MerchantBusinessProfiles} from
  '../../repository/MerchantBusinessProfiles';
import {MerchantBusinessProfile} from '../../entity/MerchantBusinessProfile';
describe('Test cases of Merchant business profile repository', ()=>{
  let merchantBusinessProfileOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    merchantBusinessProfileOptions =
        new RepositoryParameter(
            'BusinessBankDetail',
            MerchantBusinessProfile,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });

  test('Create new Instance of Business Profile  repository', ()=>{
    const merchantBusinessProfiles : MerchantBusinessProfiles =
      new MerchantBusinessProfiles(merchantBusinessProfileOptions);
    expect(merchantBusinessProfiles instanceof MerchantBusinessProfiles)
        .toBe(true);
  });
});
