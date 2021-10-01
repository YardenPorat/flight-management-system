const { ClientAction } = require('../models/action-model');

async function logAction(action, data) {
    const log = new ClientAction({ action, data, env: process.env.NODE_ENV ?? 'dev' });
    await log.save();
}

module.exports = {
    logAction,
};
