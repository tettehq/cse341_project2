// const mongodb = require('../models/connect');
// const { genreSchema } = require('../helpers/validate');
const db = require('../models');
const Genre = db.genre;

const getAll = async (req, res) => {
    try {
        // const result = await mongodb.getDb().db().collection('genres').find();
        // result.toArray((err, data) => {
        // if (err) {
        //     res.status(500).json({ message : err.message || `could not find the requested resource.`});
        // }
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json(data);

        Genre.find({}).then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
          }).then( (err) => {
            if (err) {
            res.status(500).json({ message : err.message || `could not find the requested resource.`});
            }
          })
    } catch (error) {
        res.status(500).json(error.message)
    }
};

const getSingle = async (req, res) => {
    try {
        // const name = req.params.genreName.toLowerCase();
        // if (!name) {
        //     res.status(400).send({message: 'Invalid genre name supplied'});
        // }
        // const result = await mongodb.getDb().db().collection('genres').find({genreName:name});
        // result.toArray((err, data) => {
        //     if (err) {
        //         res.status(500).json({ message : err.message || `could not find the requested resource.`});
        //     }
        //     res.setHeader('Content-Type', 'application/json');
        //     res.status(200).json(data);
        // });

        const name = req.params.genreName;
        Genre.findOne({ genreName: name })
        .then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
          }).then( (err) => {
            if (err) {
            res.status(500).json({ message : err.message || `could not find the requested resource.`}
            )}
        });
    } catch (error) {
        res.status(500).json({Error: error.message});
    }
}

const addGenre = async (req, res) => {
    try {

        const genrename = req.body.genreName
        const movieList = req.body.movies.split(/,\s/);

        const genre = new Genre();
        genre.genreName = genrename;
        genre.movies = movieList;
        
        genre.save()
        .then((data) => {
        console.log(data);
        res.status(201).send(data);
        })
        .catch((err) => {
        res.status(400).json(err.message || 'Some error occurred while creating the contact.');
        })

        // const validGenre = await genreSchema.validateAsync(genre);
        // const response = await mongodb.getDb().db().collection('genres').insertOne(validGenre);
        // if (response.acknowledged) {
        //     res.status(201).json(response);
        // } else {
        //     res.status(500).json(response.error || "an error occured while adding the student.");
        // }
    } catch (error) {
        res.status(500).json({Error: error})
    }
}

const updateGenre = async (req, res) => {
    try {
        const genreId = req.params.id;
        const genrename = req.body.genreName
        const movieList = req.body.movies.split(/,\s/);

        const genre = {
            genreName: genrename,
            movies: movieList
        }
        
        Genre.findByIdAndUpdate(genreId, genre )
        .then((data) => {
        console.log(data);
        res.status(204).send(data);
        })
        .catch((err) => {
        res.status(400).json(err.message || 'Some error occurred while updating the resource.');
        })

    } catch (error) {
        res.status(500).json({Error: error})
    }
}

const deleteGenre = async (req, res) => {
    try {
        const name = req.params.genreName;
        Genre.deleteOne({ genreName: name }).then((data) => {
            res.status(204).send(data);
          })
          .catch((err) => {
            res.status(500).send(err.message || 'Some error occurred while deleting the resource.');
          });
    } catch (error) {
        res.status(500).json({Error : error.message});
    }
  };

module.exports = {
    getAll,
    getSingle,
    addGenre,
    updateGenre,
    deleteGenre
};