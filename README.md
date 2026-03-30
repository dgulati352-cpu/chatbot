# 📝 To-Do List App

A fully functional, offline-capable to-do list application built with plain HTML, CSS, and JavaScript — no frameworks or backend required.

## ✨ Features

- **Add tasks** via button click or pressing Enter
- **Complete/incomplete** toggle with checkbox
- **Delete tasks** with a confirmation prompt
- **Clear completed** or **clear all** tasks
- **Filter** tasks by All / Active / Completed
- **Task counter** showing completed vs. total tasks
- **Local storage** persistence — tasks survive page reloads
- **Input validation** with user-friendly error messages
- **Responsive design** — works on desktop and mobile

## 🚀 How to Use

1. Open `index.html` in any modern browser (no server needed)
2. Type a task in the input field and click **Add** or press **Enter**
3. Click the checkbox to mark a task as complete
4. Click **×** on a task to delete it
5. Use **Clear Completed** to remove finished tasks
6. Use **Clear All** to remove every task

## 📁 Project Structure

```
├── index.html    # App structure and layout
├── styles.css    # Styling and responsive design
├── script.js     # App logic and local storage
└── README.md     # This file
```

## 🛠️ Technical Details

| Feature | Implementation |
|---|---|
| Persistence | `localStorage` (key: `todo-tasks`, JSON) |
| Task IDs | `Date.now()` timestamps |
| Filtering | In-memory filter over loaded tasks |
| Validation | Empty check + 200-character limit |
| Accessibility | ARIA labels on interactive elements |

## 🌐 Hosting

You can host this app for free on **GitHub Pages**:

1. Go to your repository **Settings → Pages**
2. Set the source to the branch containing these files
3. Your app will be live at `https://<username>.github.io/<repo>/`
