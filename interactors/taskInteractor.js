const Task = require('../models/Task');

const getTask = async (taskId) => {
    const task = await Task.findById(taskId);
    return task;
};

const getTasks = async (filters) => {
    const tasks = await Task.find(filters);
    return tasks;
};

const createTask = async (taskData) => {
    const newTask = new Task(taskData);
    const task = await newTask.save();
    return task;
};

const updateTask = async (taskData) => {
    const newTask = new Task(taskData);
    const task = await newTask.save();
    return task;
};

const deleteTask = async (taskId) => {
    const task = await Task.findById(taskId);
    await task.remove();
};

// TODO: error handling for connections to DB would be nice

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask };
