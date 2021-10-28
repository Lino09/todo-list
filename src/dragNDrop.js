import * as task from './functions.js';
import {listIt} from './index.js';

let dragStartIndex;

function swapItems(startIndex, endIndex,list) {
 const itemOne = list[startIndex];
 const itemTwo = list[endIndex];
 list[startIndex] = itemTwo;
 list[endIndex] = itemOne;
 task.saveLocal(list);
 listIt();
}

function dragStart(i) {
 dragStartIndex = i;
}

function dragOver() {
  event.preventDefault();
}

function drop(draggable, index, list) {
  const dragEndIndex = index;
  swapItems(dragStartIndex, dragEndIndex, list);
   draggable.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

export function addEvents(list) {
  const draggables = document.querySelectorAll('.draggable');
  draggables.forEach( (draggable, index) => {
    draggable.addEventListener('dragstart', () => {
      dragStart(index);
    });
    draggable.addEventListener('dragover', dragOver);
    draggable.addEventListener('drop', () =>{
      drop(draggable,index,list);
    });
    draggable.addEventListener('dragenter', dragEnter);
    draggable.addEventListener('dragleave', dragLeave);
  })
}