class TodoDetailView {
    constructor() {
        this.app = document.getElementById('app');
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
}

export default TodoDetailView;
