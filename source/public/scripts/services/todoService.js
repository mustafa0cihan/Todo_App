const API_URL = '/api/todos';

export const getTodos = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createTodo = async (todo) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    return response.json();
};

export const updateTodo = async (id, todo) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    return response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};
