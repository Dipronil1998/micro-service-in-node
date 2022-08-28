
import {invalidPageOrSize} from '../../../config/bootstrap';
import {Pagination} from '../Pagination';

const itemList = [
  {
    id: 1,
    my_field: 'a1',
  }, {
    id: 2,
    my_field: 'a2',
  },
  {
    id: 3,
    my_field: 'a3',
  },
  {
    id: 4,
    my_field: 'a4',
  },
  {
    id: 5,
    my_field: 'a5',
  },
];

describe('Test cases for Pagination', ()=>{
  test('Test cases for Pagination Page 2 and limit 2', ()=>{
    const pagiation:Pagination = new Pagination();
    let response = pagiation.pagination(itemList, 2, 2);
    expect(response).toBeDefined();
    expect(response.length).toEqual(2);
    expect(response[0].id).toEqual(itemList[2].id);
    response = pagiation.pagination(itemList, 1, 2);
    expect(response).toBeDefined();
    expect(response.length).toEqual(2);
    expect(response[0].id).toEqual(itemList[0].id);
  });

  test('Test cases for Pagination default value of Page and Size', ()=>{
    const pagiation:Pagination = new Pagination();
    const response = pagiation.pagination(itemList);
    expect(response).toBeDefined();
    expect(response.length).toEqual(itemList.length);
  });

  test('Test cases for Pagination Invalid Page or Size', ()=>{
    const pagiation:Pagination = new Pagination();
    const response = pagiation.pagination(itemList, 5, 4);
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
  });

  test('Test cases for Pagination with negetive page and size', ()=>{
    const pagiation:Pagination = new Pagination();
    let response = pagiation.pagination(itemList, -5, -4);
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
    response = pagiation.pagination(itemList, -5, 4);
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
    response = pagiation.pagination(itemList, 0, 0);
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
    response = pagiation.pagination(itemList, 2, -1);
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
  });
  test(`Test cases for Pagination with invalid 
        data type of page and size`, ()=>{
    const pagiation:Pagination = new Pagination();
    // @ts-ignore
    let response = pagiation.pagination(itemList, 'abc', 4);
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
    // @ts-ignore
    response = pagiation.pagination(itemList, 1, 'bcd');
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
  });
  test('Test cases for Pagination with float number of page and size', ()=>{
    const pagiation:Pagination = new Pagination();
    // @ts-ignore
    let response = pagiation.pagination(itemList, 0.1, 4);
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
    // @ts-ignore
    response = pagiation.pagination(itemList, 1, 7.3);
    expect(response).toBeDefined();
    expect(response).toEqual(invalidPageOrSize);
  });
});
