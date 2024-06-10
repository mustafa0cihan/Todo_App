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

        // Butonlara event listener ekleyin
        document.getElementById('create-todo-button').addEventListener('click', () => {
            const event = new CustomEvent('showCreateTodoForm');
            document.dispatchEvent(event);
        });

        document.getElementById('toggle-style-button').addEventListener('click', () => {
            this.toggleStyle();
        });

        document.getElementById('by-name-button').addEventListener('click', () => {
            const event = new CustomEvent('sortByName');
            document.dispatchEvent(event);
        });

        document.getElementById('by-due-date-button').addEventListener('click', () => {
            const event = new CustomEvent('sortByDueDate');
            document.dispatchEvent(event);
        });

        document.getElementById('by-creation-date-button').addEventListener('click', () => {
            const event = new CustomEvent('sortByCreationDate');
            document.dispatchEvent(event);
        });

        document.getElementById('importance-button').addEventListener('click', () => {
            const event = new CustomEvent('sortByImportance');
            document.dispatchEvent(event);
        });

        document.getElementById('filter-completed-button').addEventListener('click', () => {
            const event = new CustomEvent('filterCompleted');
            document.dispatchEvent(event);
        });
    }

    toggleStyle() {
        document.body.classList.toggle('dark-mode');
    }

    createTodoList(todos) {
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
                    <li id="todo-${todo._id}">
                        ${todo.title} - ${todo.description} - ${todo.importance} - ${todo.dueDate} - ${todo.completed ? 'Completed' : 'Not Completed'}
                        <button class="edit-button" data-id="${todo._id}">Edit</button>
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
    }

    addTodoToList(todo) {
        const todoListSection = document.getElementById('todo-list-section');
        if (!todoListSection) {
            console.error('Todo list section not found');
            return;
        }

        const ul = todoListSection.querySelector('ul');
        if (!ul) {
            this.createTodoList([todo]);
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            ${todo.title} - ${todo.description} - ${todo.importance} - ${todo.dueDate} - ${todo.completed ? 'Completed' : 'Not Completed'}
            <button class="edit-button" data-id="${todo._id}">Edit</button>
        `;

        ul.appendChild(li);

        li.querySelector('.edit-button').addEventListener('click', (event) => {
            const eventDetail = new CustomEvent('editTodo', { detail: { todo, index: todo._id } });
            document.dispatchEvent(eventDetail);
        });
    }

    updateTodoInList(updatedTodo) {
        const todoElement = document.getElementById(`todo-${updatedTodo._id}`);
        if (!todoElement) {
            console.error('Todo element not found');
            return;
        }

        todoElement.innerHTML = `
            ${updatedTodo.title} - ${updatedTodo.description} - ${updatedTodo.importance} - ${updatedTodo.dueDate} - ${updatedTodo.completed ? 'Completed' : 'Not Completed'}
            <button class="edit-button" data-id="${updatedTodo._id}">Edit</button>
        `;

        todoElement.querySelector('.edit-button').addEventListener('click', (event) => {
            const eventDetail = new CustomEvent('editTodo', { detail: { todo: updatedTodo, index: updatedTodo._id } });
            document.dispatchEvent(eventDetail);
        });
    }
}

export default TodoView;
