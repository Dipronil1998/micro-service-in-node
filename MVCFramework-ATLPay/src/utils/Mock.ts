import {createSandbox, SinonSandbox} from 'sinon';

/**
 * Class Mock for Sinon
 * @class Mock
 */
export class Mock {
  /**
   * private sandbox
   * @private{_sandbox}
   */
  private _sandbox: SinonSandbox;
  /**
   * Getter sandbox
   * @return{string} sandbox
   */
  public get sandbox(): SinonSandbox {
    return this._sandbox;
  }
  /**
   * Setter sandbox
   * @param{string} sandbox
   */
  public set sandbox(sandbox: SinonSandbox) {
    this._sandbox = sandbox;
  }
  /**
   * @constructor
   * @param{any} module
   * @param{any} method
   * @param{any} fakeData
   * @param{any} args
   */
  constructor(module : any, method: string | any, fakeData: any, args?: any) {
    this._sandbox = createSandbox();

    if (args) {
      this._sandbox.stub(module, method).withArgs(args).returns(fakeData);
    } else {
      this._sandbox.stub(module, method).returns(fakeData);
    }
  }
  /**
   * close method
   * @method
   */
  close() {
    this._sandbox.restore();
  }
}
