import TodoModel from '../models/TodoModel.js';
import TodoView from '../views/TodoView.js';

class TodoController {
    constructor() {
        this.todoModel = new TodoModel();
        this.todoView = new TodoView();

        document.addEventListener('todoCreated', (event) => {
            this.addNewTodo(event.detail);
        });
    }

    init() {
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todoModel.getTodos());

        document.getElementById('create-todo-button').addEventListener('click', () => {
            this.todoView.showTodoForm();
            this.initFormSubmitListener();
        });
    }

    initFormSubmitListener() {
        document.getElementById('todo-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.addNewTodoFromForm();
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
}

export default TodoController;
