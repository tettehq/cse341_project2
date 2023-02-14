const mongodb = require('../models/connect');
const ObjectId = require('mongodb').ObjectId;
const { movieSchema } = require('../helpers/validate');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('movies').find();
        result.toArray((err, data) => {
        if (err) {
            res.status(500).json({ message : err.message || `could not find the requested resource.`});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getSingle = async (req, res) => {
    try {
        const movieId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('movies').find({_id:movieId});
        result.toArray((err, data) => {
            if (err) {
                res.status(500).json({ message : err.message || `could not find the requested resource.`});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
    });
    } catch (err) {
        res.status(500).json(err);
    }
};

const addMovie = async (req, res) => {
    try {
        const movie = {
        title: req.body.title,
        genre: () => {
            if (req.body.genre) {
                req.body.genre.split(/,\s/);
            }
        },
        releaseDate: req.body.releaseDate,
        director: () => {
            if (req.body.director) {
                req.body.director.split(/,\s/);
            }
        },
        stars: () => {
            if (req.body.stars) {
                req.body.stars.split(/,\s/);
            }
        },
        synopsis: req.body.synopsis,
        runtime: req.body.runtime,
        imdbRating: req.body.imdbRating
        };
    
        const validMovie = await movieSchema.validateAsync(movie);

        const response = await mongodb.getDb().db().collection('movies').insertOne(validMovie);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || "an error occured while adding the student.");
        }
        
    } catch (error) {
        res.status(500).json({Error : error.message});
    }
}

const updateMovie = async (req, res) => {
    try {
        const movieId = new ObjectId(req.params.id);
        if (!movieId) {
            res.status(400).send({ message: 'Invalid ID supplied'});
        }
        const movie = {
            title: req.body.title,
            genre: () => {
                if (req.body.genre) {
                    req.body.genre.split(/,\s/);
                }
            },
            releaseDate: req.body.releaseDate,
            director: () => {
                if (req.body.director) {
                    req.body.director.split(/,\s/);
                }
            },
            stars: () => {
                if (req.body.stars) {
                    req.body.stars.split(/,\s/);
                }
            },
            synopsis: req.body.synopsis,
            runtime: req.body.runtime,
            imdbRating: req.body.imdbRating
        };
        
        const validMovie = await movieSchema.validateAsync(movie);

        const response = await mongodb.getDb().db().collection('movies').replaceOne({ _id:movieId },validMovie);
        if (response.modifiedCount > 0) {
            res.status(204).json(response);
        } else {
            res.status(500).json(response.error || "an error occured while updating the movie.");
        }
    } catch (error) {
        res.status(500).json({Error : error.message});
    }
}

const deleteMovie = async (req, res) => {
    try {
        const movieId = new ObjectId(req.params.id);
        if (!movieId) {
            res.status(400).send({ message: 'Invalid ID supplied'});
        }
        const response = await mongodb
        .getDb()
        .db()
        .collection('movies')
        .deleteOne({_id : movieId});
        if (response.deletedCount > 0) {
        res.status(200).json(response);
        } else {
        res.status(500).json(response.error || "an error occured while deleting the contact.")
        }
    } catch (error) {
        res.status(500).json({Error : error.message});
    }
  };

module.exports = {
    getAll,
    getSingle,
    addMovie,
    updateMovie,
    deleteMovie
};