const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'pending', 'closed'],
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Task = mongoose.model('task', TaskSchema);
