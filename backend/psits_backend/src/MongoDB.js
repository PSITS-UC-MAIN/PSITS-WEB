const mongoose = require('mongoose');

const database = () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const db = mongoose.connection;

    db.on('error', (error) => {console.log(error);});
    db.once('open', () => {console.log('MongoDB - Database Connected')});
}
module.exports = database;