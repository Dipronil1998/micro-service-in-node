import {AppRepository} from '../repository/AppRepository';
/**
* An Association is a relationship established between two
* tables and is used to configure and customize
* the way interconnected records are retrieved.
 */
export abstract class Association {
  /**
   * Strategy name to use joins for fetching associated records
   * @static{string}
   */
  static STRATEGY_JOIN : string = 'join';
  /**
   * Strategy name to use a subquery for fetching associated records
   * @static{string}
   */
  static STRATEGY_SUBQUERY : string = 'subquery';
  /**
   * Strategy name to use a select for fetching associated records
   * @static{string}
   */
  static STRATEGY_SELECT : string = 'select';
  /**
   * Association type for one to one associations.
   * @static{string}
   */
  static ONE_TO_ONE : string = 'oneToOne';
  /**
   * Association type for one to many associations.
   * @static{string}
   */
  static ONE_TO_MANY : string = 'oneToMany';
  /**
   * Association type for many to many associations.
   * @static{string}
   */
  static MANY_TO_MANY : string = 'manyToMany';
  /**
   * Association type for many to one associations.
   * @static{string}
   */
  static MANY_TO_ONE : string = 'manyToOne';
  /**
   * Name given to the association.
   * @var{string}
   */
  protected _name: string;
  /**
   * The class name of the table
   * @var{string}
   */
  protected _className: string;
  /**
   * The field name in the owning side table
   * that is used to match with the
   * foreignKey.
   * @var{string | Array<string>}
   */
  protected _bindingKey: string | Array<string>;
  /**
   * The name of the field representing the
   * foreign key to the table to load.
   * @var{string | Array<string>}
   */
  protected _foreignKey: string | Array<string>;

  /**
   * A list of conditions to be always
   * included when fetching records.
   */
  protected _conditions: any;

  /**
   * Whether the records on the target table
   * are dependent on the source table.
   * @var{boolean}
   */
  protected _dependent: boolean = false;
  /**
   * Whether or not cascaded deletes
   * should also fire callbacks.
   * @var{boolean}
   */
  protected _cascadeCallbacks: boolean = false;
  /**
   * Source Repository
   * @var{AppRepository}
   */
  protected _sourceTable: AppRepository;
  /**
   * Target Repository
   * @var{AppRepository}
   */
  protected _targetTable: AppRepository;

  /**
   * The type of join to be used when
   * adding the association to a query
   * @var{string}
   */
  protected _joinType: string = 'LEFT';
  /**
   * The property name that should be
   * filled with data from the target table.
   * @var{string}
   */
  protected _propertyName: string;

  /**
   * The strategy name to be used to fetch associated records.
   * @var{string}
   */
  protected _strategy: string = Association.STRATEGY_JOIN;
  /**
   * The default finder name to use for fetching rows from the target table
   * @var{string}
   */
  protected _finder: string = 'all';
  /**
   * Valid strategies for this association
   * @var{Array<string>}
   */
  protected _validStrategies: Array<string> = [
    Association.STRATEGY_JOIN,
    Association.STRATEGY_SELECT,
    Association.STRATEGY_SUBQUERY,
  ];
  /**
   * Constructor
   * @constructor
   * @param{string} alias
   * @param{AppRepository} targetTable
   */
  constructor(alias : string, targetTable : AppRepository| null =null) {
    // const defaults = [
    //     'cascadeCallbacks',
    //     'className',
    //     'conditions',
    //     'dependent',
    //     'finder',
    //     'bindingKey',
    //     'foreignKey',
    //     'joinType',
    //     'propertyName',
    //     'sourceTable',
    //     'targetTable'
    // ];
    // if(options['cascadeCallbacks']!== undefined){
    //     this._cascadeCallbacks = options['cascadeCallbacks'];
    // }

    // if(options['className']!== undefined){
    //     this._className = options['className'];
    // }
    // if(options['conditions']!== undefined){
    //     this._conditions = options['conditions'];
    // }

    // if(options['dependent']!== undefined){
    //     this._dependent = options['dependent'];
    // }

    // if(options['finder']!== undefined){
    //     this._finder = options['finder'];
    // }

    // if(options['bindingKey']!== undefined){
    //     this._bindingKey = options['bindingKey'];
    // }

    // if(options['foreignKey']!== undefined){
    //     this._foreignKey = options['foreignKey'];
    // }

    // if(options['joinType']!== undefined){
    //     this._joinType = options['joinType'];
    // }


    // if(options['propertyName']!== undefined){
    //     this._propertyName = options['propertyName'];
    // }

    // if(options['sourceTable']!== undefined){
    //     this._sourceTable= options['sourceTable'];
    // }

    // if(options['targetTable']!== undefined){
    //     this._targetTable = options['targetTable'];
    // }

    this._name = alias;
    if (targetTable!== null) {
      this._targetTable = targetTable;
    }
  }
  /**
   * Returns name of this association
   * @return{string} name
   */
  public get name(): string {
    return this._name;
  }
  /**
   * Setter name this association
   * @param{string} name
   */
  public set name(name: string) {
    this._name = name;
  }
  /**
   * Sets the name for this association. If no argument is passed then the
   * current configured name will be returned
   * @param{string | null} name
   * @return{string}
   */
  public associationName(name : string | null = null): string {
    if ( name !== null) {
      this.name=name;
    }
    return this.name;
  }
  /**
   * Returns class name
   * @return{string}
   */
  public get className(): string {
    return this._className;
  }
  /**
   * Sets class name
   * @param{string} className
   */
  public set className(className: string) {
    this._className = className;
  }
  /**
   * Sets the class name for this association.
   * If no argument is passed then the
   * @param{string|null} className
   * @return{string}
   */
  public associationClassName( className: string | null = null) {
    if ( className!= null ) {
      this.className = className;
    }
    return this.className;
  }
  /**
   * Return conditions
   * @return{any}
   */
  public get conditions(): any {
    return this._conditions;
  }
  /**
   * Sets conditions
   * @param{any} conditions
   */
  public set conditions(conditions: any) {
    this._conditions = conditions;
  }
  /**
   * Sets a list of conditions to be always included when fetching records
   * @param{any} conditions
   * @return{any}
   */
  public associationCondition( conditions: any = null) {
    if (conditions!== null) {
      this.conditions = conditions;
    }
    return this.conditions;
  }
  /**
   * Returns the name of the field
   * representing the binding field with the target table
   * @return{string | Array<string>}
   */
  public get bindingKey(): string | Array<string> {
    if (this._bindingKey === null) {
      this._bindingKey = this.isOwningSide(this._sourceTable)?
      this._sourceTable.primaryKey:
      this._targetTable.primaryKey;
    }
    return this._bindingKey;
  }
  /**
   * Sets the name of the field
   * representing the binding field with the target table
   * @param{string | Array<string>} bindingKey
   */
  public set bindingKey(bindingKey: string | Array<string>) {
    this._bindingKey = bindingKey;
  }
  /**
   * Sets the name of the field
   * representing the binding field with the target table.
   * If no parameters are passed the current field is returned
   * @param{string| Array<string> | null} bindingKey
   * @return{string| Array<string>}
   */
  public associationBindingKey(bindingKey : string| Array<string>| null = null)
    : string| Array<string> {
    if (bindingKey!== null) {
      this.bindingKey = bindingKey;
    }
    return this.bindingKey;
  }
  /**
   * Returns  the name of the field representing the
   * foreign key to the target table.
   * @return{string | Array<string>}
   */
  public get foreignKey(): string | Array<string> {
    return this._foreignKey;
  }
  /**
   * Sets the name of the field representing the
   * foreign key to the target table.
   * @param{string | Array<string>} foreignKey
   */
  public set foreignKey(foreignKey: string | Array<string>) {
    this._foreignKey = foreignKey;
  }
  /**
   * Sets the name of the field representing the
   * foreign key to the target table.
   * If no parameters are passed the current field is returned
   * @param{string | Array<string>| null} foreignKey
   * @return{string | Array<string>}
   */
  public associationForeignKey(
      foreignKey: string | Array<string>| null = null):
    string| Array<string> {
    if (foreignKey !== null) {
      this.foreignKey = foreignKey;
    }
    return this.foreignKey;
  }
  /**
   * Returns dependency
   * @return{boolean}
   */
  public get dependent(): boolean {
    return this._dependent;
  }
  /**
   * Sets dependency
   * @param{boolean} dependent
   */
  public set dependent(dependent: boolean) {
    this._dependent = dependent;
  }
  /**
   * Sets dependency.
   * If no parameters are passed the current field is returned
   * @param{boolean|null} dependent
   * @return{boolean}
   */
  public associationDependent(dependent: boolean| null = null) : boolean {
    if (dependent!==null) {
      this.dependent = dependent;
    }
    return this.dependent;
  }
  /**
   * Returns whether or not cascaded deletes should
   * also fire callbacks.
   * @return{boolean}
   */
  public get cascadeCallbacks(): boolean {
    return this._cascadeCallbacks;
  }
  /**
   * Sets whether or not cascaded deletes should also fire callbacks.
   * @param{boolean} cascadeCallbacks
   */
  public set cascadeCallbacks(cascadeCallbacks: boolean) {
    this._cascadeCallbacks = cascadeCallbacks;
  }
  /**
   * Sets whether or not cascaded deletes should also fire callbacks.
   * If no parameters are passed the current field is returned
   * @param{boolean | null} cascadeCallbacks
   * @return{boolean}
   */
  public associationCascadeCallbacks(
      cascadeCallbacks: boolean | null = null) : boolean {
    if (cascadeCallbacks!==null) {
      this.cascadeCallbacks = cascadeCallbacks;
    }
    return this.cascadeCallbacks;
  }
  /**
   * Returns the table repository for the source side of the association
   * @return{AppRepository}
   */
  public get sourceTable(): AppRepository {
    return this._sourceTable;
  }
  /**
   * Sets the table repository for the source side of the association
   * @param{AppRepository} sourceTable
   */
  public set sourceTable(sourceTable: AppRepository) {
    this._sourceTable = sourceTable;
  }
  /**
   * Sets the table repository for the source side of the association.
   * If no parameters are passed the current field is returned
   * @param{AppRepository | null} sourceTable
   * @return{AppRepository}
   */
  public assocaiationSourceTable(
      sourceTable: AppRepository | null = null) : AppRepository {
    if (sourceTable!== null) {
      this.sourceTable = sourceTable;
    }
    return this.sourceTable;
  }

  /**
   * Returns the table repository for the target side of the association.
   * @return{AppRepository}
   */
  public get targetTable(): AppRepository {
    return this._targetTable;
  }

  /**
   * Sets the table instance for the target side of the association.
   * @param{AppRepository} targetTable
   */
  public set targetTable(targetTable: AppRepository) {
    this._targetTable = targetTable;
  }
  /**
   * Sets the table instance for the target side of the association.
   * If no parameters are passed the current field is returned.
   * @param{AppRepository | null} targetTable
   * @return{AppRepository}
   */
  public assocaiationTargetTable(
      targetTable: AppRepository | null = null): AppRepository {
    if (targetTable!== null) {
      this.targetTable = targetTable;
    }
    return this.targetTable;
  }

  /**
   * Returns the type of join to be used when
   * adding the association to a query.
   * @return{string}
   */
  public get joinType(): string {
    return this._joinType;
  }
  /**
   * Sets the type of join to be used when
   * adding the association to a query.
   * @param{string} joinType
   */
  public set joinType(joinType: string) {
    this._joinType = joinType;
  }
  /**
   * Sets the type of join to be used when
   * adding the association to a query.
   * If no parameters are passed the current field is returned.
   * @param{string| null} joinType
   * @return{string}
   */
  public associateJoinType(joinType: string| null = null) {
    if (joinType!==null) {
      this.joinType = joinType;
    }
    return this.joinType;
  }
  /**
   * Returns the property name that should be filled
   * with data from the target
   * table in the source table record.
   * @return{string}
   */
  public get propertyName(): string {
    return this._propertyName;
  }
  /**
   * Sets the property name that should be filled
   * with data from the target
   * table in the source table record.
   * @param{string} propertyName
   */
  public set propertyName(propertyName: string) {
    this._propertyName = propertyName;
  }
  /**
   * Sets the property name that should be filled
   * with data from the target
   * table in the source table record.
   * If no parameters are passed the current field is returned.
   * @param{string| null} propertyName
   * @return{string}
   */
  public associationPropertyName(propertyName: string| null =null) : string {
    if (propertyName!==null) {
      this.propertyName = propertyName;
    }
    return this.propertyName;
  }
  /**
   * Returns the strategy name to be used to fetch associated records.
   * @return{string}
   */
  public get strategy(): string {
    return this._strategy;
  }
  /**
   * Sets the strategy name to be used to fetch associated records.
   * @param{string} strategy
   */
  public set strategy(strategy: string) {
    this._strategy = strategy;
  }
  /**
   * Sets the strategy name to be used to fetch associated records.
   * If no parameters are passed the current field is returned.
   * @param{string | null} strategy
   * @return{string}
   */
  public associationStrategy(strategy : string | null=null): string {
    if (strategy !==null) {
      this.strategy = strategy;
    }
    return this.strategy;
  }
  /**
   * Returns the default finder to use for
   * fetching rows from the target table.
   * @return{string}
   */
  public get finder(): string {
    return this._finder;
  }
  /**
   * Sets the default finder to use for
   * fetching rows from the target table.
   * @param{string} finder
   */
  public set finder(finder: string) {
    this._finder = finder;
  }
  /**
   * Sets the default finder to use for
   * fetching rows from the target table.
   * If no parameters are passed the current field is returned.
   * @param{string|null} finder
   * @return{string}
   */
  public associationFinder(finder : string|null = null): string {
    if (finder !== null) {
      this.finder = finder;
    }
    return this.finder;
  }
  /**
   * Returns Valid strategies for this association.
   * @return{Array<string>}
   */
  public get validStrategies(): Array<string> {
    return this._validStrategies;
  }
  /**
   * Sets Valid strategies for this association.
   * @param{Array<string>} validStrategies
   */
  public set validStrategies(validStrategies: Array<string>) {
    this._validStrategies = validStrategies;
  }
  /**
   * Returns type of association
   * @abstract
   * @returns{string}
   */
  abstract type(): string;
  /**
   * Check owning side
   * @abstract
   * @param{AppRepository} source
   * @returns{boolean}
   */
  abstract isOwningSide(source : AppRepository) : boolean;
  /**
   * Save Association
   * @abstract
   * @param{AppRepository} entity
   * @param{Array<any>} options
   * @returns{any}
   */
  abstract saveAssociated(entity : AppRepository, options : Array<any>): any;
  /**
   * cascade Delete
   * @param{AppRepository} entity
   * @param{Array<any>} options
   * @returns{boolean}
   */
  abstract cascadeDelete(entity : AppRepository, options: Array<any>): boolean;
}
