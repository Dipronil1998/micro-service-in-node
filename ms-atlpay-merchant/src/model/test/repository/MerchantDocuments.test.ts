import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository, RepositoryParameter} from
  '../../repository/AppRepository';
import * as typeorm from 'typeorm';
import {MerchantDocument} from '../../entity/MerchantDocument';
import {MerchantDocuments} from '../../repository/MerchantDocuments';
describe('Test cases of Merchant document repository', ()=>{
  let merchantDocumentOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    merchantDocumentOptions =
        new RepositoryParameter(
            'BusinessBankDetail',
            MerchantDocument,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });

  test('Create new Instance of Merchant Document repository', ()=>{
    const merchantDocuments : MerchantDocuments =
      new MerchantDocuments(merchantDocumentOptions);
    expect(merchantDocuments instanceof MerchantDocuments).toBe(true);
  });
});
