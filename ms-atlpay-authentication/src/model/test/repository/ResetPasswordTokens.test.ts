import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {ResetPasswordTokens} from '../../repository/ResetPasswordTokens';
import * as typeorm from 'typeorm';
import {ResetPasswordToken} from '../../entity/ResetPasswordToken';

describe('Test cases of ResetPasswordTokens repository', ()=>{
  let resetPasswordTokenOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    resetPasswordTokenOptions =
        new RepositoryParameter(
            'ResetPasswordToken',
            ResetPasswordToken,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of ResetPasswordTokens repository', ()=>{
    const resetPasswordToken : ResetPasswordTokens =
      new ResetPasswordTokens(resetPasswordTokenOptions);
    expect(resetPasswordToken instanceof ResetPasswordTokens).toBe(true);
  });
});
