import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {PartnerDocumentPages} from '../../repository/PartnerDocumentPages';
import * as typeorm from 'typeorm';
import {PartnerDocumentPage} from '../../entity/PartnerDocumentPage';

describe('Test cases of Partner Document Pages repository', ()=>{
  let partnerDocumentPageOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    partnerDocumentPageOptions = new RepositoryParameter(
        'PartnerDocumentPage',
        PartnerDocumentPage,
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
    const partnerDocumentPages: PartnerDocumentPages =
    new PartnerDocumentPages(partnerDocumentPageOptions);
    expect(partnerDocumentPages instanceof PartnerDocumentPages).toBe(true);
  });
});
