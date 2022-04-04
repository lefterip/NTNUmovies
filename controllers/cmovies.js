const Movie = require('../models/Movie')

// get all movies
const getMovies = async (req,res)=>{
    try{
        const showMovies = await Movie.find()
        return res.json(showMovies)
        
    }catch(error){
        return res.json({message:error})
    }
}
// get one movie
const getMovie = async (req,res)=>{
    try{
        const showMovie = await Movie.find({title:req.params.title})
         res.json(showMovie)
    }catch(error){
         res.json({message:error})
    }
    
}
// create a movie
const createMovie = async (req,res) =>{
   const nmovie = new Movie({
       title:req.body.title,
       year:req.body.year,
       tags:req.body.tags,
       cast:req.body.cast,
       rating:req.body.rating
   })
   nmovie.save()
    .then(data =>{
        res.json(data)
    })
    .catch(error =>{
        res.json({message:error})
    })
}
// update a movie
const updateMovie = async (req,res)=>{
    try{
        const updmovie = await Movie.updateOne({title:req.params.title},{$set:{year:req.body.year}})
        res.json(updmovie)
    }catch(error){
         res.json({message:error}) 
    }
}
// delete a movie
const deleteMovie = async (req,res)=>{
    try{
        await Movie.deleteOne({title:req.params.title})
        res.json({message:`movie deleted`})
    }catch(error){
         res.json({message:error}) 
    }
    
}

module.exports = {getMovies, getMovie, createMovie, updateMovie, deleteMovie}