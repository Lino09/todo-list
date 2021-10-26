// import _ from 'lodash';

import './style.css';

const list = [
  { description: 'Wash the dishes', isCompleted: false, index: 0 },
  { description: 'Write code', isCompleted: false, index: 1 },
  { description: 'Learn something new', isCompleted: false, index: 2 },
];

function checkAddress(checkbox){
  // console.log(checkbox.checked);
}

function listIt() {
  let listContent = '';
  list.forEach((item) => {
    listContent += `<li class="task"><input class="task-check" type="checkbox"><span>${item.description}</span><svg xmlns="http://www.w3.org/2000/svg" class="drag icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg></li>`;
  });
  document.querySelector('.list').innerHTML = listContent;
}

listIt();
document.querySelectorAll('.task-check').forEach((el) => {
  el.addEventListener('click', ()=> checkAddress(el))
});