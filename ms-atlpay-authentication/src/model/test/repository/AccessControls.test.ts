import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {AccessControls} from '../../repository/AccessControls';
import * as typeorm from 'typeorm';
import {AccessControl} from '../../entity/AccessControl';

describe('Test cases of AccessControls repository', ()=>{
  let accessControlOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    accessControlOptions =
        new RepositoryParameter(
            'AccessControl',
            AccessControl,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of AccessControls repository', ()=>{
    const accessControl : AccessControls =
      new AccessControls(accessControlOptions);
    expect(accessControl instanceof AccessControls).toBe(true);
  });
});
