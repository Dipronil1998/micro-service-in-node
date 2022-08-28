import {Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';
import {InstrumentCharge} from './InstrumentCharge';

@Entity({name: 'payment_instruments'})
/**
 * Payment method charge entity
 * @class{PaymentMethodCharge}
 */
export class PaymentInstrument {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id : string;

    @Column({name: 'title'})
    private _title: string;

    @Column({name: 'description'})
    private _description : string;

    @Column({name: 'is_leaf', default: true})
    private _isLeaf : boolean;

    @ManyToOne(()=> InstrumentCharge, {cascade: true, nullable: true})
    @JoinColumn({name: 'insturment_charge_id'})
    private _instrumentCharge: InstrumentCharge;

    @ManyToOne(()=>PaymentInstrument, (parent) => parent.id, {nullable: true})
    @JoinColumn({name: 'parent_id'})
    private _parent : PaymentInstrument;

    @Column({name: 'left', nullable: true})
    private _left : number;

    @Column({name: 'right', nullable: true})
    private _right : number;

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
     * Getter title
     * @return{string} title
     */
    public get title(): string {
      return this._title;
    }
    /**
     * Setter title
     * @param{string} title
     */
    public set title(title: string) {
      this._title = title;
    }
    /**
     * Getter description
     * @return{string} description
     */
    public get description(): string {
      return this._description;
    }
    /**
     * Setter description
     * @param{string} description
     */
    public set description(description: string) {
      this._description = description;
    }
    /**
     * Getter is leaf
     * @return{boolean} isLeaf
     */
    public get isLeaf(): boolean {
      return this._isLeaf;
    }
    /**
     * Setter is leaf
     * @param{boolean} isLeaf
     */
    public set isLeaf(isLeaf: boolean) {
      this._isLeaf = isLeaf;
    }
    /**
     * Getter Instrument Charge
     * @return{InstrumentCharge} instrumentCharge
     */
    public get instrumentCharge(): InstrumentCharge {
      return this._instrumentCharge;
    }
    /**
     * Getter Instrument Charge
     * @param{InstrumentCharge} instrumentCharge
     */
    public set instrumentCharge(instrumentCharge: InstrumentCharge) {
      this._instrumentCharge = instrumentCharge;
    }
    /**
     * Getter Parent
     * @return{PaymentInstrument} parent
     */
    public get parent(): PaymentInstrument {
      return this._parent;
    }
    /**
     * Setter Parent
     * @param{PaymentMethodCharge} parent
     */
    public set parent(parent: PaymentInstrument) {
      this._parent = parent;
    }
    /**
     * Getter left
     * @return{number} left
     */
    public get left(): number {
      return this._left;
    }
    /**
     * Setter left
     * @param{number} left
     */
    public set left(left: number) {
      this._left = left;
    }
    /**
     * Getter right
     * @return{number} right
     */
    public get right(): number {
      return this._right;
    }
    /**
     * Setter right
     * @param{number} right
     */
    public set right(right: number) {
      this._right = right;
    }
    /**
     * Getter disabled
     * @return{Date} disabled
     */
    public get disabled(): Date {
      return this._disabled;
    }
    /**
     * Setter disabled
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
