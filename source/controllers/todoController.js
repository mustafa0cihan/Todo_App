import Todo from '../models/todoModel.js';

// In-memory storage for todos
let todos = [];

export const getTodos = (req, res) => {
    res.json(todos);
};

export const createTodo = (req, res) => {
    const newTodo = new Todo(req.body);
    todos.push(newTodo);
    res.status(201).json(newTodo);
};

export const updateTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === parseInt(id, 10));
    if (index !== -1) {
        todos[index] = { ...todos[index], ...req.body };
        res.json(todos[index]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

export const deleteTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === parseInt(id, 10));
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1);
        res.json(deletedTodo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};
