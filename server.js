const express = require("express");
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5009
const connectDB = require('./dbconnect')
const swaggerDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')


const app = express()
connectDB()
app.use(express.json())

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Movie database API',
            version: '1.3.0',
            description: 'A simple API that allows you to read, create, update and delete movies from a database'
        },
        servers: [
            {
                url: 'http://locahost:5010'
            }
         ],
    }, 
        apis:['./routes/*.js'],
}


const swaggerDocs = swaggerDoc(swaggerOptions)

// ROUTES

/**
 * @swagger
 * components:
 *  schemas:
 *      Movie:
 *          type:object:
 *              - title
 *              - year
 *          properties:
 *              id:
 *                  type: string
 *                  description: auto-generated ID of the movie
 *              title:
 *                  type: string
 *                  description: the title of the movie
 *              year:
 *                  type: number,
 *                  description:release year
*/
const rmovies = require('./routes/rmovies')
const rusers = require('./routes/rusers')

app.use('/api-docum', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/movie', rmovies)
app.use('/auth', rusers)



app.listen(PORT, ()=>{console.log(`server working at ${PORT}`)})