class TodoDetailView {
    constructor() {
        this.app = document.getElementById('app');
    }

    showTodoForm() {
        this.app.innerHTML = `
            <form id="todo-form">
                <label>Title: <input type="text" id="title"><span class="error-message" id="title-error"></span></label>
                <label>Importance: <input type="number" id="importance" min="1" max="5"><span class="error-message" id="importance-error"></span></label>
                <label>Due Date: <input type="date" id="due-date"><span class="error-message" id="due-date-error"></span></label>
                <label class="inline-label">Completed: <input type="checkbox" id="completed"></label>
                <label>Description: <textarea id="description"></textarea><span class="error-message" id="description-error"></span></label>
                <div class="form-buttons">
                    <button type="submit" id="create-button">Create</button>
                    <button type="button" id="create-overview-button">Create & Overview</button>
                    <button type="button" id="overview-button">Overview</button>
                </div>
            </form>
        `;

        this.addEventListeners();
    }

    showEditForm(todo) {
        this.app.innerHTML = `
            <form id="todo-form">
                <input type="hidden" id="todo-id" value="${todo._id}">
                <label>Title: <input type="text" id="title" value="${todo.title}"><span class="error-message" id="title-error"></span></label>
                <label>Importance: <input type="number" id="importance" value="${todo.importance}" min="1" max="5"><span class="error-message" id="importance-error"></span></label>
                <label>Due Date: <input type="date" id="due-date" value="${todo.dueDate.split('T')[0]}"><span class="error-message" id="due-date-error"></span></label>
                <label class="inline-label">Completed: <input type="checkbox" id="completed" ${todo.completed ? 'checked' : ''}></label>
                <label>Description: <textarea id="description">${todo.description}</textarea><span class="error-message" id="description-error"></span></label>
                <div class="form-buttons">
                    <button type="submit" id="update-button">Update</button>
                    <button type="button" id="update-overview-button">Update & Overview</button>
                    <button type="button" id="overview-button">Overview</button>
                </div>
            </form>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const form = document.getElementById('todo-form');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                const todo = this.getFormData();
                const id = document.getElementById('todo-id') ? document.getElementById('todo-id').value : null;
                const eventDetail = id
                    ? new CustomEvent('updateTodo', { detail: { id, updatedTodo: todo } })
                    : new CustomEvent('todoCreated', { detail: todo });
                document.dispatchEvent(eventDetail);
            }
        });

        document.getElementById('create-overview-button')?.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                const todo = this.getFormData();
                const eventDetail = new CustomEvent('todoCreated', { detail: todo });
                document.dispatchEvent(eventDetail);
                const overviewEvent = new CustomEvent('showOverview');
                document.dispatchEvent(overviewEvent);
            }
        });

        document.getElementById('update-overview-button')?.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                const todo = this.getFormData();
                const id = document.getElementById('todo-id').value;
                const eventDetail = new CustomEvent('updateTodo', { detail: { id, updatedTodo: todo } });
                document.dispatchEvent(eventDetail);
                const overviewEvent = new CustomEvent('showOverview');
                document.dispatchEvent(overviewEvent);
            }
        });

        document.getElementById('overview-button').addEventListener('click', () => {
            const overviewEvent = new CustomEvent('showOverview');
            document.dispatchEvent(overviewEvent);
        });

        this.addInputListeners();
    }

    addInputListeners() {
        const inputs = document.querySelectorAll('#todo-form input, #todo-form textarea');
        
        inputs.forEach(input => {
            if (input.id !== 'completed') { 
                input.addEventListener('input', () => {
                    if (input.value.trim() !== '') {
                        input.classList.remove('error');
                        document.getElementById(`${input.id}-error`).textContent = '';
                    }

                    if (input.id === 'importance') {
                        this.validateImportance();
                    }
                });
            }
        });
    }

    validateImportance() {
        const importanceInput = document.getElementById('importance');
        const importanceValue = parseInt(importanceInput.value, 10);
        if (importanceValue < 1 || importanceValue > 5) {
            importanceInput.classList.add('error');
            document.getElementById('importance-error').textContent = 'Importance must be a value between 1 and 5.';
        } else {
            importanceInput.classList.remove('error');
            document.getElementById('importance-error').textContent = '';
        }
    }

    validateForm() {
        let isValid = true;
        const fields = ['title', 'importance', 'due-date', 'description'];
        
        fields.forEach(field => {
            const input = document.getElementById(field);
            const errorMessage = document.getElementById(`${field}-error`);
            if (input.value.trim() === '') {
                input.classList.add('error');
                errorMessage.textContent = `Please enter ${field.replace('-', ' ')}.`;
                isValid = false;
            } else {
                input.classList.remove('error');
                errorMessage.textContent = '';
            }
        });

        return isValid;
    }

    getFormData() {
        const title = document.getElementById('title').value;
        const importance = document.getElementById('importance').value;
        const dueDate = document.getElementById('due-date').value;
        const completed = document.getElementById('completed').checked;
        const description = document.getElementById('description').value;

        return { title, importance, dueDate, completed, description };
    }
}

export default TodoDetailView;
