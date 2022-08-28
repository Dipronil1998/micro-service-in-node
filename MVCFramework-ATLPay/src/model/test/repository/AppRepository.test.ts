import * as typeorm from 'typeorm';
import {createStubInstance} from 'sinon';
import {AppRepository} from '../../repository/AppRepository';
import {AppEntity} from '../../entity/AppEntity';
import {RepositoryParameter} from '../../repository/AppRepository';
import {Mock} from '../../../utils/Mock';
import sinon from 'sinon';
import {EntityManager, EntityMetadata, UpdateResult} from 'typeorm';

import {BelongsTo} from '../../association/BelongsTo';
import {HasOne} from '../../association/HasOne';
import {HasMany} from '../../association/HasMany';
import {BelongsToMany} from '../../association/BelongsToMany';
import {RelationMetadata} from 'typeorm/metadata/RelationMetadata';
import {ColumnMetadata} from 'typeorm/metadata/ColumnMetadata';
import {DataNotFoundException} from '../../../exception/DataNotFoundException';

describe('Test cases of RepositoryParameter for AppRepository', () => {
  let mock: Mock;
  test('Create Parameter instance for AppRepository', () => {
    const fakeConnection = createStubInstance(typeorm.Connection);
    mock = new Mock(typeorm, 'getConnection', fakeConnection);
    const repositoryParameter: RepositoryParameter = new RepositoryParameter(
        'currency',
        AppEntity,
        'currenciesDB',
        'none',
        fakeConnection,
    );
    expect(repositoryParameter instanceof RepositoryParameter).toBe(true);
    expect(repositoryParameter instanceof AppRepository).toBe(false);
    expect(repositoryParameter).toBeDefined();
  });

  test('Getter methods', () => {
    const fakeConnection = createStubInstance(typeorm.Connection);
    const name: string = 'testName';
    const entityClass: any = AppEntity;
    const dataBasename: string = 'testDB';
    const schema: string = 'testSchema';
    const connection: typeorm.Connection = fakeConnection;

    const repositoryParameter: RepositoryParameter = new RepositoryParameter(
        name,
        entityClass,
        dataBasename,
        schema,
        connection,
    );

    expect(repositoryParameter.name).toEqual(name);
    expect(repositoryParameter.entityClass).toEqual(entityClass);
    expect(repositoryParameter.dataBasename).toEqual(dataBasename);
    expect(repositoryParameter.schema).toEqual(schema);
    expect(repositoryParameter.connection).toEqual(fakeConnection);
  });

  test('Setter methods', () => {
    const fakeConnection = createStubInstance(typeorm.Connection);
    const name: string = 'testName';
    const entityClass: any = AppEntity;
    const dataBasename: string = 'testDB';
    const schema: string = 'testSchema';
    const connection: typeorm.Connection = fakeConnection;
    const repositoryParameter: RepositoryParameter = new RepositoryParameter(
        'currency',
        'none',
        'currenciesDB',
        'none',
        fakeConnection,
    );
    repositoryParameter.name = name;
    repositoryParameter.entityClass = entityClass;
    repositoryParameter.dataBasename = dataBasename;
    repositoryParameter.schema = schema;
    repositoryParameter.connection = connection;
    expect(repositoryParameter.name).toEqual(name);
    expect(repositoryParameter.entityClass).toEqual(entityClass);
    expect(repositoryParameter.dataBasename).toEqual(dataBasename);
    expect(repositoryParameter.schema).toEqual(schema);
    expect(repositoryParameter.connection).toEqual(fakeConnection);
  });
  afterEach(() => {
    mock.close();
  });
});
describe('Test cases for Create AppRepository Instance', () => {
  let mock: Mock;
  test('Create AppRepositpory Instance (Currency Repository)', () => {
    const fakeConnection = createStubInstance(typeorm.Connection);
    mock = new Mock(typeorm, 'getConnection', fakeConnection);
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['iso']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('currency');

    const repositoryParameter: RepositoryParameter = new RepositoryParameter(
        'currency',
        AppEntity,
        'currenciesDB',
        'none',
        fakeConnection,
    );
    const currencyRepo: AppRepository = new AppRepository(repositoryParameter);
    mock.sandbox.stub(currencyRepo, 'initializeAssociations').returns([]);
    expect(currencyRepo instanceof AppRepository).toBe(true);
    expect(currencyRepo instanceof RepositoryParameter).toBe(false);
    expect(currencyRepo).toBeDefined();
  });

  afterEach(() => {
    mock.close();
  });
});

describe('Test cases of Different functionality of AppRepository', () => {
  let mock: Mock;
  let fakeConnection: typeorm.Connection;
  let repositoryParameter: RepositoryParameter;
  let currencyRepo: AppRepository;
  beforeEach(() => {
    fakeConnection = createStubInstance(typeorm.Connection);

    mock = new Mock(typeorm, 'getConnection', fakeConnection);
    mock.sandbox.stub(AppRepository, 'getPrimaryKeyByEntityClass')
        .returns(['iso']);
    mock.sandbox.stub(AppRepository, 'getTableNameByEntityClass')
        .returns('currency');

    repositoryParameter = new RepositoryParameter(
        'currency',
        AppEntity,
        'currenciesDB',
        'none',
        fakeConnection,
    );

    currencyRepo = new AppRepository(repositoryParameter);
  });
  test('Create new Entity with empty or partial data', () => {
    mock.sandbox.stub(currencyRepo, 'getColumns')
        .returns(['iso', 'common_name',
          'iso_numeric', 'official_name',
          'icon']);
    const inputData = {'iso': 'BAN'};
    const currencyEntity = currencyRepo.newEntity(inputData);
    expect(currencyEntity instanceof AppEntity).toBe(true);
    expect(currencyEntity).toEqual(inputData);

    const inoutDataTwo = {'iso': 'IND', 'common_name': 'India'};
    const currencyEntityTwo = currencyRepo.newEntity(inoutDataTwo);
    expect(currencyEntityTwo instanceof AppEntity).toBe(true);
    expect(currencyEntityTwo).toEqual(inoutDataTwo);

    const currencyEntityThree = currencyRepo.newEntity();
    expect(currencyEntityThree instanceof AppEntity).toBe(true);
    expect(currencyEntityThree).toEqual({});
  });

  test('Create new Entity with invalid field(s) returns empty entity', () => {
    mock.sandbox.stub(currencyRepo, 'getColumns')
        .returns(['iso', 'common_name',
          'iso_numeric', 'official_name',
          'icon']);
    const invalidFieldData = {'iso-fake': 'BAN'};
    const currencyEntity = currencyRepo.newEntity(invalidFieldData);
    expect(currencyEntity instanceof AppEntity).toBe(true);
    expect(currencyEntity).toEqual({});
  });

  test('Get entity by id (primary key)', async () => {
    mock.sandbox.stub(currencyRepo, 'getColumns')
        .returns(['iso', 'common_name',
          'iso_numeric', 'official_name',
          'icon']);
    mock.sandbox.stub(currencyRepo, 'getRelations').returns(['country']);
    const inputData = {'iso': 'BAN'};
    const currencyEntity = currencyRepo.newEntity(inputData);
    const fakeRepository = createStubInstance(typeorm.Repository);
    fakeRepository.findOne.callsFake(() => {
      return currencyEntity;
    });
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);
    const entity = await currencyRepo.get('BAN');

    expect(entity instanceof AppEntity).toBe(true);
    expect(entity.iso).toEqual(currencyEntity.iso);
    expect(entity).toEqual(currencyEntity);
  });

  test('Get Error for invalid id (primary key)', async () => {
    mock.sandbox.stub(currencyRepo, 'getColumns')
        .returns(['iso', 'common_name',
          'iso_numeric', 'official_name',
          'icon']);
    mock.sandbox.stub(currencyRepo, 'getRelations').returns(['country']);
    const fakeRepository = createStubInstance(typeorm.Repository);
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);
    try {
      await currencyRepo.get('PAN');
    } catch (error) {
      expect(error).toBeInstanceOf(DataNotFoundException);
    }
  });

  test('Get on condition for valid Input', async ()=>{
    mock.sandbox.stub(currencyRepo, 'getColumns')
        .returns(['iso', 'common_name',
          'iso_numeric', 'official_name',
          'icon']);
    mock.sandbox.stub(currencyRepo, 'getRelations').returns(['country']);
    const inputData = {'iso': 'PAN', 'common_name': 'Portugal'};
    const currencyEntity = currencyRepo.newEntity(inputData);
    const fakeRepository = createStubInstance(typeorm.Repository);
    fakeRepository.findOne.callsFake(() => {
      return currencyEntity;
    });
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);
    const entity = await currencyRepo
        .getOnCondition({'common_name': 'Portugal'});
    expect(entity instanceof AppEntity).toBe(true);
    expect(entity.iso).toEqual(currencyEntity.iso);
    expect(entity).toEqual(currencyEntity);
  });

  test('Get on conditon for Invalid Input', async ()=>{
    mock.sandbox.stub(currencyRepo, 'getColumns')
        .returns(['iso', 'common_name',
          'iso_numeric', 'official_name',
          'icon']);
    mock.sandbox.stub(currencyRepo, 'getRelations').returns(['country']);
    const fakeRepository = createStubInstance(typeorm.Repository);
    fakeRepository.findOne.callsFake(() => {
      throw new Error();
    });
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);
    const entity = await currencyRepo
        .getOnCondition({'common_name': 'invalid'});
    expect(entity instanceof AppEntity).toBe(false);
    expect(entity).toBe(false);
  });

  test('Get Query Builder', () => {
    const fakeQueryBuilder: typeorm.SelectQueryBuilder<any> =
        createStubInstance(typeorm.SelectQueryBuilder);
    const fakeRepository: any = createStubInstance(typeorm.Repository);
    fakeRepository.createQueryBuilder.callsFake(() => {
      return fakeQueryBuilder;
    });
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);
    const queryBuilder = currencyRepo.query();
    expect(fakeQueryBuilder).toMatchObject(queryBuilder);
  });

  test('Update entity(ies) statifing given condition', async () => {
    const inoutDataTwo = {'iso': 'IND', 'common_name': 'India'};
    const fakeUpdateResult: UpdateResult = new UpdateResult();

    fakeUpdateResult.raw = undefined,
    fakeUpdateResult.generatedMaps = [];


    const fakeQueryBuilder = createStubInstance(typeorm.UpdateQueryBuilder);
    const fakeRepository: any = createStubInstance(typeorm.Repository);
    fakeRepository.createQueryBuilder.callsFake(() => {
      return fakeQueryBuilder;
    });

    fakeQueryBuilder.update.callsFake(() => {
      return fakeQueryBuilder;
    });
    fakeQueryBuilder.set.callsFake(() => {
      return fakeQueryBuilder;
    });
    fakeQueryBuilder.where.callsFake(() => {
      return fakeQueryBuilder;
    });

    fakeQueryBuilder.execute.withArgs().resolves(fakeUpdateResult);
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);


    const result: UpdateResult = await currencyRepo
        .updateAll('currency.id = :id', {id: inoutDataTwo.iso});

    expect(result).toEqual(fakeUpdateResult);
    expect(result instanceof UpdateResult).toBe(true);
    expect(result instanceof typeorm.DeleteResult).toBe(false);
  });

  test('Delete entity(ies) based on condition', async () => {
    // const fakeConnection = createStubInstance(typeorm.Connection);

    const fakeQueryBuilder = createStubInstance(typeorm.DeleteQueryBuilder);
    const fakeDeleteResult = new typeorm.DeleteResult();
    fakeDeleteResult.raw = undefined;
    fakeDeleteResult.affected = 1;
    const fakeRepository: any = createStubInstance(typeorm.Repository);
    fakeRepository.createQueryBuilder.callsFake(() => {
      return fakeQueryBuilder;
    });

    fakeQueryBuilder.delete.callsFake(() => {
      return fakeQueryBuilder;
    });
    fakeQueryBuilder.delete.withArgs().returnsThis();
    fakeQueryBuilder.from.withArgs(AppEntity).returnsThis();
    fakeQueryBuilder.where.callsFake(() => {
      return fakeQueryBuilder;
    });
    fakeQueryBuilder.execute.withArgs().resolves(fakeDeleteResult);
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);
    const result = await currencyRepo.deleteAll({id: 1});
    expect(result).toEqual(fakeDeleteResult);
    expect(fakeDeleteResult instanceof typeorm.DeleteResult).toBe(true);
    expect(fakeDeleteResult instanceof typeorm.UpdateResult).toBe(false);
  });

  test('Existance of entity satisfying given condition', async () => {
    const fakeRepository: any = createStubInstance(typeorm.Repository);
    fakeRepository.count.callsFake(() => {
      return 0;
    });
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);
    const resultFalse = await currencyRepo.exists({id: 1});
    expect(resultFalse).toBe(false);
    fakeRepository.count.callsFake(() => {
      return 1;
    });
    const resultTrue = await currencyRepo.exists({id: 1});
    expect(resultTrue).toBe(true);
    const result = await currencyRepo.exists();
    expect(result).toBe(true);
  });

  test('Save a single entity', async () => {
    const fakeRepository: any = createStubInstance(typeorm.Repository);
    fakeRepository.find.callsFake(() => {
      return;
    });
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);

    const inputData = {'iso': 'PAN'};
    const result = await currencyRepo.save(inputData);
    expect(result).toEqual(inputData);
    fakeRepository.save.rejects('DB Error');
    const resultFalse = await currencyRepo.save(inputData);
    expect(resultFalse).toBe(false);
  });

  test('Create new Entities', async () => {
    const inputData = {'iso': 'IND', 'common_name': 'India'};

    mock.sandbox.stub(currencyRepo, 'newEntity').returns(inputData);

    const result = await currencyRepo.newEntities([inputData]);
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  test('Patch entity', () => {
    mock.sandbox.stub(currencyRepo, 'hasField').returns(true);
    const inputData = {'iso': 'IND', 'common_name': 'India'};
    const patchData = {iso_numeric: 10};
    const currency: any = new AppEntity();

    currency.iso = inputData.iso;
    currency.common_name = inputData.common_name;
    const result = currencyRepo.patchEntity(currency, patchData);
    expect(result).toBeInstanceOf(AppEntity);
  });

  test('Patch entity with invalid field', () => {
    const inputData = {'iso': 'IND', 'common_name': 'India'};
    mock.sandbox.stub(currencyRepo, 'hasField').returns(false);
    const currency: any = new AppEntity();

    currency.iso = inputData.iso;
    currency.common_name = inputData.common_name;
    const patchDataFake = {iso_numeric_fake: 10};
    const resultFalse = currencyRepo.patchEntity(currency, patchDataFake);
    expect(resultFalse).toBeInstanceOf(AppEntity);
    expect(resultFalse).toEqual(inputData);
  });

  // test("Load Repository",()=>{
  //     const fakeRepository : any = createStubInstance(typeorm.Repository);
  //     mock.sandbox.stub(typeorm,'getRepository').returns(fakeRepository);

  //     const result =currencyRepo.loadRepository();
  //     console.log(result);
  // });

  test('Find entities', async () => {
    const inputData = {'iso': 'IND', 'common_name': 'India'};
    const currency: any = new AppEntity();

    currency.iso = inputData.iso;
    currency.common_name = inputData.common_name;
    const fakeRepository: any = createStubInstance(typeorm.Repository);
    fakeRepository.find.callsFake(() => {
      return [currency];
    });
    mock.sandbox.stub(currencyRepo, 'loadRepository').returns(fakeRepository);
    mock.sandbox.stub(currencyRepo, 'getRelations').returns(['country']);
    const result = await currencyRepo.find();
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result[0]).toBeInstanceOf(AppEntity);
  });

  test('Belongs To ', () => {
    const result = currencyRepo.belongsTo('belongsTo');
    expect(result).toBeInstanceOf(BelongsTo);
  });

  test('hasOne', () => {
    const result = currencyRepo.hasOne('hasOne');
    expect(result).toBeInstanceOf(HasOne);
  });

  test('hasMany', () => {
    const result = currencyRepo.hasMany('hasMany');
    expect(result).toBeInstanceOf(HasMany);
  });

  test('belongsToMany', () => {
    const result = currencyRepo.belongsToMany('belongsToMany');
    expect(result).toBeInstanceOf(BelongsToMany);
  });

  test('Initialize association of HasMany', () => {
    const fakerelation = createStubInstance(RelationMetadata);
    const fakeColumn = createStubInstance(ColumnMetadata);
    fakeColumn.propertyPath = 'demo.id';
    fakerelation.joinColumns = [fakeColumn];
    fakerelation.isManyToOne = true;
    fakerelation.inverseEntityMetadata = createStubInstance(EntityMetadata);
    const fakeRelations = [fakerelation];
    const fakeRepository = {metadata: {relations: fakeRelations}};

    mock.sandbox.stub(currencyRepo, 'loadRepository')
        .returns(fakeRepository as any);
    const result = currencyRepo.initializeAssociations();
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result[0]).toBeInstanceOf(HasMany);
  });

  test('Initialize association of HasOne', () => {
    const fakerelation = createStubInstance(RelationMetadata);
    const fakeColumn = createStubInstance(ColumnMetadata);
    fakeColumn.propertyPath = 'demo.id';
    fakerelation.joinColumns = [fakeColumn];
    fakerelation.isOneToOne = true;
    fakerelation.inverseEntityMetadata = createStubInstance(EntityMetadata);
    const fakeRelations = [fakerelation];
    const fakeRepository = {metadata: {relations: fakeRelations}};
    mock.sandbox.stub(currencyRepo, 'loadRepository')
        .returns(fakeRepository as any);
    const result = currencyRepo.initializeAssociations();
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result[0]).toBeInstanceOf(HasOne);
  });

  test('Initialize association of BelongsTo', () => {
    const fakerelation = createStubInstance(RelationMetadata);
    const fakeColumn = createStubInstance(ColumnMetadata);
    fakeColumn.propertyPath = 'demo.id';
    fakerelation.joinColumns = [fakeColumn];
    fakerelation.isOneToMany = true;
    fakerelation.inverseEntityMetadata = createStubInstance(EntityMetadata);
    const fakeRelations = [fakerelation];
    const fakeRepository = {metadata: {relations: fakeRelations}};

    mock.sandbox.stub(currencyRepo, 'loadRepository')
        .returns(fakeRepository as any);
    const result = currencyRepo.initializeAssociations();
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result[0]).toBeInstanceOf(BelongsTo);
  });

  test('Initialize association of BelongsToMany', () => {
    const fakerelation = createStubInstance(RelationMetadata);
    const fakeColumn = createStubInstance(ColumnMetadata);
    fakeColumn.propertyPath = 'demo.id';
    fakerelation.joinColumns = [fakeColumn];
    fakerelation.isManyToMany = true;
    fakerelation.inverseEntityMetadata = createStubInstance(EntityMetadata);
    const fakeRelations = [fakerelation];
    const fakeRepository = {metadata: {relations: fakeRelations}};

    mock.sandbox.stub(currencyRepo, 'loadRepository')
        .returns(fakeRepository as any);
    const result = currencyRepo.initializeAssociations();
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result[0]).toBeInstanceOf(BelongsToMany);
  });


  test('Initialize association of More than One Join Columns', () => {
    const fakerelation = createStubInstance(RelationMetadata);
    const fakeColumn = createStubInstance(ColumnMetadata);
    fakeColumn.propertyPath = 'demo.id';
    fakerelation.joinColumns = [];
    fakerelation.isManyToMany = true;
    fakerelation.inverseEntityMetadata = createStubInstance(EntityMetadata);
    const fakeRelations = [fakerelation];
    const fakeRepository = {metadata: {relations: fakeRelations}};

    mock.sandbox.stub(currencyRepo, 'loadRepository')
        .returns(fakeRepository as any);
    const result = currencyRepo.initializeAssociations();
    expect(result.length).toEqual(0);
  });

  test('Initialize association of No relationship', () => {
    const fakeRepository = {metadata: {relations: []}};

    mock.sandbox.stub(currencyRepo, 'loadRepository')
        .returns(fakeRepository as any);
    const result = currencyRepo.initializeAssociations();
    expect(result.length).toEqual(0);
  });

  test('Add association', () => {
    const association = new HasOne('hasOne');
    expect(currencyRepo.associations).toHaveLength(0);
    currencyRepo.addAssociation(association);
    expect(currencyRepo.associations).toHaveLength(1);
  });

  test('Getter methods', () => {
    const association = new HasOne('hasOne');
    currencyRepo.addAssociation(association);
    expect(currencyRepo.name).toEqual('currency');
    expect(currencyRepo.entityClass).toEqual(AppEntity);
    expect(currencyRepo.alias).toEqual('currency');
    expect(currencyRepo.tableName).toEqual('currency');
    expect(currencyRepo.primaryKey).toEqual(['iso']);
    expect(currencyRepo.dataBasename).toEqual('currenciesDB');
    expect(currencyRepo.schema).toEqual('none');
    expect(currencyRepo.connection).toEqual(fakeConnection);
    expect(currencyRepo.associations[0]).toEqual(association);
  });

  test('Setter methods', () => {
    const association = new HasOne('hasOne');
    const name: string = 'curerencySet';
    const alias: string = 'currencyAlias';
    const tableName: string = 'currencyTable';
    const primaryKey: string = 'currencyPrimaryKey';
    const dataBasename: string = 'dbName';
    const schema: string = 'schema';
    currencyRepo.name = name;
    currencyRepo.alias = alias;
    currencyRepo.tableName = tableName;
    currencyRepo.primaryKey = primaryKey;
    currencyRepo.dataBasename = dataBasename;
    currencyRepo.schema = schema;
    currencyRepo.associations = [association];
    expect(currencyRepo.name).toEqual(name);

    expect(currencyRepo.alias).toEqual(alias);
    expect(currencyRepo.tableName).toEqual(tableName);
    expect(currencyRepo.primaryKey).toEqual(primaryKey);
    expect(currencyRepo.dataBasename).toEqual(dataBasename);
    expect(currencyRepo.schema).toEqual(schema);
    expect(currencyRepo.associations[0]).toEqual(association);
  });


  test('Load Repository', ()=>{
    const fakeConnectionTest = createStubInstance(typeorm.Connection);
    const fakeRepository = createStubInstance(typeorm.Repository);
    fakeConnectionTest.getRepository.withArgs(AppEntity)
        .returns(fakeRepository);
    currencyRepo.connection = fakeConnectionTest;
    expect(fakeRepository).toBeInstanceOf(typeorm.Repository);
  });
  test('Get Relations', ()=>{
    const relationOneName : string = 'country';
    const fakeConnectionTest = createStubInstance(typeorm.Connection);
    const fakeEntityMetaData = createStubInstance(typeorm.EntityMetadata);

    const fakeRelationOne = createStubInstance(RelationMetadata);
    fakeRelationOne.propertyName = relationOneName;
    fakeEntityMetaData.relations = [fakeRelationOne];
    fakeConnectionTest.getMetadata.withArgs(AppEntity)
        .returns(fakeEntityMetaData);
    currencyRepo.connection = fakeConnectionTest;

    const result = currencyRepo.getRelations();
    expect(result.length).toBeGreaterThan(0);
  });

  test('Get columns', ()=>{
    const columnOneName : string = 'iso';
    const columnTwoName : string = 'iso_numeric';
    const fakeConnectionTest = createStubInstance(typeorm.Connection);
    const fakeEntityMetaData = createStubInstance(typeorm.EntityMetadata);

    const fakeColumnOne = createStubInstance(ColumnMetadata);
    const fakeColumnTwo = createStubInstance(ColumnMetadata);
    fakeColumnOne.propertyName = columnOneName;
    fakeColumnTwo.propertyName = columnTwoName;
    fakeEntityMetaData.ownColumns = [fakeColumnOne, fakeColumnTwo];
    fakeConnectionTest.getMetadata.withArgs(AppEntity)
        .returns(fakeEntityMetaData);
    currencyRepo.connection = fakeConnectionTest;

    const result = currencyRepo.getColumns();
    expect(result.length).toBeGreaterThan(0);
  });

  test('Delete entity', async ()=>{
    const fakeConnectionTest = {manager: createStubInstance(EntityManager)};
    // @ts-ignore
    currencyRepo.connection = fakeConnectionTest;
    const inputData = {'iso': 'IND', 'common_name': 'India'};

    const result = await currencyRepo.delete(inputData);
    expect(result).toEqual(inputData);
    fakeConnectionTest.manager.delete.rejects('DB error');
    // @ts-ignore
    currencyRepo.connection = fakeConnectionTest;
    const resultFalse = await currencyRepo.delete(inputData);
    expect(resultFalse).toEqual(false);
  });


  test('to Json', async ()=>{
    const camelCaseEntity: any ={
      _id: 1234,
      _commonName: 'test name',
    };
    const entity = currencyRepo.toJson(camelCaseEntity);
    expect(entity.id).toBeDefined();
    expect(entity.common_name).toBeDefined();
    expect(entity.id).toEqual(1234);
    expect(entity.common_name).toEqual('test name');
  });

  afterEach(() => {
    mock.close();
    sinon.restore();
  });
});

