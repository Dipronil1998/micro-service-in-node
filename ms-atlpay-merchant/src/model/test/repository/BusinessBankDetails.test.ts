import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {BusinessBankDetails} from '../../repository/BusinessBankDetails';
import * as typeorm from 'typeorm';
import {BusinessBankDetail} from '../../entity/BusinessBankDetail';

describe('Test cases of Business bank details repository', ()=>{
  let businessBankDetailOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    businessBankDetailOptions =
        new RepositoryParameter(
            'BusinessBankDetail',
            BusinessBankDetail,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Business bank details repository', ()=>{
    const businessBankDetails : BusinessBankDetails =
      new BusinessBankDetails(businessBankDetailOptions);
    expect(businessBankDetails instanceof BusinessBankDetails).toBe(true);
  });
});
