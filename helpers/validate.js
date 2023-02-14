const Joi = require('@hapi/joi');

const movieSchema = Joi.object({
    title: Joi.string().required(),
    genre: Joi.array().required(),
    releaseDate: Joi.string().required(),
    director: Joi.array(),
    stars: Joi.array(),
    synopsis: Joi.string(),
    runtime: Joi.string().required(),
    imdbRating: Joi.string()
});

const genreSchema = Joi.object({
    genreName: Joi.string().required(),
    movies: Joi.array().required()
});

module.exports = {
    movieSchema,
    genreSchema
}