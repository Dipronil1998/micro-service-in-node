import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {TwoFactorAuths} from '../../repository/TwoFactorAuths';
import * as typeorm from 'typeorm';
import {TwoFactorAuth} from '../../entity/TwoFactorAuth';

describe('Test cases of TwoFactorAuths repository', ()=>{
  let TwoFactorAuthOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    TwoFactorAuthOptions =
        new RepositoryParameter(
            'TwoFactorAuth',
            TwoFactorAuth,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of TwoFactorAuths repository', ()=>{
    const twoFactorAuths : TwoFactorAuths =
      new TwoFactorAuths(TwoFactorAuthOptions);
    expect(twoFactorAuths instanceof TwoFactorAuths).toBe(true);
  });
});
