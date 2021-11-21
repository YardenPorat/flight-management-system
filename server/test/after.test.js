const mongoose = require('mongoose');
const db = require('../db-generator/db');

after(function () {
    db.destroy();
    mongoose.disconnect();
});
