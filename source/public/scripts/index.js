import TodoController from './controllers/TodoController.js';

document.addEventListener('DOMContentLoaded', () => {
    const todoController = new TodoController();
    todoController.init();
});
