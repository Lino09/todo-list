/**
 * @jest-environment jsdom
 */
jest.mock('./localLogic');
import * as edit from  './functions.js';

describe('Add and remove suit', () => {

  test('add item', () => {
    document.body.innerHTML = `<input id='newTask'>`;
    document.querySelector('#newTask').value = '3';
    expect(edit.add([1, 2])).toEqual(expect.objectContaining({length:3, local: [1,2,{description: '3', isCompleted: false, index: 2 }]}))
  })
  
  test('remove item', () => {
    expect(edit.removeThis({name: 'thing', index: 3}, [{name: 'thing', index: 3},{name:'other thing', index: 2 }]))
    .toEqual(expect.objectContaining({length: 1, local:[{name:'other thing', index: 0}]}))
  })
  
})