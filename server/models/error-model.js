const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema({
    action: {
        type: String,
        required: [true, 'Action name is missing'],
    },
    data: {
        type: JSON,
        required: [true, 'Action data is missing'],
    },
    env: {
        type: String,
        required: [true, 'Environment is missing'],
    },
});

const ErrorLogger = mongoose.model('error-logs', errorSchema);

module.exports = { ErrorLogger };
