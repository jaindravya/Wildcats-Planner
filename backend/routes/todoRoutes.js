const express = require('express');
const router = express.Router();
const Task = require('../models/todoModel.js');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    date: req.body.date,
    status: req.body.status || 'pending',
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH (update) a task
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (req.body.status) task.status = req.body.status;
    if (req.body.name) task.name = req.body.name;
    if (req.body.date) task.date = req.body.date;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
