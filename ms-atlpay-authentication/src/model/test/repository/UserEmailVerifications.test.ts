import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {UserEmailVerifications} from '../../repository/UserEmailVerifications';
import * as typeorm from 'typeorm';
import {UserEmailVerification} from '../../entity/UserEmailVerification';

describe('Test cases of UserEmailVerifications repository', ()=>{
  let UserEmailVerificationOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    UserEmailVerificationOptions =
        new RepositoryParameter(
            'UserEmailVerification',
            UserEmailVerification,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of UserEmailVerifications repository', ()=>{
    const userEmailVerifications : UserEmailVerifications =
      new UserEmailVerifications(UserEmailVerificationOptions);
    expect(userEmailVerifications instanceof UserEmailVerifications).toBe(true);
  });
});
