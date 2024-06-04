class TodoModel {
    constructor() {
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodos() {
        return this.todos;
    }
}

export default TodoModel;
