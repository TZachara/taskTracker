const express = require('express');
const {
    requestTaskCreationRules,
    requestTaskUpdateRules,
    requestTaskStatusUpdateRules,
    requestValidation,
} = require('../middlewares/requestValidation');
const { taskExists } = require('../middlewares/taskValidations');
const taskInteractor = require('../interactors/taskInteractor');

const router = express.Router();

router.get('/', async (req, res) => {
    const filters = req.query;
    const tasks = await taskInteractor.getTasks(filters);
    res.json(tasks);
});

router.get('/:taskid', taskExists, async (req, res) => {
    const task = req.task;
    res.json(task);
});

router.post('/', requestTaskCreationRules(), requestValidation, async (req, res) => {
    console.log('elo');
    const newTask = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    };
    const task = await taskInteractor.createTask(newTask);
    res.json(task);
});

router.put('/:taskid', requestTaskUpdateRules(), requestValidation, taskExists, async (req, res) => {
    const updatedTask = req.task;
    updatedTask.title = req.body.title;
    updatedTask.description = req.body.description;
    updatedTask.status = req.body.status;
    const task = await taskInteractor.updateTask(updatedTask);
    res.json(task);
});

router.put('/status/:taskid', requestTaskStatusUpdateRules(), requestValidation, taskExists, async (req, res) => {
    const updatedTask = req.task;
    updatedTask.status = req.body.status;
    const task = await taskInteractor.updateTask(updatedTask);
    res.json(task);
});

router.delete('/:taskid', taskExists, async (req, res) => {
    await taskInteractor.deleteTask(req.task._id);
    res.json({ success: [{ msg: 'Task removed' }] });
});

module.exports = router;

/* 
TODO:
1. Create abstraction for update whole task and update status - Reason: DRY Code
*/
