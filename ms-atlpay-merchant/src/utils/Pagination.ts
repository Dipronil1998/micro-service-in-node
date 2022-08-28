import {invalidPageOrSize} from '../../config/bootstrap';

/**
 * Pagination Class
 * @class{Pagination}
 */
export class Pagination {
  /**
  * Pagination method
  * @param{any} rows
  * @param{number} page
  * @param{number} size
  * @return{any} filteredRows
  */
  public pagination(rows: any, page: number = 1, size: number = 10): any {
    page = Number(page);
    size = Number(size);
    if (Number.isInteger(page)&& Number.isInteger(size)&& page>0 && size>0) {
      const startIndex = (page - 1) * size;
      const endIndex = page * size;
      const filteredRows: any = rows.slice(startIndex, endIndex);
      if (Object.keys(filteredRows).length > 0) {
        return filteredRows;
      } else {
        return invalidPageOrSize;
      }
    } else {
      return invalidPageOrSize;
    }
  }
}
