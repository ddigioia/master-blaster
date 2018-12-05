import * as constants from '../constants'
import { hitTest, updateObj } from '../helpers'

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

export function loggedIn (userName) {
  return {
    type: constants.LOGGED_IN,
    userName
  }
}

export function loggedOut () {
  return {
    type: constants.LOGGED_OUT
  }
}

export function newHighScore (highScore) {
  return {
    type: constants.NEW_HIGH_SCORE,
    highScore
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
      asteroid
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
        dispatch(gameOver(s))
        break
      }
    }
  }
}
