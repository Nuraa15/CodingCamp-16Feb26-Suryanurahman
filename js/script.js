const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = [];

function addTodo() {
    const text = todoInput.value.trim();
    const date = dateInput.value;

    if (!text) return; 

    const newTodo = {
        id: Date.now(),
        text: text,
        date: date,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = '';
    renderTodos();
}

function renderTodos(filter = 'all') {
    const activeBtn = document.querySelector('.filter-btn.active');
    const currentFilter = filter === 'all' ? activeBtn.dataset.filter : filter;

    todoList.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'completed') return todo.completed;
        if (currentFilter === 'pending') return !todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');

        const dateDisplay = todo.date ? new Date(todo.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '';

        li.innerHTML = `
            <input type="checkbox" 
                   ${todo.completed ? 'checked' : ''} 
                   onchange="toggleComplete(${todo.id})">
            
            <div class="task-content">
                <span class="task-text">${todo.text}</span>
                ${dateDisplay ? `<span class="task-date">${dateDisplay}</span>` : ''}
            </div>

            <button class="delete-btn" onclick="deleteTodo(${todo.id})">&times;</button>
        `;
        todoList.appendChild(li);
    });
}

function toggleComplete(id) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderTodos(btn.dataset.filter);
    });
});

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});