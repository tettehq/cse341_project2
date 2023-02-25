const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: Array, required: true},
    releaseDate: {type: String},
    director: {type: Array, required: true},
    stars: {type: Array, required: true},
    synopsis: {type: String, required: true},
    runtime: {type: String, required: true},
    imdbRating: {type: String}
}, {versionKey: false, minimize: false});

module.exports = mongoose.model('movie', movieSchema, 'movies');