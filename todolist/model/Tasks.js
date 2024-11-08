let ids = 0;
let tasks = [];

module.exports = {
  new(name, priority = "Baixa") {
    let task = { id: ++ids, name, priority, completed: false };
    tasks.push(task);
    return task;
  },
  update(id, name, priority) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      tasks[pos].name = name;
      tasks[pos].priority = priority;
    }
  },
  list() {
    return tasks;
  },
  getElementById(id) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      return tasks[pos];
    }
    return null;
  },
  getPositionById(id) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        return i;
      }
    }
    return -1;
  },
  delete(id) {
    let i = this.getPositionById(id);
    if (i >= 0) {
      tasks.splice(i, 1);
      return true;
    }
    return false;
  },
  toggleComplete(id) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      tasks[pos].completed = !tasks[pos].completed;
    }
  },
};
