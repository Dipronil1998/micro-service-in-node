import {DataNotFoundException} from '../DataNotFoundException';

describe('Test cases of Data not found Exception', ()=>{
  test('Test cases of Data not found Exception', ()=>{
    const message: string = 'Data not found';
    const exception: DataNotFoundException = new DataNotFoundException(message);
    expect(exception instanceof DataNotFoundException).toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(404);
  });
});
