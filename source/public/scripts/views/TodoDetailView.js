class TodoDetailView {
    constructor() {
        this.app = document.getElementById('app');
    }

    showTodoForm() {
        this.app.innerHTML = `
            <form id="todo-form">
                <label>Title: <input type="text" id="title"></label>
                <label>Importance: <input type="number" id="importance" min="1" max="5"></label>
                <label>Due Date: <input type="date" id="due-date"></label>
                <label class="inline-label">Completed: <input type="checkbox" id="completed"></label>
                <label>Description: <textarea id="description"></textarea></label>
                <div class="form-buttons">
                    <button type="submit" id="create-button">Create</button>
                    <button type="button" id="create-overview-button">Create & Overview</button>
                    <button type="button" id="overview-button">Overview</button>
                </div>
            </form>
        `;

        document.getElementById('create-button').addEventListener('click', (event) => {
            event.preventDefault();
            const todo = this.getFormData();
            const eventDetail = new CustomEvent('todoCreated', { detail: todo });
            document.dispatchEvent(eventDetail);
        });

        document.getElementById('create-overview-button').addEventListener('click', (event) => {
            event.preventDefault();
            const todo = this.getFormData();
            const eventDetail = new CustomEvent('todoCreated', { detail: todo });
            document.dispatchEvent(eventDetail);
            const overviewEvent = new CustomEvent('showOverview');
            document.dispatchEvent(overviewEvent);
        });

        document.getElementById('overview-button').addEventListener('click', () => {
            const overviewEvent = new CustomEvent('showOverview');
            document.dispatchEvent(overviewEvent);
        });
    }

    showEditForm(todo) {
        this.app.innerHTML = `
             <form id="todo-form">
                <input type="hidden" id="todo-id" value="${todo._id}">
                <label>Title: <input type="text" id="title" value="${todo.title}"></label>
                <label>Importance: <input type="number" id="importance" value="${todo.importance}" min="1" max="5"></label>
                <label>Due Date: <input type="date" id="due-date" value="${todo.dueDate.split('T')[0]}"></label>
                <label class="inline-label">Completed: <input type="checkbox" id="completed" ${todo.completed ? 'checked' : ''}></label>
                <label>Description: <textarea id="description">${todo.description}</textarea></label>
                <div class="form-buttons">
                    <button type="submit" id="update-button">Update</button>
                    <button type="button" id="update-overview-button">Update & Overview</button>
                    <button type="button" id="overview-button">Overview</button>
                </div>
            </form>
        `;

        document.getElementById('update-button').addEventListener('click', (event) => {
            event.preventDefault();
            const updatedTodo = this.getFormData();
            const id = document.getElementById('todo-id').value;
            const eventDetail = new CustomEvent('updateTodo', { detail: { id, updatedTodo } });
            document.dispatchEvent(eventDetail);
        });

        document.getElementById('update-overview-button').addEventListener('click', (event) => {
            event.preventDefault();
            const updatedTodo = this.getFormData();
            const id = document.getElementById('todo-id').value;
            const eventDetail = new CustomEvent('updateTodo', { detail: { id, updatedTodo } });
            document.dispatchEvent(eventDetail);
            const overviewEvent = new CustomEvent('showOverview');
            document.dispatchEvent(overviewEvent);
        });

        document.getElementById('overview-button').addEventListener('click', () => {
            const overviewEvent = new CustomEvent('showOverview');
            document.dispatchEvent(overviewEvent);
        });
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
