// debugger for GCP
require('@google-cloud/debug-agent').start()

const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const port = process.env.PORT || 5000

// allows env variables to be pulled through
// needs to be required before use
require('dotenv').config()

// allows proxy - necessary for Cloud SQL - to be used
app.enable('trust proxy')

// attach validator middleware
app.use(expressValidator())

// pull in controllers
const UserController = require('./controllers/UserController')
const ScoreController = require('./controllers/ScoreController')

app.use('/users', UserController)
app.use('/scores', ScoreController)

// serve static files from the build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.listen(port, () => console.log(`Listening on port ${port}`))
