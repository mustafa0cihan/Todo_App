import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    importance: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    creationDate: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
