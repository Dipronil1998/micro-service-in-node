import {FileSizeLimitAndExtensionException}
  from '../FileSizeLimitAndExtensionException';

describe('Test cases of File size limit Exception', ()=>{
  test('Test cases of File size limit Exception', ()=>{
    const message: string = 'File size limit';
    const exception: FileSizeLimitAndExtensionException =
      new FileSizeLimitAndExtensionException(message, 413);
    expect(exception instanceof FileSizeLimitAndExtensionException).toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(413);
  });
});
