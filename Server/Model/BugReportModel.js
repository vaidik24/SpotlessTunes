const mongoose = require('mongoose')

const bugSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String, required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Bug = mongoose.model('Bug', bugSchema);

module.exports = {Bug};