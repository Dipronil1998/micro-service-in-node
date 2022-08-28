import {deepCompare} from '../../utils/compare';
import {AppRepository} from '../repository/AppRepository';
import {Association} from './Association';
/**
 * Represents an N - 1 relationship where the target
 * side of the relationship will have one or multiple
 * records per each one in the source side.
 * @class
 */
export class HasMany extends Association {
  /**
   * The type of join to be used when adding
   * the association to a query.
   * @var{string}
   */
  protected _joinType: string = 'INNER';
  /**
   * The strategy name to be used to fetch associated records.
   * @var{string}
   */
  protected _strategy: string = Association.STRATEGY_SELECT;
  /**
   * Valid strategies for this type of association
   * @var{Array<string>}
   */
  protected _validStrategies: string[] = [
    Association.STRATEGY_SELECT, Association.STRATEGY_SUBQUERY,
  ];

  static SAVE_APPEND = 'append';
  static SAVE_REPLACE = 'replace';

  protected _saveStrategy : string = HasMany.SAVE_APPEND;
  /**
   * Save Strategy
   * @param{string} saveStrategy
   * @return{string}
   */
  public saveStrategy(saveStrategy : string) : string {
    if (saveStrategy === null) {
      return this._saveStrategy;
    }
    if ([
      Association.STRATEGY_SELECT, Association.STRATEGY_SUBQUERY,
    ].includes(saveStrategy)) {
      this._saveStrategy = saveStrategy;
    }
    return this._saveStrategy;
  }
  /**
   * Get the relationship type.
   * @return{string}
   */
  public type(): string {
    return Association.ONE_TO_MANY;
  }
  /**
   * Check owning side.
   * @param{AppRepository} source
   * @return{boolean}
   */
  public isOwningSide(source: AppRepository): boolean {
    return source === this.assocaiationSourceTable();
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
  cascadeDelete(entity: AppRepository, options: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}
