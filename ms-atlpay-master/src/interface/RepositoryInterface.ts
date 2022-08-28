import {DeleteResult, QueryBuilder, UpdateResult} from 'typeorm';
import {EntityInterface} from './EntityInterface';
/**
 * Interface of Repository
 * @interface RepositoryInterface
 */
export interface RepositoryInterface{
    alias(alias : string|null): string;
    hasField(field : string): boolean;
    get(primaryKey : any): EntityInterface;
    query(): QueryBuilder<unknown>;
    updateAll(fields: any, conditions : any): UpdateResult;
    deleteAll(conditions: any): DeleteResult;
    exists(conditions: any): boolean;
    save(entity: EntityInterface): EntityInterface|boolean;
    delete(entity: EntityInterface): EntityInterface|boolean;
    newEntity(entity? : any, options? : Array<any>): EntityInterface;
    newEntities(data : Array<any>): Array<EntityInterface>;
    patchEntity(entity: EntityInterface, data : any): EntityInterface;
    patchEntity(entity:Array<EntityInterface>,
        data : any): Array<EntityInterface>;
}
