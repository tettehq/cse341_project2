const mongodb = require('../models/connect');

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('genres').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const name = req.params.genreName.toLowerCase();
    const result = await mongodb.getDb().db().collection('genres').find({genreName:name});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

const addGenre = async (req, res) => {
    const genre = {
        genreName: req.body.genres.toLowerCase(),
        movies: req.body.movies.split(/,\s/)
        };
    

    const response = await mongodb.getDb().db().collection('genres').insertOne(genre);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || "an error occured while adding the student.");
    }
}

module.exports = {
    getAll,
    getSingle,
    addGenre
};