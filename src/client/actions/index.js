import * as constants from '../constants'
import { hitTest, updateObj, getCookie } from '../helpers'

export function start () {
  return {
    type: constants.START
  }
}

export function rotateLeft () {
  return {
    type: constants.ROTATE_LEFT
  }
}

export function rotateRight () {
  return {
    type: constants.ROTATE_RIGHT
  }
}

export function forward () {
  return {
    type: constants.FORWARD
  }
}

export function reverse () {
  return {
    type: constants.REVERSE
  }
}

export function update () {
  return {
    type: constants.UPDATE
  }
}

export function stop () {
  return {
    type: constants.STOP
  }
}

export function stopRotation () {
  return {
    type: constants.STOP_ROTATION
  }
}

export function fire (laser) {
  return {
    type: constants.FIRE,
    laser: laser
  }
}

export function asteroidHit (asteroid, laserBeam) {
  return {
    type: constants.ASTEROID_HIT,
    asteroid: asteroid,
    laserBeam: laserBeam
  }
}

export function powerUpHit (powerUp, laserBeam) {
  return {
    type: constants.POWER_UP_HIT,
    powerUp: powerUp,
    laserBeam: laserBeam
  }
}

export function gameOver (ship) {
  return {
    type: constants.GAME_OVER,
    ship: ship
  }
}

export function pause () {
  return {
    type: constants.PAUSE
  }
}

export function loggingIn () {
  return {
    type: constants.LOGGING_IN
  }
}

// Form actions
export function hideErrors () {
  return {
    type: constants.HIDE_ERRORS
  }
}

export function eraseForm () {
  return {
    type: constants.ERASE_FORM
  }
}

export function loginSelected () {
  return {
    type: constants.LOGIN_SELECTED
  }
}

export function signUpSelected () {
  return {
    type: constants.SIGNUP_SELECTED
  }
}

export function handleInput (name, value) {
  return {
    type: constants.HANDLE_INPUT,
    name,
    value
  }
}

export function nameTaken () {
  return {
    type: constants.NAME_TAKEN
  }
}

export function nameInvalid () {
  return {
    type: constants.NAME_INVALID
  }
}

export function passwordInvalid () {
  return {
    type: constants.PASSWORD_INVALID
  }
}

export function invalidCredentials () {
  return {
    type: constants.INVALID_CREDENTIALS
  }
}

export function validated () {
  return {
    type: constants.VALIDATED
  }
}

export function loggedIn (user) {
  return {
    type: constants.LOGGED_IN,
    user
  }
}

export function loggedOut () {
  return {
    type: constants.LOGGED_OUT
  }
}

export function newHighScore (highScore, updateOnlyUser) {
  return (dispatch, getState) => {
    let {
      user
    } = getState()

    // hit api to set new high score for user
    const { userName, userId, loggedIn } = user
    const token = getCookie('login_jwt')

    if (userId && token && loggedIn) {
      const body = {
        userName,
        userId,
        value: highScore
      }

      if (updateOnlyUser) {
        sendHighScoreReqUser(body, token)
      } else {
        sendHighScoreReq(body)
      }
    }
    dispatch(setHighScore(highScore))
  }
}

async function sendHighScoreReq (body) {
  const reqObj = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const route = '/scores'
  const req = await fetch(route, reqObj)
  const res = await req.json()
  res.token = req.headers.get('token')

  return res
}

async function getHighScores () {
  const req = await fetch('/scores')
  const res = await req.json()

  if (req.status !== 200) throw Error(res.message)

  console.log('Fetched high scores: ', res)

  return res
}

// Have to authenticate and send user data to update route in User controller
async function sendHighScoreReqUser (body, token) {
  const {userName, value: userHighScore} = body
  const reqObj = {
    method: 'PUT',
    body: JSON.stringify({userHighScore}),
    headers: new Headers({
      'Content-Type': 'application/json',
      token
    })
  }
  const route = `/users/${userName}`
  const req = await fetch(route, reqObj)
  const res = await req.json()
  res.token = req.headers.get('token')

  return res
}

export function setHighScore (userHighScore) {
  return {
    type: constants.SET_HIGH_SCORE,
    userHighScore
  }
}

export function setHighScores (highScores) {
  return {
    type: constants.SET_HIGH_SCORES,
    highScores
  }
}

export function createAsteroids (asteroidCount) {
  return {
    type: constants.CREATE_ASTEROIDS,
    asteroidCount: asteroidCount
  }
}

export function createPowerUp () {
  return {
    type: constants.CREATE_POWER_UP
  }
}

export function powerUpHitTest () {
  return (dispatch, getState) => {
    let {
      powerUp,
      laser
    } = getState()

    for (let i = 0; i < powerUp.powerUps.length; i++) {
      let {
        radius,
        position: {
          x,
          y
        },
        speed
      } = powerUp.powerUps[i]
      let a = {
        radius,
        position: {
          x,
          y
        },
        speed
      }
      for (let j = 0; j < laser.beams.length; j++) {
        let {
          radius,
          position: {
            x,
            y
          }
        } = laser.beams[j]
        let b = {
          radius,
          position: {
            x,
            y
          }
        }
        let isHit = hitTest(a, b)
        let hitPowerUp = updateObj(a, {index: i})
        let hitLaserBeam = updateObj(b, {index: j})

        if (isHit) {
          dispatch(powerUpHit(hitPowerUp, hitLaserBeam))
        }
      }
    }
  }
}

export function asteroidHitTest () {
  return (dispatch, getState) => {
    let {
      asteroid,
      laser
    } = getState()

    for (let i = 0; i < asteroid.asteroids.length; i++) {
      let {
        radius,
        position: {
          x,
          y
        },
        speed
      } = asteroid.asteroids[i]
      let a = {
        radius,
        position: {
          x,
          y
        },
        speed
      }
      for (let j = 0; j < laser.beams.length; j++) {
        let {
          radius,
          position: {
            x,
            y
          }
        } = laser.beams[j]
        let b = {
          radius,
          position: {
            x,
            y
          }
        }
        let isHit = hitTest(a, b)
        let hitAsteroid = updateObj(a, {index: i})
        let hitLaserBeam = updateObj(b, {index: j})

        if (isHit) {
          dispatch(asteroidHit(hitAsteroid, hitLaserBeam))
        }
      }
    }
  }
}

export function shipHitTest () {
  return (dispatch, getState) => {
    let {
      ship,
      asteroid,
      scoreBoard,
      user
    } = getState()
    let {
      radius,
      position: {
        x,
        y
      },
      speed
    } = ship
    let s = {
      radius,
      position: {
        x,
        y
      },
      speed
    }
    for (let i = 0; i < asteroid.asteroids.length; i++) {
      let isHit = hitTest(asteroid.asteroids[i], ship)

      if (isHit) {
        const { currentScore, highScores } = scoreBoard
        const { userHighScore } = user
        dispatch(gameOver(s))

        //  this checks to see if it's higher than the lowest (10th) high score,
        if (currentScore > highScores[9].value) {
          dispatch(newHighScore(currentScore))
          getHighScores().then(highScores => {
            dispatch(setHighScores(highScores))
          })
        }

        //  if currentScore is higher than userHighscore then update userHighScore (true)
        if (currentScore >= userHighScore) {
          dispatch(newHighScore(currentScore, true))
        }
        break
      }
    }
  }
}
