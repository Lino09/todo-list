/**
 * @jest-environment jsdom
 */
import * as edit from './functions';

jest.mock('./localLogic');

describe('Todo list tests', () => {
  describe('Todo list test Part 1', () => {
    test('add item & saveLocal', () => {
      document.body.innerHTML = '<input id=\'newTask\'>';
      document.querySelector('#newTask').value = '3';
      expect(edit.add([1, 2])).toEqual(
        expect.objectContaining({
          length: 3,
          local: [1, 2, { description: '3', isCompleted: false, index: 2 }],
        }),
      );
    });

    test('remove item', () => {
      expect(
        edit.removeThis({ name: 'thing', index: 3 }, [
          { name: 'thing', index: 3 },
          { name: 'other thing', index: 2 },
        ]),
      ).toEqual(
        expect.objectContaining({
          length: 1,
          local: [{ name: 'other thing', index: 0 }],
        }),
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
        taskText,
        item,
        list,
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

      expect(updatedList[0].isCompleted).toBeTruthy();
    });

    it('Should remove a all the completed tasks', () => {
      const list = [
        {
          description: 'I want to be completed',
          isCompleted: false,
          index: 2,
        },
        {
          description: 'I am an imposter',
          isCompleted: true,
          index: 1,
        },
      ];

      const updatedList = edit.removeDone(list);
      expect(updatedList).toEqual([
        {
          description: 'I want to be completed',
          isCompleted: false,
          index: 0,
        },
      ]);
    });

    it('Should update the index', () => {
      const list = [
        {
          description: 'I want to be completed',
          isCompleted: false,
          index: 22,
        },
        {
          description: 'I am an imposter',
          isCompleted: true,
          index: 11,
        },
      ];

      const updatedList = edit.updateIndex(list);

      expect(updatedList).toEqual([
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
      ]);
    });
  });
});
