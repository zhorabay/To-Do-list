import './style.css';
import UI from './modules/ui.js';

const taskList = new UI();

const displayTasks = () => {
  const listContainer = document.getElementById('list-container');
  listContainer.innerHTML = '';

  taskList.tasks.forEach((task, index) => {
    const listTasks = document.createElement('li');
    listTasks.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', () => taskList.toggleComplete(index));

    const description = document.createElement('span');
    description.textContent = task.description;
    description.ariaPlaceholder = 'Add to your list...';
    description.className = 'task-description';
    description.addEventListener('dblclick', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'edit-input';
      input.value = description.textContent;
      input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          const newDescription = input.value.trim();
          if (newDescription) {
            taskList.editTaskDescription(index, newDescription);
            displayTasks();
          }
        }
      });
      input.addEventListener('blur', () => {
        const newDescription = input.value.trim();
        if (newDescription) {
          taskList.editTaskDescription(index, newDescription);
          displayTasks();
        }
      });

      listTasks.replaceChild(input, description);
      input.focus();
    });

    const deleteButton = document.createElement('i');
    deleteButton.className = 'fa-solid fa-trash';
    deleteButton.addEventListener('click', () => {
      taskList.deleteTask(index);
      displayTasks();
    });

    listTasks.appendChild(checkbox);
    listTasks.appendChild(description);
    listTasks.appendChild(deleteButton);

    listContainer.appendChild(listTasks);
  });
};

document.getElementById('addbtn').addEventListener('click', () => {
  const inputBox = document.getElementById('input-box');
  const description = inputBox.value.trim();
  if (description) {
    taskList.addTask(description);
    inputBox.value = '';
    displayTasks();
  }
});

document.querySelector('.clearbtn').addEventListener('click', () => {
  taskList.clearCompleted();
  displayTasks();
});

const icon = document.getElementById('title-icon');

icon.addEventListener('mouseover', () => {
  icon.title = 'Click to reload the page';
});

icon.addEventListener('click', () => {
  localStorage.removeItem('tasks');
  window.location.reload();
});

displayTasks();