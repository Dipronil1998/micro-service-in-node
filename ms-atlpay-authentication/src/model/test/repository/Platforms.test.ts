import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {Platforms} from '../../repository/Platforms';
import * as typeorm from 'typeorm';
import {Platform} from '../../entity/Platform';

describe('Test cases of Platforms repository', ()=>{
  let PlatformOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    PlatformOptions =
        new RepositoryParameter(
            'Platform',
            Platform,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of Platforms repository', ()=>{
    const platforms : Platforms =
      new Platforms(PlatformOptions);
    expect(platforms instanceof Platforms).toBe(true);
  });
});
