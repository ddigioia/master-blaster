// debugger for GCP
require('@google-cloud/debug-agent').start()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

console.log('starting server')
// allows env variables to be pulled through
// needs to be required before use
require('dotenv').config()

// allows proxy - necessary for Cloud SQL - to be used
app.enable('trust proxy')

// pull in controllers
const UserController = require('./controllers/UserController')
app.use('/users', UserController)

// serve static files from the build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.listen(port, () => console.log(`Listening on port ${port}`))
