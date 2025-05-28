// Separate router to organize /employees routes

import express from "express";
const empRouter = express.Router();
import employees, { addEmployee } from "#db/employees";

// GET localhost:3000/employees
empRouter.get("/", (req, res) => {
  res.send(employees);
});

// GET localhost:3000/employees/random
empRouter.get("/random", (req, res, next) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

// // GET localhost:3000/employees/:id
empRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.send(employee);
});

empRouter.post("/", (req, res, next) => {
  if (!req.body) {
    res.status(400).send("Request must have a body.");
  } else if (!req.body.name) {
    res.status(400).send("New employee must have name.");
  } else {
    const newEmployee = addEmployee(req.body.name);
    res.status(201).send(newEmployee);
  }
});

export default empRouter;
