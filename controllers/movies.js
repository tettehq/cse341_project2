const mongodb = require('../models/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('movies').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const movieId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('movies').find({_id:movieId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

const addMovie = async (req, res) => {
    const movie = {
        title: req.body.title,
        genre: req.body.genre.split(/,\s/),
        releaseDate: req.body.releaseDate,
        director: req.body.director.split(/,\s/),
        stars: req.body.stars.split(/,\s/),
        synopsis: req.body.synopsis,
        runtime: req.body.runtime,
        imdbRating: req.body.imdbRating
        };
    

    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || "an error occured while adding the student.");
    }
}

module.exports = {
    getAll,
    getSingle,
    addMovie
};