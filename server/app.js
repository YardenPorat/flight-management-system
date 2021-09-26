const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginRoutes = require('./routers/login-router');
const airlineRoutes = require('./routers/airline-router');
const mongo = config.get('mongo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
    .connect(mongo.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => console.log(`Listening to port ${3000}`));
    })
    .catch((err) => console.log(err));

// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(loginRoutes);
app.use(airlineRoutes);
