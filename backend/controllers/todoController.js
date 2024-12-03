const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findOne({ userId: req.params.userId });
    if (!todos) return res.status(404).json({ message: 'No todos found' });

    res.status(200).json(todos.todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.params.userId;

    let todoList = await Todo.findOne({ userId });

    if (!todoList) {
      // Create new todo list if user doesn't have one
      todoList = new Todo({ userId, todos: [] });
    }

    todoList.todos.push({ task });
    await todoList.save();

    res.status(201).json(todoList.todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const result = await Todo.updateOne(
      { 'todos._id': id },
      { $set: { 'todos.$.completed': completed } }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Todo.updateOne(
      {},
      { $pull: { todos: { _id: id } } }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};