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
            this.updateTodo(event.detail.updatedTodo, event.detail.index);
        });

        document.addEventListener('showCreateTodoForm', () => {
            this.todoDetailView.showTodoForm();
        });
    }

    init() {
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todoModel.getTodos());
    }

    addNewTodo(newTodo) {
        this.todoModel.addTodo(newTodo);
        this.todoView.createMainPage(); 
        this.todoView.createTodoList(this.todoModel.getTodos());

        this.init(); 
    }

    editTodo(todo, index) {
        const editableTodo = { ...todo, index };
        this.todoDetailView.showEditForm(editableTodo);
    }

    updateTodo(updatedTodo, index) {
        this.todoModel.todos[index] = updatedTodo;
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todoModel.getTodos());
        this.init();
    }
}

export default TodoController;
