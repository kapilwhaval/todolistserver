const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    attachments : [String],
    status: {
        type: String,
        enum: ['pending', 'progress', 'completed'],
        default: 'pending'
    },
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema);