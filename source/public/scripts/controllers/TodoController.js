import TodoModel from '../models/TodoModel.js';
import TodoView from '../views/TodoView.js';

class TodoController {
    constructor() {
        this.todoModel = new TodoModel();
        this.todoView = new TodoView();
    }

    init() {
        this.todoView.createTodoForm();
        this.todoView.createTodoList(this.todoModel.getTodos());

        document.getElementById('todo-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.addNewTodo();
        });
    }

    addNewTodo() {
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

        this.todoModel.addTodo(newTodo);
        this.todoView.createTodoList(this.todoModel.getTodos());
    }
}

export default TodoController;
