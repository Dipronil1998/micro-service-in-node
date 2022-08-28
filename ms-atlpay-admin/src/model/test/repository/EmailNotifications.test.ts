import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {EmailNotifications} from '../../repository/EmailNotifications';
import * as typeorm from 'typeorm';
import {EmailNotification} from '../../entity/EmailNotification';

describe('Test cases of email Notifications repository', ()=>{
  let emailNotificationOptions: RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    emailNotificationOptions = new RepositoryParameter(
        'EmailNotification',
        EmailNotification,
        dbName,
        'none',
        fakeConnection,
    );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of email Notifications repository', ()=>{
    const emailNotifications: EmailNotifications =
    new EmailNotifications(emailNotificationOptions);
    expect(emailNotifications instanceof EmailNotifications).toBe(true);
  });
});
