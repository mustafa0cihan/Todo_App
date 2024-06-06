class TodoView {
    constructor() {
        this.app = document.getElementById('app');
    }

    createMainPage() {
        this.app.innerHTML = `
            <button id="create-todo-button">Create New Todo</button>
            <button id="toggle-style-button">Toggle Style</button>
            <div id="sort-filter-section">
                <button id="by-name-button">By Name</button>
                <button id="by-due-date-button">By Due Date</button>
                <button id="by-creation-date-button">By Creation Date</button>
                <button id="importance-button">Importance</button>
                <button id="filter-completed-button">Filter Completed</button>
            </div>
            <div id="todo-list-section"></div>
        `;

        this.app.addEventListener('click', (event) => {
            if (event.target.id === 'create-todo-button') {
                const createEvent = new CustomEvent('showCreateTodoForm');
                document.dispatchEvent(createEvent);
            } else if (event.target.id === 'toggle-style-button') {
                document.body.classList.toggle('dark-mode');
            }
        });
    }

    createTodoList(todos) {
        const todoListSection = document.getElementById('todo-list-section');
        if (!todoListSection) {
            console.error('Todo list section not found');
            return;
        }

        todoListSection.innerHTML = '';
        if (todos.length === 0) {
            todoListSection.textContent = 'No Todos Found';
            return;
        }

        const ul = document.createElement('ul');
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${todo.title} - ${todo.description} - ${todo.importance} - ${todo.dueDate} - ${todo.completed ? 'Completed' : 'Not Completed'}
                <button class="edit-button" data-index="${index}">Edit</button>
            `;

            ul.appendChild(li);
        });
        todoListSection.appendChild(ul);

        todoListSection.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-button')) {
                const index = event.target.getAttribute('data-index');
                const eventDetail = new CustomEvent('editTodo', { detail: { todo: todos[index], index: parseInt(index, 10) } });
                document.dispatchEvent(eventDetail);
            }
        });
    }
}

export default TodoView;
