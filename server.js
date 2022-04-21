const express = require("express");
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5009
const connectDB = require('./dbconnect')


const app = express()
connectDB()
app.use(express.json())


// ROUTES
const rmovies = require('./routes/rmovies')
const rusers = require('./routes/rusers')

app.use('/movie', rmovies)
app.use('/auth', rusers)



app.listen(PORT, ()=>{console.log(`server working at ${PORT}`)})