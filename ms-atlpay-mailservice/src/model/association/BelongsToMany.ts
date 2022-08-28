import {deepCompare} from '../../utils/compare';
import {AppRepository} from '../repository/AppRepository';
import {Association} from './Association';
/**
 * Represents an M - N relationship where there exists
 * a junction - or join - table that contains
 * the association fields between the source and the target table.
 * @class
 * @extends{Association}
 */
export class BelongsToMany extends Association {
  /**
   * Saving strategy that will only append to the links set.
   * @var{string}
   */
  static SAVE_APPEND : string = 'append';
  /**
   * Saving strategy that will replace the
   * links with the provided set.
   * @var{string}
   */
  static SAVE_REPLACE : string = 'replace';
  /**
   * The type of join to be used when adding the association to a query
   * @var{string}
   */
  protected _joinType: string = 'INNER';
  /**
   * The strategy name to be used to fetch associated records.
   * @var{string}
   */
  protected _strategy: string = Association.STRATEGY_SELECT;
  /**
   * Junction Repository
   * @var{AppRepository}
   */
  protected _junctionTable : AppRepository;
  /**
   * Junction table name
   * @var{string}
   */
  protected _junctionTableName : string;
  /**
   * The name of the hasMany association
   * from the target table to the junction table.
   * @var{string}
   */
  protected _junctionAssociationName : string;
  /**
   * Saving strategy to be used by this association
   * @var{string}
   */
  protected _saveStrategy : string = BelongsToMany.SAVE_REPLACE;
  /**
   * The name of the field representing the
   * foreign key to the target table
   * @var{string| Array<string>}
   */
  protected _targetForeignKey: string| Array<string>;
  /**
   * Valid strategies for this type of association
   * @var{Array<string>}
   */
  protected _validStrategies =[
    Association.STRATEGY_SELECT,
    Association.STRATEGY_SUBQUERY,
  ];
  /**
   * Check dependency
   * @var{boolean}
   */
  protected _dependent: boolean =true;

  protected _targetConditions: null| Array<any>;
  protected _sort : any;

  /**
   * Returns junction table repository
   * @return{AppRepository}
   */
  public get junctionTable(): AppRepository {
    return this._junctionTable;
  }
  /**
   * Sets junction table repository
   * @param{AppRepository} junctionTable
   */
  public set junctionTable(junctionTable: AppRepository) {
    this._junctionTable = junctionTable;
  }
  /**
   * Returns name of the junction table
   * @return{string}
   */
  public get junctionTableName(): string {
    return this._junctionTableName;
  }
  /**
   * Sets name of the junction table
   * @param{string} junctionTableName
   */
  public set junctionTableName(junctionTableName: string) {
    this._junctionTableName = junctionTableName;
  }
  /**
   * Returns association name of the junction table
   * @return{string}
   */
  public get junctionAssociationName(): string {
    return this._junctionAssociationName;
  }
  /**
   * Sets association name of the junction table
   * @param{string} junctionAssociationName
   */
  public set junctionAssociationName(junctionAssociationName: string) {
    this._junctionAssociationName = junctionAssociationName;
  }


  /**
   * Sets target foreign key
   * @param{string} key
   * @return{BelongsToMany}
   */
  public setTargetForeignKey(key : string): BelongsToMany {
    this._targetForeignKey = key;
    return this;
  }
  /**
   * Returns target foreign key
   * @return{string | Array<string>}
   */
  public getTargetForeignKey(): string | Array<string> {
    return this._targetForeignKey;
  }
  /**
   * Sets target foreign key
   * If no arguments are passed the current configured name is returned.
   * @param{string| null} key
   * @return{string | Array<string>}
   */
  public targetForeignKey(key: string| null = null ): string | Array<string> {
    if (key!==null) {
      this.setTargetForeignKey(key);
    }
    return this.getTargetForeignKey();
  }
  /**
   * Get the relationship type.
   * @return{string}
   */
  public type(): string {
    return Association.MANY_TO_MANY;
  }
  /**
   * Check owning side
   * @param{AppRepository} source
   * @return{boolean}
   */
  public isOwningSide(source: AppRepository): boolean {
    return true;
  }
  /**
   * Save association.
   * @param{any} data
   * @return{Promise<any>}
   */
  public async saveAssociated(data: any): Promise<any> {
    const repository: AppRepository = this.targetTable;
    if (repository === undefined) {
      return false;
    } else {
      const newEntity = repository.newEntity();
      const patchedEntity=repository.patchEntity(newEntity, data);
      if (deepCompare(newEntity, patchedEntity)) {
        throw Error(' Target Table Not set');
      }
      const isSave = await repository.save(patchedEntity);
      if (isSave) {
        return patchedEntity;
      }
      return false;
    }
  }
  /**
   * Check cascade delete
   * @param{AppRepository} entity
   * @param{Array<any>} options
   */
  public cascadeDelete(entity: AppRepository, options: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}
