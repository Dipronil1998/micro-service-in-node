/**
 * Stack Data structure
 * @class{Stack}
 */
export class Stack<Type> {
  /**
     * Top of stack
     * @var{number}
     */
  private _top: number;
  /**
     * Data storage
     * @var{Array<Type>}
     */
  private _data: Array<Type>;
  /**
     * Constructor Method
     */
  constructor() {
    this._top = -1;
    this._data = [];
  }
  /**
     * Push Method
     * @param{Type} element
     */
  public push(element: Type) {
    this._data.push(element);
    this._top++;
  }
  /**
     * Check Stack is empty
     * @return{boolean}
     */
  public isEmpty(): boolean {
    if (this.size()==0) {
      return true;
    } else {
      return false;
    }
  }
  /**
     * Pop an element from stack
     * @return{Type}
     */
  public pop(): Type {
    if (this.isEmpty()) {
      throw Error('Stack underflow');
    } else {
      this._top--;
      // @ts-ignore
      return this._data.pop();
    }
  }
  /**
     * Get top element
     * @return{Type}
     */
  public peek(): Type {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }
    return this._data[this._top];
  }
  /**
     * Get no of elements
     * @return{number}
     */
  public size(): number {
    return this._data.length;
  }
}
