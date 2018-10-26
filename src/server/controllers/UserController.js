const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// const encryptor = require('simple-encryptor')(process.env.SECRET_KEY)
const knex = require('../knex')

// middleware
// ** Can include other bodyparser methods if needed **
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// ** maybe setup some error handling **
console.log('in user controller')
function insertUser (user) {
  return knex('users').insert(user)
}

function getUsers () {
  return knex.select().from('users')
}

function getUser (id) {
  return knex('users')
          .where('userId', id)
          .select()
}

// returns all users
router.get('/', (req, res, next) => {
  console.log('attempting to fetch users')
  getUsers()
    .then(users => {
      res
        .status(200)
        .set('Content-Type', 'application/json')
        .send(users)
        .end()
    })
    .catch(err => {
      next(err)
    })
})

// returns a single user
router.get('/:id', (req, res, next) => {
  const {
    params: {
      id
    }
  } = req

  getUser(id)
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

// creates a user
router.post('/', (req, res, next) => {
  const {
    body: {
      userName,
      userPassword
    }
  } = req

  // // encrypted version
  // const user = {
  //   userName: encryptor.encrypt(userName),
  //   userPassword: encryptor.encrypt(userPassword)
  // }

  const user = {
    userName: userName,
    userPassword: userPassword
  }

  insertUser(user)
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

module.exports = router