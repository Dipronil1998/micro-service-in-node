import {fileSize} from './../bootstrap';
describe('Test cases for environment variable', ()=>{
  test('Test case for filesize', ()=>{
    expect(fileSize).toEqual(2097152);
  });
});
