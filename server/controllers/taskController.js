const Task = require('../models/taskEntity');

const TaskController = {
    // Get all tasks
    getAllTasks: (req, res) => {
        Task.getAll((err, tasks) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to fetch tasks' });
            } console.log("Tasks has been retreived ", {status : 200, data: res.data})
            res.status(200).json(tasks);  });
    },

    
    addTask: (req, res) => {
        const { title, description, is_completed = false } = req.body; 

      
        if (!title) {
            return res.status(400).json({ error: 'Task title is required' });
        }

        const task = { title, description, is_completed };
        console.log("Task has been added")
        Task.add(task, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to add task' });
            }        res.status(201).json({ id: result.insertId, ...task });
        });
    },

    
    updateTask: (req, res) => {
        const { id } = req.params;
        const { title, description, is_completed } = req.body;

 if (!title && !description && is_completed === undefined) {
            return res.status(400).json({ error: 'At least one field (title, description, or is_completed) is required' });
        }

        const task = { title, description, is_completed };
        Task.update(id, task, (err) => {
                 if (err) {
        console.error(err);
                
            return res.status(500).json({ error: 'Failed to update task' });
            } res.status(200).json({ id, ...task });
        });
    },

    
    deleteTask: (req, res) => {
        const { id } = req.params;
        Task.delete(id, (err) => {
            if (err) {
                console.error(err);
                    return res.status(500).json({ error: 'Failed to delete task' });
            }   
            res.status(204).send();
        });
    },
};

module.exports = TaskController;
