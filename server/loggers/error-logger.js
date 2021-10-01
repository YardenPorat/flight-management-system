const { ErrorLogger } = require('../models/error-model');

async function logError(action, data) {
    const log = new ErrorLogger({ action, data, env: process.env.NODE_ENV ?? 'dev' });
    await log.save();
}

module.exports = {
    logError,
};
