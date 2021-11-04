/**
 * @jest-environment jsdom
 */
jest.mock('./localLogic');
import * as edit from './functions.js';

describe('Todo list tests', () => {
  describe('Todo list test Part 1', () => {
    test('add item & saveLocal', () => {
      document.body.innerHTML = `<input id='newTask'>`;
      document.querySelector('#newTask').value = '3';
      expect(edit.add([1, 2])).toEqual(
        expect.objectContaining({
          length: 3,
          local: [1, 2, { description: '3', isCompleted: false, index: 2 }],
        })
      );
    });

    test('remove item', () => {
      expect(
        edit.removeThis({ name: 'thing', index: 3 }, [
          { name: 'thing', index: 3 },
          { name: 'other thing', index: 2 },
        ])
      ).toEqual(
        expect.objectContaining({
          length: 1,
          local: [{ name: 'other thing', index: 0 }],
        })
      );
    });
  });

  describe('Todo list test Part 2', () => {
    it('edit description', () => {
      const taskText = { value: 'Abel is a great partner' };
      const item = {
        description: 'Abel is a good partner',
        isCompleted: true,
        index: 0,
      };
      const list = [
        {
          description: 'Abel is a good partner',
          isCompleted: true,
          index: 0,
        },
        {
          description: 'Carlos is not here',
          isCompleted: true,
          index: 1,
        },
      ];

      const editedItem = edit.editDescription({
        taskText: taskText,
        item: item,
        list: list,
      });

      expect(editedItem.description).toBe('Abel is a great partner');
    });
    it('Changing completion state of a task', () => {
      const el = {
        description: 'I want to be completed',
        isCompleted: false,
        index: 0,
      };
      const list = [
        {
          description: 'I want to be completed',
          isCompleted: false,
          index: 0,
        },
        {
          description: 'I am an imposter',
          isCompleted: true,
          index: 1,
        },
      ];

      const updatedList = edit.toggle(el, list);
      console.log(updatedList);

      expect(updatedList[0].isCompleted).toBeTruthy();
    });
  });
});
