const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// const encryptor = require('simple-encryptor')(process.env.SECRET_KEY)
const knex = require('../knex')
const jwt = require('../jwt')
const { body, validationResult } = require('express-validator/check')

// middleware
// ** Can include other bodyparser methods if needed **
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// ** maybe setup some error handling **

// DB interactions
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

function getUserByName (name) {
  return knex('users')
          .where('userName', name)
          .select()
}

// helper functions
function validate (method) {
  switch (method) {
    case 'createUser':
      return [
        body('userName', 'userName doesn\'t exist.').exists(),
        body('userPassword', 'userPassword isn\'t long enough.').isLength({ min: 8 }),
        body('userName').custom(name => {
          return getUserByName(name).then(user => {
            if (user && user.length) {
              return Promise.reject('User name already in use.')
            }
          })
        })
      ]
    case 'loginUser':
      return [
        body('userName', 'userName doesn\'t exist.').exists(),
        body('userPassword', 'userPassword isn\'t long enough.').isLength({ min: 8 }),
        body('userName').custom((name, { req }) => {
          return getUserByName(name).then(user => {
            const bodyPassword = req.body.userPassword

            if (user && user[0] && user[0].userPassword === bodyPassword) {
              console.log('user: ', user)
              return Promise.resolve(user)
            }

            return Promise.reject('User name and password do not match.')
          })
        })
      ]
  }
}

function createUser (req, res, next) {
  // Check for errors
  const errors = validationResult(req)

  // Send errors back in response
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() })
  }

  const {
    body: {
      userName,
      userPassword
    }
  } = req

  // jwt authentication
  const token = jwt.sign({userName}, {subject: userName})

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
    .then(({userName, userId}) => {
      res
        .status(200)
        .set('token', token)
        .json({userName, userId, message: 'Successful sign up!'})
    })
    .catch(err => {
      next(err)
    })
}

function loginUser (req, res, next) {
  // Check for errors
  const errors = validationResult(req)

  // Send errors back in response
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() })
  }

  const {
    body: {
      userName
    }
  } = req

  // jwt authentication
  const token = jwt.sign({userName}, {subject: userName})

  const user = {
    userName: userName
  }

  return res
          .status(200)
          .set('token', token)
          .json({user, message: 'Successful login!'})
}

// routes

// returns all users
router.get('/', (req, res, next) => {
  getUsers()
    .then(users => {
      res
        .status(200)
        .json(users)
    })
    .catch(err => {
      next(err)
    })
})

// returns a single user
router.get('/:userName', (req, res, next) => {
  const {
    params: {
      userName
    },
    headers: {
      token
    }
  } = req

  // verify jwt token on these requests
  const verified = jwt.verify(token, {subject: userName})

  if (verified) {
    getUserByName(userName)
      .then(user => {
        res
          .status(200)
          .json({user: user[0], message: 'Success'})
      })
      .catch(err => {
        next(err)
      })
  } else {
    res.status(200).json({message: 'Error. Not authorized.'})
  }

})

// creates a user
router.post('/', validate('createUser'), createUser)

// logs in a user
router.post('/login', validate('loginUser'), loginUser)

module.exports = router