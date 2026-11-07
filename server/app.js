const express = require ('express')
const cors = require('cors')
const logger = require('./logger')

const countryRouter = require('./routers/countries')
const presidentRouter = require('./routers/presidents')

const app = express()
app.use(cors())
app.use(logger)
app.use(express.json())

app.use('/countries', countryRouter)
app.use('/presidents', presidentRouter)

module.exports = app

// express.use(startingPath, middleware)
// express.METHOD(exactPath, middleware) 
// we passing middleware


