import * as compare from './../compare';

describe('Testing for isObject function', ()=>{
  test('test isObject invalid Input', ()=>{
    const invalidObject : string ='abc';
    const result :boolean = compare.isObject(invalidObject);
    expect(result).toBe(false);
    expect(compare.isObject(null)).toBe(false);
  });

  test('test isObject valid Input', ()=>{
    const validObject = {'key': 'value'};
    const result :boolean = compare.isObject(validObject);
    expect(result).toBe(true);
  });
});

describe('Testing of deepCompare comapring two object', ()=>{
  test('test deepCompare on Invalid Input', ()=>{
    const invalidObjectOne = 'invalidData';
    const invalidObjectTwo = 'invalid-Data';
    const result = compare.deepCompare(invalidObjectOne, invalidObjectTwo);
    expect(result).toBe(false);
  });

  test('test deepCompare on dissimilar inputs', ()=>{
    const objectOne = {'key': 'data'};
    const objectTwo = {'key': 'data1'};

    const result = compare.deepCompare(objectOne, objectTwo);
    expect(result).toBe(false);
  });
  test('test deepCompare on different input of different key', ()=>{
    const objectOne = {'key': 'data', 'key2': 'data2'};
    const objectTwo = {'key': 'data'};

    const result = compare.deepCompare(objectOne, objectTwo);
    expect(result).toBe(false);
  });

  test('test deepCompare on different input having different data value', ()=>{
    const objectOne = {'key': 'data', 'key2': 'data2'};
    const objectTwo = {'key': 'data', 'key2': 'data'};
    const result = compare.deepCompare(objectOne, objectTwo);
    expect(result).toBe(false);
  });

  test('test deepCompare on different input having different key', ()=>{
    const objectOne = {'key': 'data', 'key2': 'data2'};
    const objectTwo = {'key': 'data', 'keyextra': 'data'};
    const result = compare.deepCompare(objectOne, objectTwo);
    expect(result).toBe(false);
  });
  test('test deepCompare with similar objects', ()=>{
    let objectOne = {};
    let objectTwo = {};
    let result = compare.deepCompare(objectOne, objectTwo);
    expect(result).toBe(true);
    objectOne = {'key': 'value'};
    objectTwo = {'key': 'value'};
    result = compare.deepCompare(objectOne, objectTwo);
    expect(result).toBe(true);
    const nullobjectOne = null;
    const nullobjectTwo = null;
    result = compare.deepCompare(nullobjectOne, nullobjectTwo);
    expect(result).toBe(true);
  });
});
