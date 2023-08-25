import UI from './ui.js';
import Task from './task.js';

const jsdom = require('jsdom-global')(); // eslint-disable-line no-unused-vars

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

document.getElementById = jest.fn();

const mockTaskList = {
  children: [],
  removeChild: jest.fn(),
};

describe('Edit Task Description', () => {
  let ui;

  beforeEach(() => {
    global.localStorage = mockLocalStorage;
    document.getElementById.mockReturnValue(mockTaskList);
    ui = new UI();
  });

  afterEach(() => {
    jest.clearAllMocks();
    ui = null;
  });

  it('should edit task description and update localStorage', () => {
    const initialDescription = 'Initial Task Description';
    const newDescription = 'Updated Task Description';
    const task = new Task(initialDescription);
    ui.tasks.push(task);
    ui.saveTasks();

    ui.editTaskDescription(0, newDescription);

    expect(ui.tasks[0].description).toBe(newDescription);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(ui.tasks));
  });
});
