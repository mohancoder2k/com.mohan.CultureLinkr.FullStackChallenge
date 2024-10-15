const db = require('../config/db');

const Task = {
    getAll: (callback) => {
        db.query('SELECT * FROM tasks', callback);
    },

    add: (task, callback) => {
        // Ensure you're including the description field
        db.query('INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)', 
            [task.title, task.description, task.is_completed], callback);
    },

    update: (id, task, callback) => {
        // Include description in the update query
        db.query('UPDATE tasks SET title = ?, description = ?, is_completed = ? WHERE id = ?', 
            [task.title, task.description, task.is_completed, id], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
    },
};

module.exports = Task;
