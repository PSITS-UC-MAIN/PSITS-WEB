const mongoose = require('mongoose');
const config = require('./utils/Config');

const database = () => {
    console.log('Connecting to mongodb')
    mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const db = mongoose.connection;

    db.on('error', (error) => {console.log(error);});
    db.once('open', () => {console.log('MongoDB - Database Connected')});
}
module.exports = database;