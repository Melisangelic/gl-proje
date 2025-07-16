const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskPriority = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Sayfa yüklendiğinde görevleri getir
window.addEventListener('DOMContentLoaded', loadTasks);

// Yeni görev ekleme
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const dateValue = taskDate.value;
  const priorityValue = taskPriority.value;

  if (taskText === '') return;

  const newTask = {
    id: Date.now().toString(),
    text: taskText,
    date: dateValue,
    priority: priorityValue
  };

  tasks.push(newTask);
  saveTasks();
  addTaskToDOM(newTask);

  taskInput.value = '';
  taskDate.value = '';
  taskPriority.value = 'Düşük';
});

// Görevi DOM’a ekle
function addTaskToDOM(task) {
  const li = document.createElement('li');

  const priorityClass =
    task.priority === 'Yüksek' ? 'priority-high' :
    task.priority === 'Orta' ? 'priority-medium' :
    'priority-low';

  li.innerHTML = `
    <strong>${task.text}</strong><br>
    📅 ${task.date || 'Tarih yok'}<br>
    🚦 <span class="${priorityClass}">${task.priority}</span>
  `;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Sil';
  deleteBtn.className = 'delete-btn';

  deleteBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    li.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Tüm görevleri yükle
function loadTasks() {
  tasks.forEach(addTaskToDOM);
}




