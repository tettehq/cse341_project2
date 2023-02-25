// const mongodb = require('../models/connect');
// const ObjectId = require('mongodb').ObjectId;
// const { movieSchema } = require('../helpers/validate');
const db = require('../models');
const Movie = db.movie;

const getAll = async (req, res) => {
    try {
        Movie.find({})
          .then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
          })
          .then((err) => {
            if (err) {
              res
                .status(500)
                .json({ message: err.message || `could not find the requested resource.` });
            }
          });
    } catch (error) {
        res.status(500).json(error.message)
    }
};

const getSingle = async (req, res) => {
    try {
        const movieId = req.params.id;
        Movie.findOne({ _id: movieId })
          .then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
          })
          .catch((err) => {
              res
                .status(500)
                .json({ message: err.message || `could not find the requested resource.` });
            }
          );
    } catch (err) {
        res.status(500).json(err);
    }
};

const addMovie = async (req, res) => {
    try {
        const genreList = req.body.genre.split(/,\s/);
        const directorList = req.body.director.split(/,\s/);
        const starsList = req.body.stars.split(/,\s/);

        const movie = new Movie();
        movie.title = req.body.title;
        movie.genre = genreList;
        movie.releaseDate = req.body.releaseDate;
        movie.director = directorList;
        movie.stars = starsList;
        movie.synopsis = req.body.synopsis;
        movie.runtime = req.body.runtime;
        movie.imdbRating = req.body.imdbRating;
        
        movie
          .save()
          .then((data) => {
            console.log(data);
            res.status(201).send(data);
          })
          .catch((err) => {
            res.status(500).send(err.message || 'Some error occurred while creating the resource.');
          });
        
    } catch (error) {
        res.status(500).json({Error : error.message});
    }
}

const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        

        const genreList = req.body.genre.split(/,\s/);
        const directorList = req.body.director.split(/,\s/);
        const starsList = req.body.stars.split(/,\s/);

        const movie = {
            title: req.body.title,
            genre: genreList,
            releaseDate: req.body.releaseDate,
            director: directorList,
            stars: starsList,
            synopsis: req.body.synopsis,
            runtime: req.body.runtime,
            imdbRating: req.body.imdbRating
        };

        Movie.findByIdAndUpdate(movieId, movie).then((data) => {
            res.status(204).send(data);
          })
          .catch((err) => {
            res.status(500).send(err.message || 'Some error occurred while updating the resource.');
          });
        
        
    } catch (error) {
        res.status(500).json({Error : error.message});
    }
}

const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        Movie.deleteOne({ _id: movieId }).then((data) => {
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
    addMovie,
    updateMovie,
    deleteMovie
};