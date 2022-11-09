const express = require("express");

const app = express();

app.use(express.json());

app.get("/courses", (req, res) => {
  console.log(req.query);

  return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (req, res) => {
  console.log(req.body);

  return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  return res.json(["Curso 4", "Curso 5", "Curso 6"]);
});

app.patch("/courses/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  return res.json(["Curso 1", "Curso 2", "Curso 2"]);
});

app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  return res.json(["Curso 1", "Curso 2"]);
});

app.listen(3333);
