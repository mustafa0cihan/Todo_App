const API_URL = 'http://localhost:3000/api/todos';

export async function getTodos() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return data;
}

export async function createTodo(todo) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    const data = await response.json();
    return data;
}

export async function updateTodo(id, updatedTodo) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    const data = await response.json();
    return data;
}

export async function deleteTodo(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
}
