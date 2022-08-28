import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

  /**
   * Compliance Document Category class
   * @class{ComplianceDocumentCategory}
   */
  @Entity({name: 'compliance_document_categories'})
  /**
    * Entity for storing ComplianceDocumentCategory developed in typeORM
    * @Entity ComplianceDocumentCategory
    */
export class ComplianceDocumentCategory {
      @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

      @Column({name: 'code'})
      private _code: string;

      @Column({name: 'title'})
      private _title: string;

      @Column({name: 'is_business_category', default: false})
      private _isBusinessCategory: boolean;

      @Column({name: 'is_public_visible', default: true})
      private _isPublicVisible: boolean;

      @Column({name: 'display_order'})
      private _displayOrder: number;

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
       * Getter Is Business Category
       * @return{boolean} isBusinessCategory
       */
      public get isBusinessCategory(): boolean {
        return this._isBusinessCategory;
      }

      /**
       * Setter Is Business Category
       * @param{boolean} isBusinessCategory
       */
      public set isBusinessCategory(isBusinessCategory: boolean) {
        this._isBusinessCategory = isBusinessCategory;
      }

      /**
       * Getter Public Visible
       * @return{boolean} title
       */
      public get isPublicVisible(): boolean {
        return this._isPublicVisible;
      }

      /**
       * Setter Is Public Visible
       * @param{boolean} isPublicVisible
       */
      public set isPublicVisible(isPublicVisible: boolean) {
        this._isPublicVisible = isPublicVisible;
      }

      /**
       * Setter Display Order
       * @return{number} displayOrder
       */
      public get displayOrder(): number {
        return this._displayOrder;
      }

      /**
       * Setter Display Order
       * @param{number} displayOrder
       */
      public set displayOrder(displayOrder: number) {
        this._displayOrder= displayOrder;
      }

      /** +
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
