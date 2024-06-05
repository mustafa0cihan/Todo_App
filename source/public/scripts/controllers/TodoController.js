import TodoModel from '../models/TodoModel.js';
import TodoView from '../views/TodoView.js';

class TodoController {
    constructor() {
        this.todoModel = new TodoModel();
        this.todoView = new TodoView();

        document.addEventListener('todoCreated', (event) => {
            this.addNewTodo(event.detail);
        });

        document.addEventListener('editTodo', (event) => {
            this.editTodo(event.detail.todo, event.detail.index);
        });

        document.addEventListener('updateTodo', (event) => {
            this.updateTodo(event.detail.updatedTodo, event.detail.index);
        });
    }

    init() {
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todoModel.getTodos());

        document.getElementById('create-todo-button').addEventListener('click', () => {
            this.todoView.showTodoForm();
        });

    }

    addNewTodoFromForm() {
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

        this.addNewTodo(newTodo);
    }

    addNewTodo(newTodo) {
        this.todoModel.addTodo(newTodo);
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todoModel.getTodos());

        this.init();
    }

    editTodo(todo, index) {
        const editableTodo = { ...todo, index };
        this.todoView.showEditForm(editableTodo);
    }

    updateTodo(updatedTodo, index) {
        this.todoModel.todos[index] = updatedTodo;
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todoModel.getTodos());
        this.init();
    }
}

export default TodoController;
