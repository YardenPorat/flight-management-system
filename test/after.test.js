const mongoose = require('mongoose');
const db = require('../db-generator/test-db');

after(function () {
    db.destroy();
    mongoose.disconnect();
});
