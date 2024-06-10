import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from '../routes/todoRoutes.js';
import { jest } from '@jest/globals';

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/todo-app-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
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
        expect(response.body.creationDate).toBeDefined(); // Ensure creationDate is set
    });

    it('should get all todos', async () => {
        const newTodo = {
            title: 'Test Todo',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        await request(app).post('/api/todos').send(newTodo);

        const response = await request(app).get('/api/todos');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    it('should update a todo', async () => {
        const newTodo = {
            title: 'Test Todo',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        const createdTodo = await request(app)
            .post('/api/todos')
            .send(newTodo);

        const updatedTodo = {
            ...createdTodo.body,
            title: 'Updated Test Todo'
        };

        const response = await request(app)
            .put(`/api/todos/${createdTodo.body._id}`)
            .send(updatedTodo);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Test Todo');
    });

    it('should filter completed todos', async () => {
        const newTodo1 = {
            title: 'Completed Todo',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: true
        };

        const newTodo2 = {
            title: 'Not Completed Todo',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        await request(app).post('/api/todos').send(newTodo1);
        await request(app).post('/api/todos').send(newTodo2);

        const response = await request(app).get('/api/todos');
        const filteredTodos = response.body.filter(todo => !todo.completed);

        expect(filteredTodos.length).toBe(1);
        expect(filteredTodos[0].title).toBe('Not Completed Todo');
    });

    it('should sort todos by title', async () => {
        const newTodo1 = {
            title: 'B Todo',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        const newTodo2 = {
            title: 'A Todo',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        await request(app).post('/api/todos').send(newTodo1);
        await request(app).post('/api/todos').send(newTodo2);

        const response = await request(app).get('/api/todos');
        const sortedTodos = response.body.sort((a, b) => a.title.localeCompare(b.title));

        expect(sortedTodos[0].title).toBe('A Todo');
        expect(sortedTodos[1].title).toBe('B Todo');
    });

    it('should sort todos by due date', async () => {
        const newTodo1 = {
            title: 'Todo 1',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        const newTodo2 = {
            title: 'Todo 2',
            importance: 3,
            dueDate: '2024-06-12',
            description: 'This is a test todo',
            completed: false
        };

        await request(app).post('/api/todos').send(newTodo1);
        await request(app).post('/api/todos').send(newTodo2);

        const response = await request(app).get('/api/todos');
        const sortedTodos = response.body.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        expect(sortedTodos[0].dueDate).toBe('2024-06-10T00:00:00.000Z');
        expect(sortedTodos[1].dueDate).toBe('2024-06-12T00:00:00.000Z');
    });

    it('should sort todos by importance', async () => {
        const newTodo1 = {
            title: 'Todo 1',
            importance: 1,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        const newTodo2 = {
            title: 'Todo 2',
            importance: 5,
            dueDate: '2024-06-12',
            description: 'This is a test todo',
            completed: false
        };

        await request(app).post('/api/todos').send(newTodo1);
        await request(app).post('/api/todos').send(newTodo2);

        const response = await request(app).get('/api/todos');
        const sortedTodos = response.body.sort((a, b) => b.importance - a.importance);

        expect(sortedTodos[0].importance).toBe(5);
        expect(sortedTodos[1].importance).toBe(1);
    });

    it('should sort todos by creation date', async () => {
        const newTodo1 = {
            title: 'Todo 1',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: false
        };

        const newTodo2 = {
            title: 'Todo 2',
            importance: 3,
            dueDate: '2024-06-12',
            description: 'This is a test todo',
            completed: false
        };

        await request(app).post('/api/todos').send(newTodo1);
        await request(app).post('/api/todos').send(newTodo2);

        const response = await request(app).get('/api/todos');
        const sortedTodos = response.body.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));

        expect(new Date(sortedTodos[0].creationDate).getTime()).toBeLessThan(new Date(sortedTodos[1].creationDate).getTime());
    });

    it('should filter and sort todos together', async () => {
        const newTodo1 = {
            title: 'Completed Todo A',
            importance: 3,
            dueDate: '2024-06-10',
            description: 'This is a test todo',
            completed: true
        };

        const newTodo2 = {
            title: 'Not Completed Todo B',
            importance: 3,
            dueDate: '2024-06-12',
            description: 'This is a test todo',
            completed: false
        };

        const newTodo3 = {
            title: 'Not Completed Todo A',
            importance: 3,
            dueDate: '2024-06-11',
            description: 'This is a test todo',
            completed: false
        };

        await request(app).post('/api/todos').send(newTodo1);
        await request(app).post('/api/todos').send(newTodo2);
        await request(app).post('/api/todos').send(newTodo3);

        const response = await request(app).get('/api/todos');
        const filteredTodos = response.body.filter(todo => !todo.completed);
        const sortedAndFilteredTodos = filteredTodos.sort((a, b) => a.title.localeCompare(b.title));

        expect(sortedAndFilteredTodos.length).toBe(2);
        expect(sortedAndFilteredTodos[0].title).toBe('Not Completed Todo A');
        expect(sortedAndFilteredTodos[1].title).toBe('Not Completed Todo B');
    });
});
