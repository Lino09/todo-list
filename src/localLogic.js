function saveLocal(list) {
  window.localStorage.setItem('todos', JSON.stringify(list));
}
module.exports = saveLocal;