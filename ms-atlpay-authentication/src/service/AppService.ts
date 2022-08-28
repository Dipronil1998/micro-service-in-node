/**
 * AppService
 * @class
 */
export class AppService {
  /**
   * The name of this Service
   * var{string}
   */
  protected _name: string;

  /**
   * Constructor of AppService
   * @constructor
   * @param{string} name
   */
  constructor(name: string) {
    this._name = name;
  }

  /**
   * Returns name.
   * @return{string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Sets name.
   * @param{string} name
   */
  public set name(name: string) {
    this._name = name;
  }
}
