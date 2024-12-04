const express = require('express');
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const router = express.Router();

router.get('/:userId', getTodos);      
router.post('/:userId', addTodo);      
router.put('/:id', updateTodo);       
router.delete('/:id', deleteTodo);    

module.exports = router;