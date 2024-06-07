import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import todoRoutes from './source/routes/todoRoutes.js';

const app = express();
const PORT = 3000;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(dirname, 'source', 'public')));

// Routes
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
