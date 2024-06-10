import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from '../routes/todoRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/todo-app-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Todo API', () => {
    it('should create a new todo', async () => {
        const newTodo = {
            title: 'Test Todo',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        const response = await request(app)
            .post('/api/todos')
            .send(newTodo);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Todo');
    });

    it('should get all todos', async () => {
        const response = await request(app).get('/api/todos');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
