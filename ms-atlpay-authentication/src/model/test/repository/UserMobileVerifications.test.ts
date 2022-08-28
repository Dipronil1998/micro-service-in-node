import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {
  AppRepository,
  RepositoryParameter,
}
  from '../../repository/AppRepository';
import {UserMobileVerifications}
  from '../../repository/UserMobileVerifications';
import * as typeorm from 'typeorm';
import {UserMobileVerification} from '../../entity/UserMobileVerification';

describe('Test cases of UserMobileVerifications repository', () => {
  let UserMobileVerificationOptions: RepositoryParameter;
  beforeAll(() => {
    const dbName: string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    UserMobileVerificationOptions =
      new RepositoryParameter(
          'UserMobileVerification',
          UserMobileVerification,
          dbName,
          'none',
          fakeConnection,
      );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of UserMobileVerifications repository',
      () => {
        const userMobileVerifications: UserMobileVerifications =
        new UserMobileVerifications(UserMobileVerificationOptions);
        expect(userMobileVerifications instanceof UserMobileVerifications)
            .toBe(true);
      });
});
