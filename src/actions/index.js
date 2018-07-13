import * as constants from '../constants'
import { hitTest, updateObj } from '../helpers'

export function start() {
  return {
    type: constants.START
  }
}

export function rotateLeft() {
  return {
    type: constants.ROTATE_LEFT
  }
}

export function rotateRight() {
  return {
    type: constants.ROTATE_RIGHT
  }
}

export function forward() {
  return {
    type: constants.FORWARD
  }
}

export function update() {
  return {
    type: constants.UPDATE
  }
}

export function stop() {
  return {
    type: constants.STOP
  }
}

export function stopRotation() {
  return {
    type: constants.STOP_ROTATION
  }
}

export function fire(laserOrigin) {
  return {
    type: constants.FIRE,
    laserOrigin: laserOrigin
  }
}

export function asteroidHit(asteroid, laserBeam) {
  return {
    type: constants.ASTEROID_HIT,
    asteroid: asteroid,
    laserBeam: laserBeam
  }
}

export function gameOver(ship) {
  return {
    type: constants.GAME_OVER,
    ship: ship
  }
}

export function pause() {
  return {
    type: constants.PAUSE
  }
}

export function createAsteroids(asteroidCount) {
  return {
    type: constants.CREATE_ASTEROIDS,
    asteroidCount: asteroidCount
  }
}

export function asteroidHitTest() {
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

export function shipHitTest() {
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