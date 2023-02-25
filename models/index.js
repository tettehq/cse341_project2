// using mongoose for database connection
const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.movie = require('./movies');
db.genre = require('./genres');

module.exports = db;
