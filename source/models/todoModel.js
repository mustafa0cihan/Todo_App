let currentId = 0;

class Todo {
    constructor({ title, importance, dueDate, description, completed }) {
        this.id = currentId++;
        this.title = title;
        this.importance = importance;
        this.dueDate = dueDate;
        this.description = description;
        this.completed = completed;
    }
}

export default Todo;
