import * as task from './functions';
import addEvents from './dragNDrop'; // eslint-disable-line
import './style.css';

let list = [];

function listIt() {
  if (window.localStorage.getItem('todos')) {
    const todos = window.localStorage.getItem('todos');
    list = JSON.parse(todos);
  }
  document.querySelector('.list').innerHTML = '';
  list.forEach((item) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task', 'draggable');
    if (item.isCompleted) {
      taskElement.classList.add('completed');
    }
    const delBtn = document.createElement('button');
    const delIcon = document.createElement('i');
    delIcon.classList = 'far fa-trash-alt icon del';
    delBtn.appendChild(delIcon);
    delBtn.classList.add('del-container');
    delBtn.addEventListener('click', () => {
      task.removeThis(item, list);
      listIt();
    });
    const checker = document.createElement('input');
    checker.type = 'checkbox';
    checker.classList.add('task-check');
    checker.addEventListener('click', () => {
      task.toggle(item, list);
      listIt();
    });
    checker.checked = item.isCompleted;
    const taskText = document.createElement('input');
    taskText.classList = 'task-text';
    taskText.value = item.description;
    taskText.addEventListener('change', () => {
      task.editDescription({ taskText, item, list });
    });
    const dragIcon = document.createElement('i');
    dragIcon.classList = 'fas fa-ellipsis-v drag icon';
    taskElement.append(delBtn, checker, taskText, dragIcon);
    taskElement.draggable = 'true';
    document.querySelector('.list').appendChild(taskElement);
  });
  document.querySelector('.input-task').focus();
  addEvents(list);
}

listIt();
document.querySelector('#taskForm').addEventListener('submit', (event) => {
  event.preventDefault();
  task.add(list);
  listIt();
});
document.querySelector('.clearer').addEventListener('click', () => {
  task.removeDone(list);
  listIt();
});

export default listIt;
