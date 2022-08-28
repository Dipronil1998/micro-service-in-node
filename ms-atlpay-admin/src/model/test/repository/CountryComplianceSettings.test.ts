import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {CountryComplianceSettings} from
  '../../repository/CountryComplianceSettings';
import * as typeorm from 'typeorm';
import {CountryComplianceSetting} from '../../entity/CountryComplianceSetting';

describe('Test cases of Country Compliance Setting repository', ()=>{
  let countryComplianceSettingOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    countryComplianceSettingOptions = new RepositoryParameter(
        'CountryComplianceSetting',
        CountryComplianceSetting,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Country Compliance Setting repository', ()=>{
    const countryComplianceSetting: CountryComplianceSettings =
    new CountryComplianceSettings(countryComplianceSettingOptions);
    expect(countryComplianceSetting instanceof CountryComplianceSettings)
        .toBe(true);
  });
});
