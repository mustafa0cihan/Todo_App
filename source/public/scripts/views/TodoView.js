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
                this.showTodoForm();
            }
        });
    }

    showTodoForm() {
        this.app.innerHTML = `
            <form id="todo-form">
                <label>Title:</label>
                <input type="text" placeholder="Example">
                <label>Importance:</label>
                <input type="number" min="1" max="5" placeholder="5">
                <label>Due Date:</label>
                <input type="date">
                <label>Completed:</label>
                <input type="checkbox">
                <label>Description:</label>
                <textarea placeholder="Example Todo"></textarea>
                <button type="submit">Create</button>
            </form>
        `;

        document.getElementById('todo-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleFormSubmit();
        });
    }

    handleFormSubmit() {
        const title = document.querySelector('input[type="text"]').value;
        const importance = document.querySelector('input[type="number"]').value;
        const dueDate = document.querySelector('input[type="date"]').value;
        const description = document.querySelector('textarea').value;
        const completed = document.querySelector('input[type="checkbox"]').checked;

        const newTodo = {
            title,
            importance,
            dueDate,
            description,
            completed
        };

        const event = new CustomEvent('todoCreated', { detail: newTodo });
        document.dispatchEvent(event);
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

    showEditForm(todo) {
        this.app.innerHTML = `
            <form id="todo-form">
                <label>Title:</label>
                <input type="text" value="${todo.title}">
                <label>Importance:</label>
                <input type="number" min="1" max="5" value="${todo.importance}">
                <label>Due Date:</label>
                <input type="date" value="${todo.dueDate}">
                <label>Completed:</label>
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <label>Description:</label>
                <textarea>${todo.description}</textarea>
                <button type="submit">Update</button>
            </form>
        `;

        document.getElementById('todo-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const updatedTodo = {
                title: document.querySelector('input[type="text"]').value,
                importance: document.querySelector('input[type="number"]').value,
                dueDate: document.querySelector('input[type="date"]').value,
                description: document.querySelector('textarea').value,
                completed: document.querySelector('input[type="checkbox"]').checked
            };
            const updateEvent = new CustomEvent('updateTodo', { detail: { updatedTodo, index: todo.index } });
            document.dispatchEvent(updateEvent);
        });
    }
}

export default TodoView;
