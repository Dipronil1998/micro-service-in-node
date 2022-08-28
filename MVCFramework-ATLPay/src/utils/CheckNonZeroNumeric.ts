/**
 * Check Non Zero Numeric value
 * @class
 */
export class CheckNonZeroNumeric {
  /**
   * Check number and returns two Decimal
   * @param{number} value
   * @return{boolean| string}
   */
  public checkValue(value: number): boolean| string {
    if (!isNaN(value) && value > 0) {
      return Number(value).toFixed(2);
    } else {
      return false;
    }
  }
}
