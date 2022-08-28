import {Stack} from '../Stack';

describe('Test cases of stack operation', ()=>{
  test('Create Number data type stack', ()=>{
    const stack: Stack<number> =new Stack<number>();
    expect(stack instanceof Stack).toBe(true);
  });
  test('Different operation of Stack', ()=>{
    const stack: Stack<number> =new Stack<number>();
    expect(stack.isEmpty()).toBe(true);
    stack.push(10);
    expect(stack.peek()).toEqual(10);
    stack.push(20);
    stack.push(30);
    expect(stack.size()).toEqual(3);
    expect(stack.pop()).toEqual(30);
    expect(stack.isEmpty()).toBe(false);
  });
});
