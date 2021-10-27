import * as task from './functions.js'
import './style.css';

export let list = [
  { description: 'Wash the dishes', isCompleted: false, index: 0 },
  { description: 'Write code', isCompleted: false, index: 1 },
  { description: 'Learn something new', isCompleted: false, index: 2 },
];



function listIt() {
  if(window.localStorage.getItem('todos')){
    let todos = window.localStorage.getItem('todos')
    list =  JSON.parse(todos)
  }
  document.querySelector('.list').innerHTML = '';
  list.forEach((item) => {
    let taskElement = document.createElement('li');
    taskElement.classList.add('task');
    if(item.isCompleted){
      taskElement.classList.add('completed')
    }
    let checker = document.createElement('input');
    checker.type = 'checkbox';
    checker.classList.add('task-check');
    checker.addEventListener('click',() => {
      task.toggle(item,list);
      listIt();
    })
    checker.checked = item.isCompleted;
    taskElement.appendChild(checker);
    let taskText = document.createElement('input');
    taskText.classList = 'task-text'
    taskText.value = item.description;
    taskText.addEventListener('change',()=> {
      if(taskText.value.length > 0){
        item.description = taskText.value;
        task.saveLocal(list)
      }
    })
    taskElement.appendChild(taskText);
    let dragIcon = document.createElement('i')
    dragIcon.classList = 'fas fa-ellipsis-v drag icon'
    taskElement.appendChild(dragIcon);
    taskElement.draggable = 'true'
    document.querySelector('.list').appendChild(taskElement);
  });
}

listIt();
document.querySelector('#taskForm').addEventListener('submit',(event) => {
  event.preventDefault()
  task.add(list)
  listIt()
})
document.querySelector('.clearer').addEventListener('click',() => {
  task.removeDone(list)
  listIt()
})