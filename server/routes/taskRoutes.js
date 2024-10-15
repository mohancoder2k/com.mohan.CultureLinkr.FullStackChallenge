const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

router.get('/tasks', TaskController.getAllTasks);
router.post('/tasks', TaskController.addTask);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

module.exports = router;
