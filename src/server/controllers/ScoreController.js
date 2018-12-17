const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const knex = require('../knex')
const jwt = require('../jwt')
const { body, validationResult } = require('express-validator/check')

// middleware
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// DB interactions
function insertScore (score) {
  return knex('scores').insert(score)
}

function fetchHighScores () {
  return knex
          .select('userName', 'value')
          .from('scores')
          .orderBy('value', 'desc')
          .limit(10)
}

function fetchScore (id) {
  return knex('scores')
          .where('scoreId', id)
          .select()
}

function fetchScoreByUserName (name) {
  return knex('scores')
          .where('userName', name)
          .select()
}

// helper functions
function validate (method) {
  switch (method) {
    case 'createScore':
      return [
        body('value', 'score doesn\'t exist.').exists(),
        body('userName', 'user name doesn\'t exist.').exists(),
        body('userId', 'user id doesn\'t exist.').exists()
      ]
  }
}

function getHighScores (req, res, next) {
  fetchHighScores()
    .then(scores => {
      res
        .status(200)
        .json(scores)
    })
    .catch(err => {
      next(err)
    })
}

function getUserScore (req, res, next) {
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
    fetchScoreByUserName(userName)
      .then(score => {
        res
          .status(200)
          .json({score, message: 'Success'})
      })
      .catch(err => {
        next(err)
      })
  } else {
    res.status(200).json({message: 'Error. Not authorized.'})
  }
}

function createScore (req, res, next) {
  // Check for errors
  const errors = validationResult(req)

  // Send errors back in response
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() })
  }

  const {
    body: {
      userName,
      value,
      userId
    }
  } = req

  // jwt authentication
  const token = jwt.sign({userName}, {subject: userName})

  const score = {
    userName: userName,
    value: value,
    userId: userId
  }

  insertScore(score)
    .then(() => {
      res
        .status(200)
        .set('token', token)
        .json({score, message: 'Score recorded!'})
    })
    .catch(err => {
      next(err)
    })
}

// ===== routes ===== //

// returns high scores
router.get('/', getHighScores)

// returns a single user's score
router.get('/:userName', getUserScore)

// creates a score
router.post('/', validate('createScore'), createScore)

module.exports = router