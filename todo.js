/* ─── To-Do List – JavaScript ────────────────────────────────────────── */

const STORAGE_KEY = 'todo_tasks';

/* ── State ─────────────────────────────────────────────────────────────── */
let tasks  = [];           // [{ id, text, completed, createdAt }]
let filter = 'all';        // 'all' | 'active' | 'completed'
let editingId = null;      // id of task being edited (null = none)

/* ── DOM References ─────────────────────────────────────────────────────── */
const taskInput        = document.getElementById('task-input');
const addBtn           = document.getElementById('add-btn');
const taskList         = document.getElementById('task-list');
const emptyMsg         = document.getElementById('empty-msg');
const filterBtns       = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const clearAllBtn       = document.getElementById('clear-all-btn');

const editModal        = document.getElementById('edit-modal');
const modalOverlay     = document.getElementById('modal-overlay');
const editInput        = document.getElementById('edit-input');
const saveEditBtn      = document.getElementById('save-edit-btn');
const cancelEditBtn    = document.getElementById('cancel-edit-btn');

const statTotal        = document.getElementById('stat-total');
const statPending      = document.getElementById('stat-pending');
const statCompleted    = document.getElementById('stat-completed');

/* ── Persistence ────────────────────────────────────────────────────────── */
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('localStorage write failed:', e);
  }
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('localStorage read failed:', e);
    tasks = [];
  }
}

/* ── Task Operations ─────────────────────────────────────────────────────── */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    showInputError();
    return;
  }
  tasks.push({ id: generateId(), text: trimmed, completed: false, createdAt: Date.now() });
  saveTasks();
  render();
  taskInput.value = '';
  taskInput.focus();
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
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function startEdit(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  editingId = id;
  editInput.value = task.text;
  openModal();
  editInput.focus();
  editInput.select();
}

function saveEdit() {
  const trimmed = editInput.value.trim();
  if (!trimmed) {
    editInput.classList.add('error');
    setTimeout(() => editInput.classList.remove('error'), 600);
    editInput.focus();
    return;
  }
  const task = tasks.find(t => t.id === editingId);
  if (task) {
    task.text = trimmed;
    saveTasks();
    render();
  }
  closeModal();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
}

function clearAll() {
  if (!tasks.length) return;
  if (!window.confirm('Delete all tasks? This cannot be undone.')) return;
  tasks = [];
  saveTasks();
  render();
}

/* ── UI Helpers ─────────────────────────────────────────────────────────── */
function showInputError() {
  taskInput.classList.add('error');
  setTimeout(() => taskInput.classList.remove('error'), 600);
  taskInput.focus();
}

function openModal() {
  editModal.classList.add('open');
  modalOverlay.classList.add('open');
}

function closeModal() {
  editModal.classList.remove('open');
  modalOverlay.classList.remove('open');
  editingId = null;
}

/* ── Render ─────────────────────────────────────────────────────────────── */
function getFilteredTasks() {
  switch (filter) {
    case 'active':    return tasks.filter(t => !t.completed);
    case 'completed': return tasks.filter(t =>  t.completed);
    default:          return tasks;
  }
}

function updateStats() {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending   = total - completed;
  statTotal.textContent     = `Total: ${total}`;
  statPending.textContent   = `Pending: ${pending}`;
  statCompleted.textContent = `Completed: ${completed}`;
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item${task.completed ? ' completed' : ''}`;
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type    = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.className = 'task-checkbox';
  checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = '✏️ Edit';
  editBtn.setAttribute('aria-label', `Edit task: ${task.text}`);
  editBtn.addEventListener('click', () => startEdit(task.id));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '🗑 Delete';
  deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

function render() {
  updateStats();

  const visible = getFilteredTasks();

  taskList.innerHTML = '';
  visible.forEach(task => taskList.appendChild(createTaskElement(task)));

  emptyMsg.classList.toggle('visible', visible.length === 0);
}

/* ── Event Listeners ────────────────────────────────────────────────────── */
addBtn.addEventListener('click', () => addTask(taskInput.value));

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask(taskInput.value);
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

saveEditBtn.addEventListener('click', saveEdit);
cancelEditBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

editInput.addEventListener('keydown', e => {
  if (e.key === 'Enter')  saveEdit();
  if (e.key === 'Escape') closeModal();
});

/* Keyboard shortcut: Alt+N – focus the new-task input */
document.addEventListener('keydown', e => {
  if (e.altKey && e.key === 'n') {
    e.preventDefault();
    taskInput.focus();
  }
});

/* ── Boot ────────────────────────────────────────────────────────────────── */
loadTasks();
render();
