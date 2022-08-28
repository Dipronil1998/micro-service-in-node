import {deepCompare} from '../../utils/compare';
import {AppRepository} from '../repository/AppRepository';
import {Association} from './Association';
/**
 * Represents an 1 - N relationship where the
 * source side of the relation is related
 * to only one record in the target table.
 * @class
 */
export class BelongsTo extends Association {
  /**
   * Valid strategies for this type of association
   * @var{Array<string>}
   */
  protected _validStrategies : Array<string> = [
    Association.STRATEGY_JOIN,
    Association.STRATEGY_SELECT,
  ];
  /**
   * Get the relationship type.
   * @return{string}
   */
  public type(): string {
    return Association.MANY_TO_ONE;
  }
  /**
   * Returns whether or not the passed table
   * is the owning side for this
   * @param{AppRepository} source
   * @return{boolean}
   */
  public isOwningSide(source: AppRepository): boolean {
    return source === this.assocaiationTargetTable();
  }
  /**
   * Save association
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
        throw Error('Invalid Input');
      }
      const isSave = await repository.save(patchedEntity);
      if (isSave) {
        return patchedEntity;
      }
      return false;
    }
  }
  /**
   * Check cascade Delete
   * @param{cascadeDelete} entity
   * @param{Array<any>} options
   * @return{boolean}
   */
  public cascadeDelete(entity: AppRepository, options: any[] = []): boolean {
    return true;
  }
}
