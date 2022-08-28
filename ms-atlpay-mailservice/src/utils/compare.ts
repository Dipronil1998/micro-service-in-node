import {deepEqual} from 'assert';
/**
 * Compare two object
 * @function
 * @param{any} objectOne
 * @param{any} objectTwo
 * @return{boolean}
 */
export function deepCompare(objectOne: any, objectTwo: any) : boolean {
  try {
    deepEqual(objectOne, objectTwo);
    return true;
  } catch {
    return false;
  }
}
export const isObject = function(object: any) {
  return object != null && typeof object === 'object';
};
