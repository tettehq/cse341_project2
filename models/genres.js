const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genreName: {type: String, lowercase: true, required: true},
    movies: {type: Array, required: true}
}, {versionKey: false});

module.exports = mongoose.model('genre', genreSchema, 'genres');