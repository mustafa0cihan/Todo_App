import * as todoService from '../services/todoService.js';
import TodoView from '../views/TodoView.js';
import TodoDetailView from '../views/TodoDetailView.js';

class TodoController {
    constructor() {
        this.todoView = new TodoView();
        this.todoDetailView = new TodoDetailView();

        document.addEventListener('todoCreated', async (event) => {
            const newTodo = await todoService.createTodo(event.detail);
            this.addNewTodoToView(newTodo);
        });

        document.addEventListener('editTodo', (event) => {
            this.editTodoInView(event.detail.todo, event.detail.index);
        });

        document.addEventListener('updateTodo', async (event) => {
            const updatedTodo = await todoService.updateTodo(event.detail.id, event.detail.updatedTodo);
            this.updateTodoInView(updatedTodo);
        });

        document.addEventListener('showCreateTodoForm', () => {
            this.todoDetailView.showTodoForm();
        });

        document.addEventListener('showOverview', () => {
            this.showOverview();
        });

        document.addEventListener('sortByName', () => {
            this.sortTodosByName();
        });

        document.addEventListener('sortByDueDate', () => {
            this.sortTodosByDueDate();
        });

        document.addEventListener('sortByCreationDate', () => {
            this.sortTodosByCreationDate();
        });

        document.addEventListener('sortByImportance', () => {
            this.sortTodosByImportance();
        });

        document.addEventListener('filterCompleted', () => {
            this.filterCompletedTodos();
        });
    }

    async init() {
        this.todoView.createMainPage();
        const todos = await todoService.getTodos();
        this.todoView.createTodoList(todos);
    }

    addNewTodoToView(newTodo) {
        this.todoView.addTodoToList(newTodo);
    }

    editTodoInView(todo, index) {
        const editableTodo = { ...todo, index };
        this.todoDetailView.showEditForm(editableTodo);
    }

    updateTodoInView(updatedTodo) {
        this.todoView.updateTodoInList(updatedTodo);
    }

    showOverview() {
        this.todoView.createMainPage();
        this.init();
    }

    sortTodosByName() {
       
    }

    sortTodosByDueDate() {
        
    }

    sortTodosByCreationDate() {
       
    }

    sortTodosByImportance() {
        

    filterCompletedTodos() {
      
    }
}

export default TodoController;
