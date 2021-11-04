// import saveLocal from './localLogic'
const saveLocal = require('./localLogic');

export function updateIndex(list) {
  let i = 0;
  list.forEach((el) => {
    el.index = i;
    i += 1;
  });
  return list;
}

export function toggle(el, list) {
  list.forEach((task) => {
    if (task.index === el.index) {
      task.isCompleted = !task.isCompleted;
    }
  });
  saveLocal(list);
  return list;
}

export function editDescription({ taskText, item, list }) {
  if (taskText.value.length > 0) {
    item.description = taskText.value;
    saveLocal(list);
    return item;
  }
  return item;
}

export function add(list) {
  list.push({
    description: document.querySelector('#newTask').value,
    isCompleted: false,
    index: list.length,
  });
  document.querySelector('#newTask').value = '';

  return { length: list.length, local: saveLocal(list) };
}

export function removeThis(task, list) {
  list = list.filter((el) => el.index !== task.index);
  updateIndex(list);
  saveLocal(list);
  return { length: list.length, local: saveLocal(list) };
}

export function removeDone(list) {
  list = list.filter((el) => el.isCompleted === false);
  updateIndex(list);
  saveLocal(list);
  return list;
}
