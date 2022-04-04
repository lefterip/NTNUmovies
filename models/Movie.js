const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
        },
    year: {
        type:Number,
        required: true
        },
    tags:[String],
    cast:[{
        name: String,
        role:String
    }],
    rating: Number
})

module.exports = mongoose.model("Movie", movieSchema)