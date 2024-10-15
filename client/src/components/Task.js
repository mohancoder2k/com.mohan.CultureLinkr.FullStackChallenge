// src/components/Task.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Task.css';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Add or update a task
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTaskId) {
            // Update task
            await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, {
                title,
                description,
                is_completed: isCompleted,
            });
        } else {
            // Add new task
            await axios.post('http://localhost:5000/api/tasks', {
                title,
                description,
                is_completed: isCompleted,
            });
        }
        setTitle('');
        setDescription('');
        setIsCompleted(false);
        setEditingTaskId(null);
        fetchTasks(); // Refresh task list
    };

    // Set task for editing
    const handleEdit = (task) => {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setIsCompleted(task.is_completed);
    };

    // Delete a task
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks(); // Refresh task list
    };

    return (
        <div className="task-container">
            <h1>To-Do List</h1>
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                    />
                    Completed
                </label>
                <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
            </form>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className={task.is_completed ? 'completed' : ''}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.is_completed ? 'Completed' : 'Incomplete'}</p>
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;
