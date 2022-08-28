import {AppRepository, RepositoryParameter} from './AppRepository';
import {PaymentInstrument} from '../entity/PaymentInstrument';
import {InstrumentCharge} from '../entity/InstrumentCharge';
import {getConnection} from 'typeorm';
import {InstrumentCharges} from './InstrumentCharges';

/**
 * Payment Method Charges Repository
 * @class{PaymentMethodCharges}
 * @extends{AppRepository}
 */
export class PaymentInstruments extends AppRepository {
  private _count: number = 0;
  private _modifedPaymentInstruments: any = [];
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
  /**
   * Depth first search
   * @param{any} paymentInstruments
   * @param{PaymentMethodCharge} node
   */
  private DFS(paymentInstruments: any, node: PaymentInstrument) {
    node.left = this._count + 1;
    this._count = this._count + 1;
    // @ts-ignore
    node.vistied = true;
    const child: Array<any> = paymentInstruments.filter((element: any) => {
      return element._parent && element._parent._id === node.id;
    });
    for (let index = 0;
      index < child.length && (!child[index]['vistied']);
      index++) {
      this.DFS(paymentInstruments, child[index]);
    }
    node.right = this._count + 1;
    this._count = this._count + 1;
    this._modifedPaymentInstruments.push(node);
  }
  // calculate number of siblings
  public calculate = async (): Promise<void> => {
    const paymentInstrumentTree = (await
    this.getPaymentInstrumentInfo())
        .map((element: any) => {
          element.left = null;
          element.right = null;
          element['vistied'] = false;
          return element;
        });

    const root = paymentInstrumentTree.filter((element) => {
      return element.title == 'Root';
    })[0];
    this.DFS(paymentInstrumentTree, root);
    this._modifedPaymentInstruments.map((element: any) => {
      delete element['vistied'];
    });
    this._modifedPaymentInstruments
        .forEach(async (element: PaymentInstrument) => {
          await this.save(element);
        });
    this._count =0;
  };
  /**
   * Get Root of Payment Insturment charge tree
   * @return{Promise<PaymentInstrument>}
   */
  public getRoot = async (): Promise<PaymentInstrument> => {
    const root: PaymentInstrument =
      await this.getOnCondition({_title: 'Root'});
    return root;
  };
  /**
   * Get Payment Insturment charge tree
   * @return{Promise<Array<PaymentMethodCharge>>}
   *
   */
  public getPaymentInstrumentInfo =
    async (): Promise<Array<PaymentInstrument>> => {
      const paymentInstruments: Array<PaymentInstrument> =
        await this.find();
      return paymentInstruments;
    };
  /**
   * getInsturmentChargeId method
   * @param{string} id
   * @return{Promise<InstrumentCharge| boolean>} instrumentCharge
   */
  public getInsturmentCharge =
    async (id : string ): Promise<InstrumentCharge| boolean> => {
      const InstrumentChargeParameter: RepositoryParameter =
        new RepositoryParameter(
            'InstrumentCharge',
            InstrumentCharge,
            this.dataBasename,
            'none',
            getConnection(this.dataBasename),
        );
      const instrumentChargeRepo: InstrumentCharges =
        new InstrumentCharges(InstrumentChargeParameter);
      const instrumentCharge: InstrumentCharge =
      await instrumentChargeRepo.getOnCondition({_id: id});
      return instrumentCharge;
    };
}
