require('dotenv').config();
const express = require('express');
const compression = require('compression');
const database = require('./src/MongoDB');
const app = express();

let PORT = process.env.PORT??80;

// run database
database();

// middlewares
app.use(express.json()); // uses JSON as payload
app.use(compression()); // compresses all routes

// routes
app.use('/', require('./src/routes/main'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/user', require('./src/routes/users'));

// run the app
const server = app.listen(PORT, () => {
    console.log(`Server has started, running on port: ${PORT}`)
})

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout   = 120 * 1000;
