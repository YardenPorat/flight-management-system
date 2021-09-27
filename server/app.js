const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const loginRoutes = require('./routers/login-router');
const airlineRoutes = require('./routers/airlines-router');
const customerRoutes = require('./routers/customers-router');
const flightRoutes = require('./routers/flights-router');
const userRoutes = require('./routers/users-router');
const ticketsRoutes = require('./routers/tickets-router');
const countriesRoutes = require('./routers/countries-router');

const mongo = config.get('mongo');
const swaggerConfig = config.get('swagger');
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

const openApiSpecification = swaggerJsdoc(swaggerConfig);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));
app.use('/auth', loginRoutes);
app.use('/airlines', airlineRoutes);
app.use('/customers', customerRoutes);
app.use('/users', userRoutes);
app.use('/flights', flightRoutes);
app.use('/countries', countriesRoutes);
app.use('/tickets', ticketsRoutes);
