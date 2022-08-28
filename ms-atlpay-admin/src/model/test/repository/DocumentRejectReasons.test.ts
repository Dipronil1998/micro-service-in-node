import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {DocumentRejectReasons} from '../../repository/DocumentRejectReasons';
import * as typeorm from 'typeorm';
import {DocumentRejectReason} from '../../entity/DocumentRejectReason';

describe('Test cases of Document Reject Reason repository', ()=>{
  let documentRejectReasonOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    documentRejectReasonOptions = new RepositoryParameter(
        'DocumentRejectReason',
        DocumentRejectReason,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Document Reject Reason repository', ()=>{
    const documentRejectReason: DocumentRejectReasons =
    new DocumentRejectReasons(documentRejectReasonOptions);
    expect(documentRejectReason instanceof DocumentRejectReasons).toBe(true);
  });
});
