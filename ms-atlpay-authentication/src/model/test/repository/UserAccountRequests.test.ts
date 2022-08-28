import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {UserAccountRequests} from '../../repository/UserAccountRequests';
import * as typeorm from 'typeorm';
import {UserAccountRequest} from '../../entity/UserAccountRequest';

describe('Test cases of UserAccountRequests repository', ()=>{
  let userAccountRequestOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    userAccountRequestOptions =
        new RepositoryParameter(
            'UserAccountRequest',
            UserAccountRequest,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of UserAccountRequests repository', ()=>{
    const userAccountRequest : UserAccountRequests =
      new UserAccountRequests(userAccountRequestOptions);
    expect(userAccountRequest instanceof UserAccountRequests).toBe(true);
  });
});
