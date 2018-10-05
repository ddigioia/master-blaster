const express = require('express')
const Knex = require('knex')
const app = express()
const crypto = require('crypto')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000

// allows env variables to be pulled through
require('dotenv').config()

// allows proxy - necessary for Cloud SQL - to be used
app.enable('trust proxy')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// ** Can include other bodyparser methods if needed **
// ** maybe setup some error handling **

// create connection obj
const knex = connect()

function connect () {
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  }

  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
  }

  // Connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config
  })

  return knex
}

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Outerspace' })
})

app.listen(port, () => console.log(`Listening on port ${port}`))

function insertUser (knex, user) {
  return knex('users').insert(user)
}

function getUser (knex, id) {
  return knex('users')
          .where('userId', id)
          .select()
}

app.get('/api/user:id', (req, res, next) => {

  getUser(knex, id)
    .then(user => {
      res
        .status(200)
        .set('Content-Type', 'text/plain')
        .send(`User name:\n${user.userName}`)
        .end()
    })
    .catch(err => {
      next(err)
    })
})

app.post('/api/user', (req, res, next) => {
  const {
    body: {
      userName,
      userPassword,
      userId
    }
  } = req

  const user = {
    userId: userId,
    userName: crypto.createHash('sha256').update(userName).digest('hex'),
    userPassword: crypto.createHash('sha256').update(userPassword).digest('hex')
  }

  insertUser(knex, user)
    .then(user => {
      res
        .status(200)
        .set('Content-Type', 'application/json')
        .send(user)
        .end()
    })
    .catch(err => {
      next(err)
    })
})
