/**
 * Queue Data structure
 * @class{Queue}
 */
export class Queue<Type> {
  /**
     * Data storage
     * @var{Array<Type>}
     */
  private _data : Array<Type>;
  /**
     * Constructor Method
     */
  constructor() {
    this._data =[];
  }
  /**
     * Enqueue Method
     * @param{Type} element
     */
  public enqueue(element: Type) {
    this._data.push(element);
  }
  /**
     * Dequeue Method
     * @return{Type} element
     */
  public dequeue(): Type {
    if (this.isEmpty()) {
      throw new Error('Stack Underflow');
    }
    // @ts-ignore
    return this._data.shift();
  }
  /**
     * Check queue is empty
     * @return{boolean}
     */
  public isEmpty(): boolean {
    if (this.size() === 0) {
      return true;
    } else {
      return false;
    }
  }
  /**
     * Get number of elements
     * @return{number}
     */
  public size(): number {
    return this._data.length;
  }
}
