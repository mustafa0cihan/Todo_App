import * as todoService from '../services/todoService.js';
import TodoView from '../views/TodoView.js';
import TodoDetailView from '../views/TodoDetailView.js';

class TodoController {
    constructor() {
        this.todoView = new TodoView();
        this.todoDetailView = new TodoDetailView();
        this.todos = [];
        this.filterCompleted = false;
        this.activeSortButton = null;

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

        document.addEventListener('toggleTodoStatus', async (event) => {
            const updatedTodo = await todoService.updateTodo(event.detail._id, event.detail);
            this.updateTodoInView(updatedTodo);
        });

        document.addEventListener('showCreateTodoForm', () => {
            this.todoDetailView.showTodoForm();
        });

        document.addEventListener('showOverview', () => {
            this.showOverview();
        });

        document.addEventListener('sortByName', () => {
            this.activeSortButton = 'sortByName';
            this.sortTodosByName();
        });

        document.addEventListener('sortByDueDate', () => {
            this.activeSortButton = 'sortByDueDate';
            this.sortTodosByDueDate();
        });

        document.addEventListener('sortByCreationDate', () => {
            this.activeSortButton = 'sortByCreationDate';
            this.sortTodosByCreationDate();
        });

        document.addEventListener('sortByImportance', () => {
            this.activeSortButton = 'sortByImportance';
            this.sortTodosByImportance();
        });

        document.addEventListener('filterCompleted', (event) => {
            this.filterCompleted = event.detail;
            this.filterCompletedTodos(this.filterCompleted);
        });
    }

    async init() {
        this.todoView.createMainPage();
        this.todos = await todoService.getTodos();
        this.todoView.createTodoList(this.todos);
    }

    addNewTodoToView(newTodo) {
        this.todos.push(newTodo);
        this.todoDetailView.showEditForm(newTodo);
    }

    editTodoInView(todo, index) {
        const editableTodo = { ...todo, index };
        this.todoDetailView.showEditForm(editableTodo);
    }

    updateTodoInView(updatedTodo) {
        const index = this.todos.findIndex(todo => todo._id === updatedTodo._id);
        if (index !== -1) {
            this.todos[index] = updatedTodo;
            this.showOverview();
        }
    }

    showOverview() {
        this.todoView.createMainPage();
        this.todoView.createTodoList(this.todos);
    }

    sortTodos() {
        switch (this.activeSortButton) {
            case 'sortByName':
                this.sortTodosByName();
                break;
            case 'sortByDueDate':
                this.sortTodosByDueDate();
                break;
            case 'sortByCreationDate':
                this.sortTodosByCreationDate();
                break;
            case 'sortByImportance':
                this.sortTodosByImportance();
                break;
            default:
                break;
        }
    }

    sortTodosByName() {
        const sortedTodos = [...this.todos].sort((a, b) => a.title.localeCompare(b.title));
        this.todoView.renderTodoList(this.filterCompleted ? sortedTodos.filter(todo => !todo.completed) : sortedTodos);
    }

    sortTodosByDueDate() {
        const sortedTodos = [...this.todos].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        this.todoView.renderTodoList(this.filterCompleted ? sortedTodos.filter(todo => !todo.completed) : sortedTodos);
    }

    sortTodosByCreationDate() {
        const sortedTodos = [...this.todos].sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
        this.todoView.renderTodoList(this.filterCompleted ? sortedTodos.filter(todo => !todo.completed) : sortedTodos);
    }

    sortTodosByImportance() {
        const sortedTodos = [...this.todos].sort((a, b) => b.importance - a.importance);
        this.todoView.renderTodoList(this.filterCompleted ? sortedTodos.filter(todo => !todo.completed) : sortedTodos);
    }

    filterCompletedTodos(filter) {
        const filteredTodos = filter ? this.todos.filter(todo => !todo.completed) : this.todos;
        this.todoView.renderTodoList(filteredTodos);
        if (this.activeSortButton) {
            this.sortTodos();
        }
    }
}

export default TodoController;

