require('dotenv').config();
const express = require('express');
const compression = require('compression');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
let PORT = process.env.PORT??80;

db.on('error', (error) => {console.log(error)});
db.once('open', () => {console.log('Database Connected')});

// middlewares
app.use(express.json()); // uses JSON as payload
app.use(compression()); // compresses all routes

// routes

// run the app
const server = app.listen(PORT, () => {
    console.log(`Server has started, running on port: ${PORT}`)
})

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout   = 120 * 1000;
