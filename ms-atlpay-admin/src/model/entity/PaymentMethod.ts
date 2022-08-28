import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Payment Method class
 * @class{PartnerDocumentPage}
 */
@Entity({name: 'payment_methods'})
/**
 * Payment Method entity
 * @class{PaymentMethod}
 */
export class PaymentMethod {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column({name: 'code'})
    private _code: string;

    @Column({name: 'title'})
    private _title: string;

    @Column({name: 'description'})
    private _description: string;

    @Column({name: 'public_icon_class'})
    private _publicIconClass: string;

    @Column({name: 'console_icon_class'})
    private _consoleIconClass: string;

    @Column({name: 'disabled', nullable: true})
    private _disabled: Date;

    @CreateDateColumn({name: 'created_on'})
    private _createdOn: Date;

    @UpdateDateColumn({name: 'modified_on'})
    private _modifiedOn: Date;

    /**
     * Getter Id
     * @return{string} id
    */
    public get id(): string {
      return this._id;
    }

    /**
     * Setter Id
     * @param{string} id
     */
    public set id(id: string) {
      this._id = id;
    }

    /**
     * Getter Code
     * @return{string} code
     */
    public get code(): string {
      return this._code;
    }

    /**
     * Setter Code
     * @param{string} code
     */
    public set code(code: string) {
      this._code = code;
    }

    /**
     * Getter Title
     * @return{string} title
     */
    public get title(): string {
      return this._title;
    }

    /**
     * Setter Title
     * @param{string} title
     */
    public set title(title: string) {
      this._title = title;
    }

    /**
     * Getter Description
     * @return{string} description
     */
    public get description(): string {
      return this._description;
    }

    /**
     * Setter Description
     * @param{string} description
     */
    public set description(description: string) {
      this._description = description;
    }

    /**
     * Getter Public Icon Class
     * @return{string} publicIconClass
     */
    public get publicIconClass(): string {
      return this._publicIconClass;
    }

    /**
     * Setter Public Icon Class
     * @param{string} publicIconClass
     */
    public set publicIconClass(publicIconClass: string) {
      this._publicIconClass = publicIconClass;
    }

    /**
     * Getter Console Icon Class
     * @return{string} consoleIconClass
     */
    public get consoleIconClass(): string {
      return this._consoleIconClass;
    }

    /**
     * Setter Console Icon Class
     * @param{string} consoleIconClass
     */
    public set consoleIconClass(consoleIconClass: string) {
      this._consoleIconClass = consoleIconClass;
    }

    /**
     * Getter Disabled
     * @return{Date} disabled
     */
    public get disabled(): Date {
      return this._disabled;
    }

    /**
     * Setter Disabled
     * @param{Date} disabled
     */
    public set disabled(disabled: Date) {
      this._disabled = disabled;
    }

    /**
     * Getter CreatedOn
     * @return{Date} createdOn
     */
    public get createdOn(): Date {
      return this._createdOn;
    }

    /**
     * Setter CreatedOn
     * @param{Date} createdOn
     */
    public set createdOn(createdOn: Date) {
      this._createdOn = createdOn;
    }

    /**
     * Getter ModifiedOn
     * @return{Date} modifiedOn
     */
    public get modifiedOn(): Date {
      return this._modifiedOn;
    }

    /**
     * Setter ModifiedOn
     * @param{Date} modifiedOn
     */
    public set modifiedOn(modifiedOn: Date) {
      this._modifiedOn = modifiedOn;
    }
}
