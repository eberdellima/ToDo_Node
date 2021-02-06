const express = require('express');
const router = express.Router()
const TodoController = require('../controllers/todoController');


router.get('/', TodoController.list);
router.post('/', TodoController.add);
router.patch('/:id', TodoController.edit);
router.delete('/:id', TodoController.delete);

module.exports = router