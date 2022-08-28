import {InputDocumentException} from '../InputDocumentException';

describe('Test cases of Input Document Exception', ()=>{
  test('Test cases of Input Document Exception', ()=>{
    const message: string = 'Input Document';
    const exception: InputDocumentException =
      new InputDocumentException(message);
    expect(exception instanceof InputDocumentException).toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(400);
  });
});
