import {Connection, DeleteResult,
  FindCondition,
  getConnection,
  SelectQueryBuilder, UpdateResult}
  from 'typeorm';
import {ColumnMetadata} from 'typeorm/metadata/ColumnMetadata';
import {RelationMetadata} from 'typeorm/metadata/RelationMetadata';
import {Repository} from 'typeorm/repository/Repository';
import {httpDataNotFound} from '../../../config/bootstrap';
import {DataNotFoundException} from '../../exception/DataNotFoundException';

import {Association} from '../association/Association';

import {BelongsTo} from '../association/BelongsTo';
import {BelongsToMany} from '../association/BelongsToMany';
import {HasMany} from '../association/HasMany';
import {HasOne} from '../association/HasOne';
/**
 * Represents a single database table.
 */
export class AppRepository {
  /**
   * Name of the table
   * @type string
   */
  protected _name: string;
  /**
   * The name of the class that represent a single row for this table
   * @type any
   */
  protected _entityClass: any;
  /**
   * Alias of Table name
   * @type string
   */
  protected _alias: string;
  /**
   * Table name
   * @type string
   */
  protected _tableName: string;
  /**
   * The name of the field that represents the primary key in the table
   *  @type Array<string> | string
   */
  protected _primaryKeys: Array<string> | string;
  /**
   * Database name
   * @type string
   */
  protected _dataBasename: string;
  /**
   * Schema name
   * @type string
   */
  protected _schema: string;
  /**
   * Connection instance
   * @type Connection
   */
  protected _connection: Connection;
  /**
   * The associations for this Table.
   * @type Array<Association>
   */
  protected _associations: Array<Association>;
  /**
   * Rule of Validation
   * @type any
   */
  protected _validationRule?: any;
  /**
   * Initializes a new instance
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    this._name = parameter.name;
    this._entityClass = parameter.entityClass;
    this._tableName =
    AppRepository.getTableNameByEntityClass(parameter.entityClass,
        parameter.dataBasename);
    this._alias = this._tableName;
    this._primaryKeys =
    AppRepository.getPrimaryKeyByEntityClass(parameter.entityClass,
        parameter.dataBasename);
    this._dataBasename = parameter.dataBasename;
    this._schema = parameter.schema;
    this._connection = parameter.connection;
    this._associations = [];
  }
  /** Returns the database table name
   * @return{string}
   */
  public get name(): string {
    return this._name;
  }
  /**
   * Sets name of the table
   * @param{string} name
   */
  public set name(name: string) {
    this._name = name;
  }
  /**
   * Returns name of the class
   * @return{any} entityClass
   */
  public get entityClass(): any {
    return this._entityClass;
  }
  /**
   * Sets class entity
   * @param{any} entityClass
   */
  public set entityClass(entityClass: any) {
    this._entityClass = entityClass;
  }
  /**
   * Returns alias name
   * @return{string} alias
   */
  public get alias(): string {
    return this._alias;
  }
  /**
   * Sets alias name
   * @param{string} alias
   */
  public set alias(alias: string) {
    this._alias = alias;
  }
  /**
   * Returns table name
   * @return{string} tableName
   */
  public get tableName(): string {
    return this._tableName;
  }
  /**
   * Sets table name
   * @param{string} tableName
   */
  public set tableName(tableName: string) {
    this._tableName = tableName;
  }
  /**
   * Returns primary keys of the table
   * @return{Array<string>|string} primaryKeys
   */
  public get primaryKey(): Array<string> | string {
    return this._primaryKeys;
  }
  /**
   * Sets Primary key of the table
   * @param{Array<string>|string} primaryKeys
   */
  public set primaryKey(primaryKeys: Array<string> | string) {
    this._primaryKeys = primaryKeys;
  }
  /**
   * Returns database name
   * @return{string} dataBasename
   */
  public get dataBasename(): string {
    return this._dataBasename;
  }
  /**
   * Sets database name
   * @param{string} dataBasename
   */
  public set dataBasename(dataBasename: string) {
    this._dataBasename = dataBasename;
  }
  /**
   * Returns schema name
   * @return{schema} schema
   */
  public get schema(): string {
    return this._schema;
  }
  /**
   * Sets schema
   * @param{string} schema
   */
  public set schema(schema: string) {
    this._schema = schema;
  }
  /**
   * Returns Validation Rule
   * @return{any} validationRule
   */
  public get validationRule(): any {
    return this._validationRule;
  }
  /**
   * Sets Validation Rule
   * @param{any} validationRule
   */
  public set validationRule(validationRule: any) {
    this._validationRule = validationRule;
  }

  /**
   * Returns Associations
   * @return{Array<Association>} associations
   */
  public get associations(): Array<Association> {
    return this._associations;
  }
  /**
   * Sets associations
   * @param{Array<Association>} associations
   */
  public set associations(associations: Array<Association>) {
    this._associations = associations;
  }
  /**
   * Returns connection
   * @return{Connection} connection
   */
  public get connection(): Connection {
    return this._connection;
  }
  /**
   * Sets connection
   * @param{Connection} connection
   */
  public set connection(connection: Connection) {
    this._connection = connection;
  }
  /**
   * Check a Table has a specific field/column.
   * @param{string} columnName
   * @return{boolean}
   */
  public hasField(columnName: string): boolean {
    return this.getColumns().includes(columnName);
  }
  /**
   * Get entity by primary key
   * @param{string} id
   * @return{Promise<any>}
   */
  public async get(id: string): Promise<any> {
    const repository: Repository<any> = this.loadRepository();
    try {
      const fetechedEntity: any = await
      repository.findOne(id, {relations: this.getRelations()});

      if (fetechedEntity === undefined) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      return fetechedEntity;
    } catch (error) {
      return false;
    }
  }
  /**
   * Get entity based on condition
   * @param{FindCondition<any>} conditions
   * @return{Promise<any>}
   */
  public async getOnCondition(conditions:FindCondition<any>): Promise<any> {
    const repository: Repository<any> = this.loadRepository();
    try {
      const entity : any = await
      repository.findOne({where: conditions, relations: this.getRelations()});
      if (entity=== undefined) {
        return false;
      }
      return entity;
    } catch (error) {
      return false;
    }
  }
  /**
   * Returns query builder
   * @return{SelectQueryBuilder<unknown>}
   */
  public query(): SelectQueryBuilder<unknown> {
    return this.loadRepository().createQueryBuilder();
  }
  /**
   * Update field of entites based on condition
   * @param{any} field
   * @param{any} condition
   * @return{Promise<UpdateResult>}
   */
  public async updateAll(field: any, condition: any)
  : Promise<UpdateResult> {
    return await this.loadRepository()
        .createQueryBuilder()
        .update(this.entityClass)
        .set(field)
        .where(condition)
        .execute();
  }
  /**
   * Delete entities based on condition
   * @param{any} condition
   * @return{Promise<DeleteResult>}
   */
  public async deleteAll(condition: any): Promise<DeleteResult> {
    return await this.loadRepository().createQueryBuilder().delete()
        .from(this._entityClass)
        .where(condition)
        .execute();
  }
  /**
   * Returns true/false based on the existance of rows satisfying condition
   * @param{any} condition
   * @return{Promise<boolean>}
   */
  public async exists(condition: any = {}): Promise<boolean> {
    const repository: Repository<any> = await this.loadRepository();
    try {
      const count = await repository.count(condition);
      if (count === 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  /**
   * Save an entity else returns false
   * @param{any} entity
   * @return{Promise<any>}
   */
  public async save(entity: any): Promise<any> {
    try {
      await this.loadRepository().save(entity);
      return entity;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }
  /**
   * Delete an entity
   * @param{any} entity
   * @return{Promise<any>}
   */
  public async delete(entity: any): Promise<any> {
    try {
      const primaryKey = entity[this._primaryKeys[0]];
      await this._connection.manager.delete(this._entityClass, primaryKey);

      return entity;
    } catch {
      return false;
    }
  }
  /**
   * Create a new entity
   * @param{any} data
   * @param{Array<any>} options
   * @return{any}
   */
  public newEntity(data: any = null, options: Array<any> = []): any {
    if (data === null) {
      return new this._entityClass();
    } else {
      const keys = Object.keys(data);
      for (const key of keys) {
        if (!this.hasField(key)) {
          return new this._entityClass();
        }
      }

      let newEntity : any = new this._entityClass();
      newEntity =Object.assign(newEntity, data);

      return newEntity;
    }
  }
  /**
   * Create new entites
   * @param{Array<any>} data
   * @param{Array<any>} options
   * @return{Array<any>}
   */
  public newEntities(data: Array<any>, options: Array<any> = []): Array<any> {
    const entityList: Array<any> = [];
    data.forEach((singleData: any) => {
      entityList.push(this.newEntity(singleData));
    });
    return entityList;
  }
  /**
   * Patch data to an entity
   * @param{any} entity
   * @param{any} data
   * @param{Array<any>} options
   * @return{any}
   */
  public patchEntity(entity: any, data: any, options = []): any {
    const keysInData = Object.keys(data);
    for (const key of keysInData) {
      if (!this.hasField(key)) {
        return entity;
      }
    }
    entity = Object.assign(entity, data);

    return entity;
  }
  /**
   * Load Repository
   * @return{Repository<any>}
   */
  public loadRepository():
  Repository<any> {
    return this._connection.getRepository(this._entityClass);
  }
  /**
   * Pagination data
   * @param{number} page
   * @param{number} size
   * @return{Promise<any[]>}
   */
  public async pagination(page:number=1, size: number=10) {
    page = Number(page);
    size = Number(size);
    if (Number.isInteger(page)&& Number.isInteger(size)&& page>0 && size>0) {
      const skip : number = (page - 1) * size;
      return await this.loadRepository()
          .createQueryBuilder()
          .skip(skip)
          .take(size)
          .orderBy(this._primaryKeys[0])
          .execute();
    } else {
      return [];
    }
  }
  /**
   * Get entities
   * @return{Promise<any[]>}
   */
  public async find(): Promise<any[]> {
    const repository: Repository<any> = await this.loadRepository();
    const relations = this.getRelations();
    return await repository.find({relations});
  }
  /**
   * Get Relations of this Table
   * @return{Array<string>}
   */
  public getRelations(): Array<string> {
    return this._connection
        .getMetadata(this._entityClass)
        .relations
        .map((relation : any )=> relation.propertyName);
  }
  /**
   * Get Columns/fields of this Table
   * @return{Array<string>}
   */
  public getColumns(): Array<string> {
    return this._connection
        .getMetadata(this._entityClass)
        .ownColumns.map((column: any) => column.propertyName);
  }
  /**
   * Create belongsTo association
   * @param{string} associated
   * @return{BelongsTo}
   */
  public belongsTo(associated : string) : BelongsTo {
    const association : BelongsTo = new BelongsTo(associated);
    return association;
  }
  /**
   * Create hasOne association
   * @param{string} associated
   * @return{HasOne}
   */
  public hasOne(associated : string) : HasOne {
    const association : HasOne = new HasOne(associated);
    return association;
  }
  /**
   * Create hasMany association
   * @param{string} associated
   * @return{HasMany}
   */
  public hasMany(associated : string) : HasMany {
    const association : HasMany = new HasMany(associated);
    return association;
  }
  /**
   * Create belongsToMany association
   * @param{string} associated
   * @return{BelongsToMany}
   */
  public belongsToMany(associated : string) : BelongsToMany {
    const association : BelongsToMany = new BelongsToMany(associated);
    return association;
  }

  /**
   * Initialize association informations
   * @return{Array<Association>}
   */
  public initializeAssociations(): Array<Association> {
    const relations = this.loadRepository().metadata.relations;
    const noOfRelations : number= relations.length;
    const associations : Array<Association> =[];

    for (let index =0; index< noOfRelations; index++) {
      const relation : RelationMetadata = relations[index];

      if (relation.joinColumns.length === 1) {
        const columnMetaData : ColumnMetadata = relation.joinColumns[0];
        const name : string = columnMetaData.propertyName;
        const className : string = relation.inverseEntityMetadata.targetName;
        const propertyPaths : string[] = columnMetaData.propertyPath.split('.');
        const bindingKey: string = propertyPaths[propertyPaths.length-1];
        const foreignKey : string = columnMetaData.databaseNameWithoutPrefixes;
        const propertyName = columnMetaData.propertyName;
        let association;
        if (relation.isManyToOne) {
          association = new HasMany(name);
        } else if (relation.isOneToOne) {
          association = new HasOne(name);
        } else if (relation.isOneToMany) {
          association = new BelongsTo(name);
        } else {
          association = new BelongsToMany(name);
          association.junctionTableName = relation.joinTableName;
          association.junctionAssociationName = relation.joinTableName;
        }
        association.className = className;
        association.bindingKey = bindingKey;
        association.foreignKey = foreignKey;
        association.propertyName = propertyName;
        association.sourceTable = this;
        associations.push(association);
      }
    };
    this._associations = associations;
    return associations;
  }
  /**
   * Convert an entity in Json
   * @param{any} object - entity object
   * @return{any}
   */
  private convertToJson(object: any):any {
    const jsonObject: any = {};
    Object.keys(object).forEach((key) => {
      if (key[0]==='_') {
        const modifiedKey: string = this.camelTosnakecase(key.substring(1));
        if (object[key] && typeof object[key] === 'object') {
          if (object[key] instanceof Date) {
            jsonObject[modifiedKey] = object[key];
          } else {
            jsonObject[modifiedKey] =this.convertToJson(object[key]);
          }
        } else {
          jsonObject[modifiedKey] = object[key];
        }
      } else {
        jsonObject[this.camelTosnakecase(key)] = object[key];
      }
    });
    return this.deleteAttirutes(jsonObject, ['modified_on', 'created_on']);
  }

  /**
   * Camel case to snake case
   * @param{string} key
   * @return{string} string
   */
  private camelTosnakecase(key: string): string {
    const result = key.replace( /([A-Z])/g, ' $1' ).trim();
    return result.split(' ').join('_').toLowerCase();
  }
  /**
   * Convert array of entities and entity ot json object
   * @param{any} entities -Entity List or entity
   * @return{any}
   */
  public toJson(entities:any): any {
    const convertedEntities : any[]=[];
    if (Array.isArray(entities)) {
      entities.forEach((entity)=>{
        if (typeof entities==='object') {
          entity=this.convertToJson(entity);
        }
        convertedEntities.push(entity);
      });
      return convertedEntities;
    } else {
      if (typeof entities==='object') {
        entities = this.convertToJson(entities);
      }
      return entities;
    }
  }
  /**
   * Delete attributes of json
   * @param{any} entity
   * @param{Array<string>} attributes
   * @return{any}
   */
  public deleteAttirutes(entity: any, attributes: Array<string>):any {
    attributes.forEach((attribute)=>{
      delete entity[attribute];
    });
    return entity;
  }
  /**
   * Add a association
   * @param{Association} association
   */
  public addAssociation(association : Association) {
    this._associations.push(association);
  }
  /**
   * Static function to get table name
   * @param{any} entityClass - entity
   * @param{string} connectionName - cinnectin name
   * @return{string}
   */
  static getTableNameByEntityClass(entityClass: any,
      connectionName: string): string {
    return getConnection(connectionName).
        getMetadata(entityClass).
        tableName;
  }
  /**
   * Static function to get columns
   * @param{any} entityClass - entity
   * @param{string} connectionName - conection
   * @return{string}
   */
  static getColumnsByEntityClass(entityClass: any,
      connectionName: string): ColumnMetadata[] {
    return getConnection(connectionName).
        getMetadata(entityClass).
        ownColumns;
  }
  /**
   * Get primary key(s) of a table
   * @param{any} entityClass
   * @param{string} connectionName connection name
   * @return{Array<string>| string}
   */
  static getPrimaryKeyByEntityClass(entityClass: any,
      connectionName: string): Array<string>| string {
    const primaryColumns :Array<string>| string =
      getConnection(connectionName).getMetadata(entityClass).
          primaryColumns.
          map((column) => column.databaseName);
    return primaryColumns;
  }
}

/**
 * Parameter class of AppRepository
 */
export class RepositoryParameter {
  private _name: string;
  private _entityClass: any;
  private _dataBasename: string;
  private _schema: string;
  private _connection: Connection;
  /**
   * Constructor of RepositoryParameter
   * @param{string} _name - Name of the Repository
   * @param{any} _entityClass - entity class
   * @param{string} _dataBasename datbase name
   * @param{string} _schema schema name
   * @param{Connection} _connection connection
   */
  constructor(
      _name: string,
      _entityClass: any,
      _dataBasename: string,
      _schema: string,
      _connection: Connection,
  ) {
    this._name = _name;
    this._entityClass = _entityClass;

    this._dataBasename = _dataBasename;
    this._schema = _schema;
    this._connection = _connection;
  }
  /**
   * Returns name
   * @return{string} - name
   */
  public get name(): string {
    return this._name;
  }
  /**
   * Setter of name
   * @param{string} name
   */
  public set name(name: string) {
    this._name = name;
  }
  /**
   * Returns entity class
   * @return{any} entityClass
   */
  public get entityClass(): any {
    return this._entityClass;
  }
  /**
   * Setter entity class
   * @param{any} entityClass
   */
  public set entityClass(entityClass: any) {
    this._entityClass = entityClass;
  }
  /**
   * Returns database name
   * @return{string} - database name
   */
  public get dataBasename(): string {
    return this._dataBasename;
  }
  /**
   * Setter database name
   * @param{string} dataBasename database name
   */
  public set dataBasename(dataBasename: string) {
    this._dataBasename = dataBasename;
  }
  /**
   * Returns schema name
   * @return{string}
   */
  public get schema(): string {
    return this._schema;
  }
  /**
   * Setter schema name
   * @param{string} schema
   */
  public set schema(schema: string) {
    this._schema = schema;
  }
  /**
   * Returns Connection information
   * @return{Connection}
   */
  public get connection(): Connection {
    return this._connection;
  }
  /**
   * Setter Connection information
   * @param{Connection} connection
   */
  public set connection(connection: Connection) {
    this._connection = connection;
  }
}
