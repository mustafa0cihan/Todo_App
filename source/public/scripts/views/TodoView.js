class TodoView {
    constructor() {
        this.app = document.getElementById('app');
    }

    createMainPage() {
        this.app.innerHTML = '';

        const createTodoButton = document.createElement('button');
        createTodoButton.textContent = 'Create New Todo';
        createTodoButton.id = 'create-todo-button';

        const toggleStyleButton = document.createElement('button');
        toggleStyleButton.textContent = 'Toggle Style';
        toggleStyleButton.id = 'toggle-style-button';

        const sortFilterSection = document.createElement('div');
        sortFilterSection.id = 'sort-filter-section';

        const byNameButton = document.createElement('button');
        byNameButton.textContent = 'By Name';
        byNameButton.id = 'by-name-button';

        const byDueDateButton = document.createElement('button');
        byDueDateButton.textContent = 'By Due Date';
        byDueDateButton.id = 'by-due-date-button';

        const byCreationDateButton = document.createElement('button');
        byCreationDateButton.textContent = 'By Creation Date';
        byCreationDateButton.id = 'by-creation-date-button';

        const importanceButton = document.createElement('button');
        importanceButton.textContent = 'Importance';
        importanceButton.id = 'importance-button';

        const filterCompletedButton = document.createElement('button');
        filterCompletedButton.textContent = 'Filter Completed';
        filterCompletedButton.id = 'filter-completed-button';

        sortFilterSection.appendChild(byNameButton);
        sortFilterSection.appendChild(byDueDateButton);
        sortFilterSection.appendChild(byCreationDateButton);
        sortFilterSection.appendChild(importanceButton);
        sortFilterSection.appendChild(filterCompletedButton);

        const todoListSection = document.createElement('div');
        todoListSection.id = 'todo-list-section';

        this.app.appendChild(createTodoButton);
        this.app.appendChild(toggleStyleButton);
        this.app.appendChild(sortFilterSection);
        this.app.appendChild(todoListSection);
    }

    showTodoForm() {
        const form = document.createElement('form');
        form.id = 'todo-form';

        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Example';

        const importanceLabel = document.createElement('label');
        importanceLabel.textContent = 'Importance:';
        const importanceInput = document.createElement('input');
        importanceInput.type = 'number';
        importanceInput.min = 1;
        importanceInput.max = 5;
        importanceInput.placeholder = '5';

        const dueDateLabel = document.createElement('label');
        dueDateLabel.textContent = 'Due Date:';
        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';

        const completedLabel = document.createElement('label');
        completedLabel.textContent = 'Completed:';
        const completedInput = document.createElement('input');
        completedInput.type = 'checkbox';

        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description:';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.placeholder = 'Example Todo';

        const createButton = document.createElement('button');
        createButton.type = 'submit';
        createButton.textContent = 'Create';

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(importanceLabel);
        form.appendChild(importanceInput);
        form.appendChild(dueDateLabel);
        form.appendChild(dueDateInput);
        form.appendChild(completedLabel);
        form.appendChild(completedInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(createButton);

        this.app.innerHTML = '';
        this.app.appendChild(form);

        form.addEventListener('submit', (event) => {
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
            li.textContent = `${todo.title} - ${todo.description} - ${todo.importance} - ${todo.dueDate} - ${todo.completed ? 'Completed' : 'Not Completed'}`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                const event = new CustomEvent('editTodo', { detail: { todo, index } });
                document.dispatchEvent(event);
            });

            li.appendChild(editButton);
            ul.appendChild(li);
        });
        todoListSection.appendChild(ul);
    }

    showEditForm(todo) {
        const form = document.createElement('form');
        form.id = 'todo-form';

        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = todo.title;

        const importanceLabel = document.createElement('label');
        importanceLabel.textContent = 'Importance:';
        const importanceInput = document.createElement('input');
        importanceInput.type = 'number';
        importanceInput.min = 1;
        importanceInput.max = 5;
        importanceInput.value = todo.importance;

        const dueDateLabel = document.createElement('label');
        dueDateLabel.textContent = 'Due Date:';
        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.value = todo.dueDate;

        const completedLabel = document.createElement('label');
        completedLabel.textContent = 'Completed:';
        const completedInput = document.createElement('input');
        completedInput.type = 'checkbox';
        completedInput.checked = todo.completed;

        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description:';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.value = todo.description;

        const updateButton = document.createElement('button');
        updateButton.type = 'submit';
        updateButton.textContent = 'Update';

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(importanceLabel);
        form.appendChild(importanceInput);
        form.appendChild(dueDateLabel);
        form.appendChild(dueDateInput);
        form.appendChild(completedLabel);
        form.appendChild(completedInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(updateButton);

        this.app.innerHTML = ''; // Clear the main page content
        this.app.appendChild(form);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const updatedTodo = {
                title: titleInput.value,
                importance: importanceInput.value,
                dueDate: dueDateInput.value,
                description: descriptionInput.value,
                completed: completedInput.checked
            };
            const updateEvent = new CustomEvent('updateTodo', { detail: { updatedTodo, index: todo.index } });
            document.dispatchEvent(updateEvent);
        });
    }
}

export default TodoView;
