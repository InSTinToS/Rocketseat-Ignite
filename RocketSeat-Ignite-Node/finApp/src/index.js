const express = require("express");
const { v4: uuid } = require("uuid");

const customers = [];

const app = express();

const verifyAccount = (req, res, next) => {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) res.status(400).json({ error: "Customer not found" });

  req.customer = customer;

  return next();
};

const getBalance = (statement) =>
  statement.reduce(
    (acc, cur) => (cur.type === "credit" ? acc + cur.amount : acc - cur.amount),
    0
  );

app.use(express.json());

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  if (customers.some((customer) => customer.cpf === cpf))
    return res.json({ error: "Customer already exists!" }).status(400);

  customers.push({ cpf, name, id: uuid(), statement: [] });

  return res.json().status(201);
});

app.put("/account", verifyAccount, (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.json().status(201);
});

app.get("/account", verifyAccount, (req, res) => {
  const { customer } = req;

  return res.json(customer).status(201);
});

app.delete("/account", verifyAccount, (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1);

  return res.json(customers).status(200);
});

app.get("/statement", verifyAccount, (req, res) => {
  const { customer } = req;

  return res.json(customer.statement);
});

app.post("/deposit", verifyAccount, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    amount,
    description,
    type: "credit",
    created_at: new Date(),
  };

  customer.statement.push(statementOperation);

  return res.json(customer.statement).status(201);
});

app.post("/withDraw", verifyAccount, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount)
    return res.json({ error: "Insufficient founds!" }).status(400);

  const statementOperation = {
    amount,
    type: "debit",
    created_at: new Date(),
  };

  customer.statement.push(statementOperation);

  return res.json(customer.statement).status(200);
});

app.get("/statement/date", verifyAccount, (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (customer) =>
      customer.created_at.toDateString() === new Date(dateFormat).toDateString()
  );

  return res.json(statement);
});

app.get("/balance", verifyAccount, (req, res) => {
  const { customer } = req;

  const balance = getBalance(customer.statement);

  return res.json(balance);
});

app.listen(3333);
