import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import todoRoutes from './source/routes/todoRoutes.js';

const app = express();
const PORT = 3000;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(dirname, 'source', 'public')));

// Routes
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
