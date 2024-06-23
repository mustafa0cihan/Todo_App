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

    formatDueDate(dueDate, completed, completionDate = null) {
        const now = new Date();
        const date = new Date(dueDate);
    
        // Tarihlerin sadece yıl, ay ve gün bileşenlerini karşılaştırmak için sıfırlama
        const clearTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
        const clearNow = clearTime(now);
        const clearDate = clearTime(date);
    
        const completion = completionDate ? clearTime(new Date(completionDate)) : clearNow;
    
        const dueDiffTime = clearDate - clearNow;
        const dueDiffDays = Math.ceil(Math.abs(dueDiffTime) / (1000 * 60 * 60 * 24));
    
        const completionDiffTime = completion - clearDate;
        const completionDaysAgo = Math.ceil(Math.abs(completionDiffTime) / (1000 * 60 * 60 * 24));
    
        if (completed) {
            if (completionDiffTime > 0) { // Geç tamamlanmış
                if (completionDaysAgo === 1) {
                    return 'completed a day ago';
                } else if (completionDaysAgo <= 3) {
                    return 'completed a few days ago';
                } else if (completionDaysAgo <= 7) {
                    return 'completed a week ago';
                } else {
                    return 'completed more than a week ago';
                }
            } else if (completionDiffTime === 0) { // Bugün tamamlanmış
                return 'completed today';
            } else { // Erken tamamlanmış
                if (completionDaysAgo === 1) {
                    return 'completed a day early';
                } else {
                    return `completed ${completionDaysAgo} days early`;
                }
            }
        } else {
            if (dueDiffTime > 0) { // Gelecekte due date
                if (dueDiffDays === 1) {
                    return 'due in a day';
                } else if (dueDiffDays <= 3) {
                    return 'due in a few days';
                } else if (dueDiffDays <= 7) {
                    return 'due in a week';
                } else {
                    return 'due in more than a week';
                }
            } else if (dueDiffTime === 0) { // Bugün due date
                return 'due today';
            } else { // Geçmiş due date
                if (completionDaysAgo === 1) {
                    return 'was due a day ago';
                } else if (completionDaysAgo <= 3) {
                    return 'was due a few days ago';
                } else if (completionDaysAgo <= 7) {
                    return 'was due a week ago';
                } else {
                    return 'was due more than a week ago';
                }
            }
        }
    }
}

export default TodoView;

