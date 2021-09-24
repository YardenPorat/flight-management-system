const db = require('../db-generator/test-db');

after(function () {
    db.destroy();
});
