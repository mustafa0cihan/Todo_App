import Todo from '../models/todoModel.js';

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTodo = async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        importance: req.body.importance,
        dueDate: req.body.dueDate,
        description: req.body.description,
        completed: req.body.completed
    });
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json(deletedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
