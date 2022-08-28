import {invalidPageOrSize} from '../../config/bootstrap';

/**
 * pagination Class
 * @class
 */
export class Pagination {
  /**
        * pagination method
        * @param{any} tableData
        * @param{mumber} page
        * @param{number} size
        * @return{any} result
        */
  public pagination(tableData: any, page: number = 1, size: number = 10): any {
    if (Number.isInteger(page)&& Number.isInteger(size)&& page>0 && size>0) {
      const startIndex = (page - 1) * size;
      const endIndex = page * size;
      const result: any = tableData.slice(startIndex, endIndex);
      if (Object.keys(result).length > 0) {
        return result;
      } else {
        return invalidPageOrSize;
      }
    } else {
      return invalidPageOrSize;
    }
  }
}
