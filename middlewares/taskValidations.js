const Task = require('../models/Task');

const taskExists = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.taskid);
        if (!task) {
            throw Error;
        }
        req.task = task;
        return next();
    } catch (error) {
        return res.status(404).json({
            errors: [{ msg: 'Task with this ID does not exist.' }],
        });
    }
};

module.exports = {
    taskExists,
};
