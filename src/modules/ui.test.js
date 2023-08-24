import UI from './ui.js';

const jsdom = require('jsdom-global')();

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

document.body.innerHTML = `
  <ul id="task-list">
    <!-- Task items will be added/removed here -->
  </ul>
`;

describe('UI class tests', () => {
  let ui;

  beforeEach(() => {
    ui = new UI();
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    document.getElementById('task-list').innerHTML = '';
  });

  // Test addTask function
  describe('addTask', () => {
    test('should add a new task to the UI', () => {
      const initialTaskCount = ui.tasks.length;
      const description = 'New Task';

      ui.addTask(description);

      expect(ui.tasks.length).toBe(initialTaskCount + 1);

      const taskList = document.getElementById('task-list');
      expect(taskList.children.length).toBe(initialTaskCount + 1);
    });

    test('should not add a task with empty description', () => {
      const initialTaskCount = ui.tasks.length;

      ui.addTask('');

      expect(ui.tasks.length).toBe(initialTaskCount);

      const taskList = document.getElementById('task-list');
      expect(taskList.children.length).toBe(initialTaskCount);
    });
  });

  // Test deleteTask function
  describe('deleteTask', () => {
    test('should delete a task from the UI', () => {
      ui.addTask('Task to delete');
      const initialTaskCount = ui.tasks.length;

      ui.deleteTask(0);

      expect(ui.tasks.length).toBe(initialTaskCount - 1);

      const taskList = document.getElementById('task-list');
      expect(taskList.children.length).toBe(initialTaskCount - 1);
    });

    test('should not delete a task with an invalid index', () => {
      const initialTaskCount = ui.tasks.length;

      ui.deleteTask(-1);

      expect(ui.tasks.length).toBe(initialTaskCount);

      const taskList = document.getElementById('task-list');
      expect(taskList.children.length).toBe(initialTaskCount);
    });
  });
});
