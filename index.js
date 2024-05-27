const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory storage for to-dos
let todos = [];
let currentId = 1;

app.get('/', (req, res) => {
    res.json("Welcom to Services");
});

// Get all to-dos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a specific to-do by id
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('To-do not found');
    }
});

// Create a new to-do
app.post('/todos', (req, res) => {
    const { title, completed } = req.body;
    const newTodo = { id: currentId++, title, completed: completed || false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update an existing to-do
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, completed } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex !== -1) {
        todos[todoIndex] = { id, title, completed };
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send('To-do not found');
    }
});

// Delete a to-do
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json(deletedTodo);
    } else {
        res.status(404).send('To-do not found');
    }
});

app.listen(port, () => {
    console.log(`To-do list API listening at http://localhost:${port}`);
});
