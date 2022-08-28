import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {UsersAuthentications} from '../../repository/UsersAuthentications';
import * as typeorm from 'typeorm';
import {UserAuthentication} from '../../entity/UserAuthentication';

describe('Test cases of UsersAuthentications repository', ()=>{
  let UsersAuthenticationOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    UsersAuthenticationOptions =
        new RepositoryParameter(
            'UsersAuthentication',
            UserAuthentication,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of UsersAuthentications repository', ()=>{
    const usersAuthentications : UsersAuthentications =
      new UsersAuthentications(UsersAuthenticationOptions);
    expect(usersAuthentications instanceof UsersAuthentications).toBe(true);
  });
});
