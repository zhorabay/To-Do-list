import './style.css';
import UI from './modules/ui.js';

const taskList = document.getElementById('list-container');

const tasks = [
  {
    description: 'wash the dishes',
    completed: 'true' || 'false',
    index: 1
  },
  {
    description: 'complete To Do list project',
    completed: 'true' || 'false',
    index: 2
  }
]
function displayTasks() {
  let display = '';
  for (let i = 0; i < 2; i += 1) {
    display += `
                <div class="arrayobject">
                    <ul>
                        <li>${tasks[i].description}</li>
                        <li>${tasks[i].completed}</li>
                        <li>${tasks[i].index}</li>
                    </ul>
                </div>
    
       `;
  }
  taskList.innerHTML = display;
}

displayTasks();