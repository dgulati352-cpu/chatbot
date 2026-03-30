/**
 * To-Do List Application
 * Features: add, complete, delete tasks; filter; local storage persistence.
 */

const STORAGE_KEY = 'todo-tasks';

// ── State ──────────────────────────────────────────────────────────────────
let tasks = [];
let currentFilter = 'all';
let nextId = Date.now();

// ── DOM References ─────────────────────────────────────────────────────────
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskCounter = document.getElementById('task-counter');
const errorMessage = document.getElementById('error-message');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// ── Local Storage ──────────────────────────────────────────────────────────
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    tasks = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(tasks)) tasks = [];
    // Ensure nextId is always greater than any stored id
    if (tasks.length > 0) {
      nextId = Math.max(nextId, ...tasks.map(t => t.id + 1));
    }
  } catch {
    tasks = [];
  }
}

// ── Task Operations ────────────────────────────────────────────────────────
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    showError('Task cannot be empty.');
    return false;
  }
  if (trimmed.length > 200) {
    showError('Task is too long (max 200 characters).');
    return false;
  }

  tasks.push({ id: nextId++, text: trimmed, completed: false });
  saveTasks();
  render();
  return true;
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  if (!confirm('Delete this task?')) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  const count = tasks.filter(t => t.completed).length;
  if (count === 0) return;
  if (!confirm(`Clear ${count} completed task${count > 1 ? 's' : ''}?`)) return;
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
}

function clearAll() {
  if (tasks.length === 0) return;
  if (!confirm('Clear ALL tasks? This cannot be undone.')) return;
  tasks = [];
  saveTasks();
  render();
}

// ── Filtering ──────────────────────────────────────────────────────────────
function getFilteredTasks() {
  switch (currentFilter) {
    case 'active':    return tasks.filter(t => !t.completed);
    case 'completed': return tasks.filter(t => t.completed);
    default:          return tasks;
  }
}

// ── Error / Validation ─────────────────────────────────────────────────────
function showError(msg) {
  errorMessage.textContent = msg;
  taskInput.classList.add('error');
}

function clearError() {
  errorMessage.textContent = '';
  taskInput.classList.remove('error');
}

// ── Rendering ──────────────────────────────────────────────────────────────
function render() {
  const filtered = getFilteredTasks();

  // Update counter
  const completed = tasks.filter(t => t.completed).length;
  taskCounter.textContent = `${completed} of ${tasks.length} task${tasks.length !== 1 ? 's' : ''} completed`;

  // Clear existing items (keep empty-state element)
  Array.from(taskList.children).forEach(child => {
    if (child !== emptyState) child.remove();
  });

  if (filtered.length === 0) {
    emptyState.style.display = '';
    emptyState.textContent =
      tasks.length === 0
        ? 'No tasks yet. Add one above!'
        : 'No tasks match this filter.';
    return;
  }

  emptyState.style.display = 'none';

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '&times;';
    delBtn.setAttribute('aria-label', `Delete "${task.text}"`);
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, span, delBtn);
    taskList.append(li);
  });
}

// ── Event Listeners ────────────────────────────────────────────────────────
addBtn.addEventListener('click', () => {
  if (addTask(taskInput.value)) {
    taskInput.value = '';
    taskInput.focus();
  }
});

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (addTask(taskInput.value)) {
      taskInput.value = '';
    }
  }
});

taskInput.addEventListener('input', clearError);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

// ── Init ───────────────────────────────────────────────────────────────────
loadTasks();
render();
