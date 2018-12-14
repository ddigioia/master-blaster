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

function updateUserScore (name, userHighScore) {
  return knex('users')
          .where('userName', name)
          .update({ userHighScore })
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

            // user exists and passwords match
            if (user && user[0] && user[0].userPassword === bodyPassword) {
              return Promise.resolve(user)
            }

            // user exists and passwords do not match
            if (user && user[0]) {
              Promise.reject('User name and password do not match.')
            }

            // user does not exist
            return Promise.reject('User does not exist')
          })
        })
      ]
    case 'updateUser':
      return [

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
    userPassword: userPassword,
    userHighScore: 0
  }

  insertUser(user)
    .then(userId => {
      res
        .status(200)
        .set('token', token)
        .json(
          {
            user: {
              userId: userId[0],
              userName,
              userHighScore: 0
            },
            message: 'Successful sign up!'
          }
        )
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

  getUserByName(userName)
    .then(user => {
      const { userName, userId, userHighScore } = user[0]
      res
        .status(200)
        .set('token', token)
        .json(
          {
            user: {
              userName,
              userId,
              userHighScore
            },
            message: 'Successful login!'
          }
        )
    })
}

function getAllUsers (req, res, next) {
  getUsers()
    .then(users => {
      res
        .status(200)
        .json(users)
    })
    .catch(err => {
      next(err)
    })
}

function getSingleUser (req, res, next) {
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
}

function updateUser (req, res, next) {
  const {
    params: {
      userName
    },
    body: {
      userHighScore
    },
    headers: {
      token
    }
  } = req

  // verify jwt token on these requests
  const verified = jwt.verify(token, {subject: userName})

  if (verified) {
    updateUserScore(userName, userHighScore)
      .then(() => {
        res
          .status(200)
          .json({message: 'Successfully updated user high score'})
      })
      .catch(err => {
        next(err)
      })
  } else {
    res.status(200).json({message: 'Error updating user high score'})
  }
}

// routes

// returns all users
router.get('/', getAllUsers)

// returns a single user
router.get('/:userName', getSingleUser)

// creates a user
router.post('/', validate('createUser'), createUser)

// logs in a user
router.post('/login', validate('loginUser'), loginUser)

// update a user
router.put('/:userName', validate('updateUser'), updateUser)

module.exports = router