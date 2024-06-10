class TodoModel {
    constructor() {
        this.todos = [];
        this.currentId = 0; 
    }

    addTodo(todo) {
        todo.id = this.currentId++;
        this.todos.push(todo);
    }

    updateTodoById(id, updatedTodo) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todos[index] = { ...this.todos[index], ...updatedTodo };
        }
    }

    getTodos() {
        return this.todos;
    }
}

export default TodoModel;