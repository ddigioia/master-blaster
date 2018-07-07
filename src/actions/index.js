import * as constants from '../constants'
import { hitTest } from '../helpers'

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

export function asteroidHit(asteroid, laserBolt) {
  return {
    type: constants.ASTEROID_HIT,
    asteroid: asteroid,
    laserBolt: laserBolt
  }
}

export function gameOver(ship) {
  return {
    type: constants.GAME_OVER,
    ship: ship
  }
}

export function asteroidHitTest() {
  return (dispatch, getState) => {

    var {
      asteroidField,
      laser
    } = getState()

    for (let i = 0, l = asteroidField.asteroids.length; i < l; i++) {
      let {
        radius,
        pos: {
          x,
          y
        },
        speed
      } = asteroidField.asteroids[i]
      let a = {
        radius,
        pos: {
          x,
          y
        },
        speed
      }
      for (let j = 0, m = laser.beams.length; j < m; j++) {
        let {
          radius,
          pos: {
            x,
            y
          }
        } = laser.beams[j]
        let b = {
          radius,
          pos: {
            x,
            y
          }
        }

        if (hitTest({
            pos: {
              x: a.pos.x,
              y: a.pos.y
            },
            radius: a.radius
          }, {
            pos: {
              x: b.pos.x,
              y: b.pos.y
            },
            radius: b.radius
          })) {
          dispatch(asteroidHit({
            index: i,
            speed: a.speed,
            pos: {
              x: a.pos.x,
              y: a.pos.y
            }
          }, {
            index: j,
            pos: {
              x: b.pos.x,
              y: b.pos.y
            }
          }))
        }
      }
    }
  }
}

export function shipHitTest() {
  return (dispatch, getState) => {
    var {
      ship,
      asteroidField
    } = getState()
    var {
      radius,
      pos: {
        x,
        y
      },
      speed
    } = ship
    let s = {
      radius,
      pos: {
        x,
        y
      },
      speed
    }
    for (let i = 0, l = asteroidField.asteroids.length; i < l; i++) {
      if (hitTest(
          asteroidField.asteroids[i],
          ship
        )) {
        dispatch(gameOver({
          speed: s.speed,
          pos: {
            x: s.pos.x,
            y: s.pos.y
          }
        }))
      }
    }
  }
}