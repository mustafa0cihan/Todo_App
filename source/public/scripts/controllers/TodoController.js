import TodoModel from '../models/TodoModel.js';
import TodoView from '../views/TodoView.js';
import TodoDetailView from '../views/TodoDetailView.js';

class TodoController {
    constructor() {
        this.todoModel = new TodoModel();
        this.todoView = new TodoView();
        this.todoDetailView = new TodoDetailView();

        document.addEventListener('todoCreated', (event) => {
            this.addNewTodo(event.detail);
        });

        document.addEventListener('editTodo', (event) => {
            this.editTodo(event.detail.todo, event.detail.index);
        });

        document.addEventListener('updateTodo', (event) => {
            this.updateTodo(event.detail.updatedTodo, event.detail.id);
        });

        document.addEventListener('showCreateTodoForm', () => {
            this.todoDetailView.showTodoForm();
        });

        document.addEventListener('showOverview', () => {
            this.showOverview();
        });
    }

    init() {
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todoModel.getTodos());
    }

    addNewTodo(newTodo) {
        this.todoModel.addTodo(newTodo);
        this.todoDetailView.showEditForm(newTodo);
    }

    editTodo(todo, index) {
        const editableTodo = { ...todo, index };
        this.todoDetailView.showEditForm(editableTodo);
    }

    updateTodo(updatedTodo, id) {
        this.todoModel.updateTodoById(id, updatedTodo);
    }

    showOverview() {
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todoModel.getTodos());
    }
}

export default TodoController;
