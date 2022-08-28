import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {Mails} from '../../repository/Mails';
import * as typeorm from 'typeorm';
import {Mail} from '../../entity/Mail';

describe('Test cases of Mail repository', ()=>{
  let mailOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    mailOptions =
        new RepositoryParameter(
            'Mail',
            Mail,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Mails repository', ()=>{
    const mails : Mails =
      new Mails(mailOptions);
    expect(mails instanceof Mails).toBe(true);
  });
});
