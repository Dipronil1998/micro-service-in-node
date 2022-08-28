import {deepCompare} from '../../utils/compare';
import {AppRepository} from '../repository/AppRepository';
import {Association} from './Association';
/**
 * Represents an 1 - 1 relationship where the
 * source side of the relation is
 * related to only one record in the
 * target table and vice versa.
 * @class
 * @extends{Association}
 */
export class HasOne extends Association {
  /**
   * Valid strategies for this type of association
   * @var{Array<string>}
   */
  protected _validStrategies: string[] = [
    Association.STRATEGY_JOIN,
    Association.STRATEGY_SELECT,
  ];
  /**
   * Get the relationship type.
   * @return{string}
   */
  public type(): string {
    return Association.ONE_TO_ONE;
  }
  /**
   * Check owning side
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
   * Check cascade Delete
   * @param{AppRepository} entity
   * @param{Array<any>} options
   */
  cascadeDelete(entity: AppRepository, options: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}
