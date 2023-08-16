import Task from './task.js';

export default class UI {
  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(description) {
    if (description.trim() !== '') {
      const newTask = new Task(description);
      this.tasks.push(newTask);
      this.updateIndexes();
      this.saveTasks();
    }
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.updateIndexes();
    this.saveTasks();
  }

  updateIndexes() {
    this.tasks.forEach((task, idx) => {
      task.index = idx + 1;
    });
  }

  toggleComplete(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = !this.tasks[index].completed;
      this.saveTasks();
    }
  }

  editTaskDescription(index, newDescription) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].description = newDescription;
      this.saveTasks();
    }
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.updateIndexes();
    this.saveTasks();
  }
}