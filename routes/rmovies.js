const router = require('express').Router();
const {getMovies, getMovie, createMovie, updateMovie, deleteMovie} = require('../controllers/cmovies')
const auth = require('../routes/verifyToken')
// get all movies
router.get('/', getMovies)

// get one movie by id
router.get('/:title', getMovie)

// create a new movie
router.post('/',auth, createMovie)

// update a movie by id
router.post('/:title',auth, updateMovie)

// delete a movie by id
router.delete('/:title',auth, deleteMovie)

module.exports = router