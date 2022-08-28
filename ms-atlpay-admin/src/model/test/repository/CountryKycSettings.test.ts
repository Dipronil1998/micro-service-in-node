import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {CountryKycSettings} from '../../repository/CountryKycSettings';
import * as typeorm from 'typeorm';
import {CountryKycSetting} from '../../entity/CountryKycSetting';

describe('Test cases of Country Kyc Setting repository', ()=>{
  let countryKycSettingOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    countryKycSettingOptions = new RepositoryParameter(
        'CountryKycSetting',
        CountryKycSetting,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Country Kyc Setting repository', ()=>{
    const countryKycSetting: CountryKycSettings =
    new CountryKycSettings(countryKycSettingOptions);
    expect(countryKycSetting instanceof CountryKycSettings).toBe(true);
  });
});
