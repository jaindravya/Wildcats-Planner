const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
    completed: false,
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
};

// need to add other methods
