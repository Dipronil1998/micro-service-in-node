import {createStubInstance} from 'sinon';
import {ormDBName} from '../../../../config/bootstrap';
import {Mock} from '../../../utils/Mock';
import {AppRepository,
  RepositoryParameter}
  from '../../repository/AppRepository';
import {Countries} from '../../repository/Countries';
import * as typeorm from 'typeorm';
import {Country} from '../../entity/Country';

describe('Test cases of Countries repository', ()=>{
  let CountryOptions :RepositoryParameter;
  beforeAll(()=>{
    const dbName : string = ormDBName;
    const fakeConnection = createStubInstance(typeorm.Connection);
    const mock = new Mock(typeorm, 'getConnection', fakeConnection);
    CountryOptions =
        new RepositoryParameter(
            'Country',
            Country,
            dbName,
            'none',
            fakeConnection,
        );
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['id']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('name');
  });
  test('Create new Instance of  repository', ()=>{
    const countries : Countries =
      new Countries(CountryOptions);
    expect(countries instanceof Countries).toBe(true);
  });
});
