class TodoView {
    constructor() {
        this.app = document.body;
    }

    createTodoForm() {
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

        this.app.appendChild(form);
    }

    createTodoList(todos) {
        // Önceki listeyi temizleyelim
        const existingUl = document.querySelector('ul');
        if (existingUl) {
            existingUl.remove();
        }

        const ul = document.createElement('ul');
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = `${todo.title} - ${todo.description} - ${todo.importance} - ${todo.dueDate} - ${todo.completed ? 'Completed' : 'Not Completed'}`;
            ul.appendChild(li);
        });
        this.app.appendChild(ul);
    }

}

export default TodoView;
