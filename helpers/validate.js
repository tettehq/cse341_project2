const Joi = require('@hapi/joi');

const movieSchema = Joi.object({
    title: Joi.string().required(),
    genre: Joi.required(),
    releaseDate: Joi.string().required(),
    director: Joi.required(),
    stars: Joi.required(),
    synopsis: Joi.string(),
    runtime: Joi.string().required(),
    imdbRating: Joi.string()
});

const genreSchema = Joi.object({
    genreName: Joi.string().required(),
    movies: Joi.required()
});

module.exports = {
    movieSchema,
    genreSchema
}