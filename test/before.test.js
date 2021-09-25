const mongoose = require('mongoose');
const config = require('config');

const mongo = config.get('mongo');

before(function () {
    (async () => {
        try {
            await mongoose.connect(mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.log(err);
        }
    })();
});
