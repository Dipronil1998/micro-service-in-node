import {Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';


@Entity({name: 'instrument_charges'})
/**
 * Instrument Charge entity
 * @class{InstrumentCharge}
 */
export class InstrumentCharge {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id : string;
    @Column({name: 'amount',
      type: 'decimal',
      precision: 20,
      scale: 2,
      nullable: true,
      default: null})
    private _amount : number;
    @Column({name: 'flat_fees',
      type: 'decimal',
      precision: 20,
      scale: 2,
      nullable: true,
      default: null})
    private _flatFees : number;
    @Column({name: 'percent_fees',
      type: 'decimal',
      precision: 20,
      scale: 2,
      nullable: true,
      default: null})
    private _percentFees : number;
    @Column({name: 'min_fees',
      type: 'decimal',
      precision: 20,
      scale: 2,
      nullable: true,
      default: null})
    private _minFees : number;
    @Column({name: 'max_fees',
      type: 'decimal',
      precision: 20,
      scale: 2,
      nullable: true,
      default: null})
    private _maxFees : number;
    @CreateDateColumn({name: 'created_on'})
    private _createdOn : Date;
    @UpdateDateColumn({name: 'modified_on'})
    private _modifiedOn : Date;
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
     * Getter amount
     * @return{number} amount
     */
    public get amount(): number {
      return this._amount;
    }
    /**
     * Setter amount
     * @param{number} amount
     */
    public set amount(amount: number) {
      this._amount = amount;
    }
    /**
     * Getter flat Fees
     * @return{number} flatFees
     */
    public get flatFees(): number {
      return this._flatFees;
    }
    /**
     * Setter flat Fees
     * @param{number} flatFees
     */
    public set flatFees(flatFees: number) {
      this._flatFees = flatFees;
    }
    /**
     * Getter percent fees
     * @return{number} percentFees
     */
    public get percentFees(): number {
      return this._percentFees;
    }
    /**
     * Setter percent fees
     * @param{number} percentFees
     */
    public set percentFees(percentFees: number) {
      this._percentFees = percentFees;
    }
    /**
     * Getter min fees
     * @return{number} minFees
     */
    public get minFees(): number {
      return this._minFees;
    }
    /**
     * Setter min fees
     * @param{number} minFees
     */
    public set minFees(minFees: number) {
      this._minFees = minFees;
    }
    /**
     * Getter max fees
     * @return{number} minFees
     */
    public get maxFees(): number {
      return this._maxFees;
    }
    /**
     * Setter maxFees
     * @param{number} maxFees
     */
    public set maxFees(maxFees: number) {
      this._maxFees = maxFees;
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
