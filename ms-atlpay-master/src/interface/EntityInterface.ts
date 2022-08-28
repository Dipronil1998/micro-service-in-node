/**
 * Entity Interface
 * @interface EntityInterface
 */
export interface EntityInterface {
    set(property : string | Array<string>,
        value : any,
        options? : any ) : EntityInterface;
    get(property : string) : any;
    has(property : string) : boolean;
    unsetProperty(property : string|Array<string>) : any;
    hiddenProperties(property : null|any) : EntityInterface;
    virtualProperties(property : null|any) : Array<any>;
    visibleProperties() : Array<any>;
    toArray() : Array<any>;
    extract(properties : Array<any>, onlyDirty : boolean): Array<any>;
    dirty(property : string, isDirty : boolean|null): boolean;
    clean(): void;
    isNew(status : boolean|null ): boolean| null;
    errors(field: string| Array<string>,
        errors : string| Array<string>| null,
        overwrite : boolean ) : any;
    accessible (property :string| Array<string>,
        set: boolean| null): boolean | EntityInterface;

}
