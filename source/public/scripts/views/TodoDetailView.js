class TodoDetailView {
    constructor() {
        this.app = document.getElementById('app');
        this.editingTodoId = null; // Düzenlenen Todo'nun ID'sini saklamak için
    }

    showTodoForm() {
        this.app.innerHTML = `
            <form id="todo-form">
                <label>Title:</label>
                <input type="text" id="title" placeholder="Example">
                <label>Importance:</label>
                <input type="number" id="importance" min="1" max="5" placeholder="5">
                <label>Due Date:</label>
                <input type="date" id="due-date">
                <label>Completed:</label>
                <input type="checkbox" id="completed">
                <label>Description:</label>
                <textarea id="description" placeholder="Example Todo"></textarea>
                <div id="form-buttons">
                    <button type="submit" id="create-button">Create</button>
                    <button type="button" id="create-overview-button">Create & Overview</button>
                    <button type="button" id="overview-button">Overview</button>
                </div>
                <div id="message" style="display:none;"></div>
            </form>
        `;

        this.setUpEventListeners();
    }

    showEditForm(todo) {
        this.editingTodoId = todo._id;
        this.app.innerHTML = `
            <form id="todo-form">
                <label>Title:</label>
                <input type="text" id="title" value="${todo.title}">
                <label>Importance:</label>
                <input type="number" id="importance" min="1" max="5" value="${todo.importance}">
                <label>Due Date:</label>
                <input type="date" id="due-date" value="${this.formatDate(todo.dueDate)}">
                <label>Completed:</label>
                <input type="checkbox" id="completed" ${todo.completed ? 'checked' : ''}>
                <label>Description:</label>
                <textarea id="description">${todo.description}</textarea>
                <div id="form-buttons">
                    <button type="submit" id="update-button">Update</button>
                    <button type="button" id="update-overview-button">Update & Overview</button>
                    <button type="button" id="overview-button">Overview</button>
                </div>
                <div id="message" style="display:none;"></div>
            </form>
        `;

        this.setUpEventListeners();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    setUpEventListeners() {
        const form = document.getElementById('todo-form');
        const createButton = document.getElementById('create-button');
        const updateButton = document.getElementById('update-button');
        const createOverviewButton = document.getElementById('create-overview-button');
        const updateOverviewButton = document.getElementById('update-overview-button');
        const overviewButton = document.getElementById('overview-button');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.editingTodoId !== null) {
                this.handleUpdateFormSubmit(this.editingTodoId);
            } else {
                this.handleFormSubmit();
            }
        });

        if (createOverviewButton) {
            createOverviewButton.addEventListener('click', () => {
                if (this.validateForm()) {
                    this.handleFormSubmit();
                    this.navigateToOverview();
                }
            });
        }

        if (updateOverviewButton) {
            updateOverviewButton.addEventListener('click', () => {
                if (this.validateForm()) {
                    this.handleUpdateFormSubmit(this.editingTodoId);
                    this.navigateToOverview();
                }
            });
        }

        overviewButton.addEventListener('click', () => {
            this.navigateToOverview();
        });

        form.addEventListener('input', () => {
            this.enableButtonsIfValid();
        });

        this.enableButtonsIfValid();
    }

    validateForm() {
        const title = document.getElementById('title').value.trim();
        const importance = document.getElementById('importance').value.trim();
        const dueDate = document.getElementById('due-date').value.trim();
        const description = document.getElementById('description').value.trim();

        return title && importance && dueDate && description;
    }

    enableButtonsIfValid() {
        const createButton = document.getElementById('create-button');
        const updateButton = document.getElementById('update-button');
        const createOverviewButton = document.getElementById('create-overview-button');
        const updateOverviewButton = document.getElementById('update-overview-button');

        if (this.validateForm()) {
            if (createButton) createButton.disabled = false;
            if (updateButton) updateButton.disabled = false;
            if (createOverviewButton) createOverviewButton.disabled = false;
            if (updateOverviewButton) updateOverviewButton.disabled = false;
        } else {
            if (createButton) createButton.disabled = true;
            if (updateButton) updateButton.disabled = true;
            if (createOverviewButton) createOverviewButton.disabled = true;
            if (updateOverviewButton) updateOverviewButton.disabled = true;
        }
    }

    handleFormSubmit() {
        const title = document.getElementById('title').value.trim();
        const importance = document.getElementById('importance').value.trim();
        const dueDate = document.getElementById('due-date').value.trim();
        const description = document.getElementById('description').value.trim();
        const completed = document.getElementById('completed').checked;

        const newTodo = {
            title,
            importance,
            dueDate,
            description,
            completed
        };

        const event = new CustomEvent('todoCreated', { detail: newTodo });
        document.dispatchEvent(event);
        this.showMessage('Todo created successfully!');
        this.editingTodoId = newTodo.id; // Yeni ID'yi sakla
        this.showEditForm(newTodo); // Düzenleme sayfasına yönlendir
    }

    handleUpdateFormSubmit(id) {
        const title = document.getElementById('title').value.trim();
        const importance = document.getElementById('importance').value.trim();
        const dueDate = document.getElementById('due-date').value.trim();
        const description = document.getElementById('description').value.trim();
        const completed = document.getElementById('completed').checked;

        const updatedTodo = {
            title,
            importance,
            dueDate,
            description,
            completed
        };

        const event = new CustomEvent('updateTodo', { detail: { updatedTodo, id } });
        document.dispatchEvent(event);

        this.showMessage('Todo updated successfully!');
    }

    showMessage(message) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    navigateToOverview() {
        const overviewEvent = new CustomEvent('showOverview');
        document.dispatchEvent(overviewEvent);
    }
}

export default TodoDetailView;
