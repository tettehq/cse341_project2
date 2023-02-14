const mongodb = require('../models/connect');
const { genreSchema } = require('../helpers/validate');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('genres').find();
        result.toArray((err, data) => {
        if (err) {
            res.status(500).json({ message : err.message || `could not find the requested resource.`});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    });
    } catch (error) {
        res.status(500).json(error)
    }
};

const getSingle = async (req, res) => {
    try {
        const name = req.params.genreName.toLowerCase();
        if (!name) {
            res.status(400).send({message: 'Invalid genre name supplied'});
        }
        const result = await mongodb.getDb().db().collection('genres').find({genreName:name});
        result.toArray((err, data) => {
            if (err) {
                res.status(500).json({ message : err.message || `could not find the requested resource.`});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({Error: error.message});
    }
}

const addGenre = async (req, res) => {
    try {
        const genre = {
            genreName: () => {
                if (req.body.genreName) {
                    req.body.genreName.toLowerCase();
                }
            },
            movies: () => {
                if (req.body.movies) {
                    req.body.movies.split(/,\s/);
                }
            }
        };
        
        const validGenre = await genreSchema.validateAsync(genre);
    
        const response = await mongodb.getDb().db().collection('genres').insertOne(validGenre);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || "an error occured while adding the student.");
        }
    } catch (error) {
        res.status(500).json({Error: error.message})
    }
}

module.exports = {
    getAll,
    getSingle,
    addGenre
};