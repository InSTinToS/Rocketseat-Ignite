const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const foundUser = users.find((user) => user.username === username);

  if (!foundUser) response.status(404).json({ error: "Mensagem do erro" });

  request.user = foundUser;

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  if (users.some((user) => user.username === username))
    return response.status(400).json({ error: "Mensagem do erro" });

  const newUser = { name, username, id: uuid(), todos: [] };

  users.push(newUser);

  return response.json(newUser);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  return response.json(request.user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const todo = {
    title,
    id: uuid(),
    done: false,
    created_at: new Date(),
    deadline: new Date(deadline),
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;

  const foundTodoIndex = user.todos.findIndex((todo) => todo.id === id);

  if (foundTodoIndex < 0)
    return response.status(404).json({ error: "Mensagem do erro" });

  user.todos[foundTodoIndex] = {
    ...user.todos[foundTodoIndex],
    title,
    deadline,
  };

  return response.json(user.todos[foundTodoIndex]);
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const foundTodoIndex = user.todos.findIndex((todo) => todo.id === id);

  if (foundTodoIndex < 0)
    return response.status(404).json({ error: "Mensagem do erro" });

  user.todos[foundTodoIndex] = {
    ...user.todos[foundTodoIndex],
    done: true,
  };

  return response.json(user.todos[foundTodoIndex]);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const foundTodoIndex = user.todos.findIndex((todo) => todo.id === id);

  if (foundTodoIndex === -1)
    return response.status(404).json({ error: "Mensagem do erro" });

  user.todos.splice(foundTodoIndex, 1);

  return response.status(204).json();
});

module.exports = app;
