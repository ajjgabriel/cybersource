/**
 * Created by gaang on 18/4/18.
 */
const mongoose = require('mongoose');

// make bluebird default Promise
mongoose.Promise = require('bluebird');

let url = process.env.MONGODB_URI || process.env.DB_URL || 'mongodb://localhost:27017/olympics-hero';
// connect to mongo db
mongoose.connect(url, { keepAlive: 1, connectTimeoutMS: 30000, useNewUrlParser: true });
mongoose.connection.on('connected', ()=>{
    console.log(`Connection successful to : ${url}`)
})
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${url}`);
});

module.exports = mongoose;