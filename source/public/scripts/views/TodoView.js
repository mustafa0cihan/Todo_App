class TodoView {
    constructor() {
        this.app = document.getElementById('app');
        this.filterCompleted = false;
        this.activeSortButton = null;
        this.todos = [];
        this.originalTodos = [];
    }

    createMainPage() {
        this.app.innerHTML = `
            <div id="top-menu">
                <button id="create-todo-button">Create New Todo</button>
                <button id="toggle-style-button">Toggle Style</button>
            </div>
            <div id="sort-filter-section">
                <button id="by-name-button">By Name</button>
                <button id="by-due-date-button">By Due Date</button>
                <button id="by-creation-date-button">By Creation Date</button>
                <button id="importance-button">Importance</button>
                <button id="filter-completed-button">Filter Completed</button>
            </div>
            <div id="todo-list-section"></div>
        `;

        document.getElementById('create-todo-button').addEventListener('click', () => {
            const event = new CustomEvent('showCreateTodoForm');
            document.dispatchEvent(event);
        });

        document.getElementById('toggle-style-button').addEventListener('click', () => {
            this.toggleStyle();
        });

        document.getElementById('by-name-button').addEventListener('click', () => {
            this.toggleSortButton('by-name-button');
            const event = new CustomEvent('sortByName');
            document.dispatchEvent(event);
        });

        document.getElementById('by-due-date-button').addEventListener('click', () => {
            this.toggleSortButton('by-due-date-button');
            const event = new CustomEvent('sortByDueDate');
            document.dispatchEvent(event);
        });

        document.getElementById('by-creation-date-button').addEventListener('click', () => {
            this.toggleSortButton('by-creation-date-button');
            const event = new CustomEvent('sortByCreationDate');
            document.dispatchEvent(event);
        });

        document.getElementById('importance-button').addEventListener('click', () => {
            this.toggleSortButton('importance-button');
            const event = new CustomEvent('sortByImportance');
            document.dispatchEvent(event);
        });

        document.getElementById('filter-completed-button').addEventListener('click', () => {
            this.filterCompleted = !this.filterCompleted;
            const event = new CustomEvent('filterCompleted', { detail: this.filterCompleted });
            document.dispatchEvent(event);
            this.updateFilterCompletedButton();
        });
    }

    toggleStyle() {
        document.body.classList.toggle('dark-mode');
    }

    createTodoList(todos) {
        this.todos = todos;
        this.originalTodos = [...todos];
        this.renderTodoList(todos);
    }

    renderTodoList(todos) {
        const todoListSection = document.getElementById('todo-list-section');
        if (!todoListSection) {
            console.error('Todo list section not found');
            return;
        }

        if (todos.length === 0) {
            todoListSection.innerHTML = 'No Todos Found';
            return;
        }

        todoListSection.innerHTML = `
            <ul>
                ${todos.map(todo => `
                    <li id="todo-${todo._id}" class="todo-card ${todo.completed ? 'completed' : 'not-completed'}">
                        <div class="due-date-status">
                            <div class="due-date">${this.formatDueDate(todo.dueDate, todo.completed)}</div>
                            <div class="status">
                                <input type="checkbox" id="status-${todo._id}" ${todo.completed ? 'checked' : ''}>
                                <span class="checkmark"></span>
                                ${todo.completed ? 'Completed' : 'Open'}
                            </div>
                        </div>
                        <div class="title-description">
                            <div class="title">${todo.title}</div>
                            <div class="description">${todo.description}</div>
                        </div>
                        <div class="importance-edit">
                            <div class="importance">
                                ${'★'.repeat(todo.importance)}
                            </div>
                            <button class="edit-button" data-id="${todo._id}">Edit</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const todoId = event.target.getAttribute('data-id');
                const todo = todos.find(t => t._id === todoId);
                const eventDetail = new CustomEvent('editTodo', { detail: { todo, index: todo._id } });
                document.dispatchEvent(eventDetail);
            });
        });

        document.querySelectorAll('.status input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const todoId = event.target.id.split('-')[1];
                const todo = todos.find(t => t._id === todoId);
                todo.completed = event.target.checked;
                const eventDetail = new CustomEvent('toggleTodoStatus', { detail: todo });
                document.dispatchEvent(eventDetail);
            });
        });
    }

    addTodoToList(todo) {
        this.todos.push(todo);
        this.renderTodoList(this.todos);
    }

    updateTodoInList(updatedTodo) {
        const index = this.todos.findIndex(todo => todo._id === updatedTodo._id);
        if (index !== -1) {
            this.todos[index] = updatedTodo;
            this.renderTodoList(this.todos);
        }
    }

    updateFilterCompletedButton() {
        const filterButton = document.getElementById('filter-completed-button');
        if (this.filterCompleted) {
            filterButton.style.backgroundColor = 'green';
        } else {
            filterButton.style.backgroundColor = '';
        }
    }

    toggleSortButton(buttonId) {
        const buttons = ['by-name-button', 'by-due-date-button', 'by-creation-date-button', 'importance-button'];
        buttons.forEach(id => {
            document.getElementById(id).style.backgroundColor = '';
        });

        if (this.activeSortButton === buttonId) {
            this.activeSortButton = null;
            this.renderTodoList(this.originalTodos);
        } else {
            this.activeSortButton = buttonId;
            document.getElementById(buttonId).style.backgroundColor = 'green';
        }
    }

    formatDueDate(dueDate, completed) {
        const now = new Date();
        const date = new Date(dueDate);
        const diffTime = completed ? now - date : date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (completed) {
            if (diffDays <= 1) {
                return 'a day ago';
            } else if (diffDays <= 3) {
                return 'somedays ago';
            } else if (diffDays <= 7) {
                return 'in 7 days ago';
            } else {
                return 'more than 7 days ago';
            }
        } else {
            if (diffDays <= 1) {
                return 'in a day';
            } else if (diffDays <= 3) {
                return 'somedays';
            } else if (diffDays <= 7) {
                return 'in 7 days';
            } else {
                return 'more than 7 days';
            }
        }
    }
}

export default TodoView;

