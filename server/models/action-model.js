const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
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

const ClientAction = mongoose.model('client-actions', actionSchema);

module.exports = { ClientAction };
