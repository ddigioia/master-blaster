import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist,
  updateObj
} from '../helpers'

let resetShip = {
  direction: undefined,
  rotation: undefined,
  position: {
    x: undefined,
    y: undefined
  },
  radius: undefined,
  rotationSpeed: undefined,
  speed: undefined
}

function initShip () {
  return {
    direction: 0,
    rotation: 0,
    position: {
      x: Math.round(screen.width() / 2),
      y: Math.round(screen.height() / 2)
    },
    radius: screen.width() / constants.SHIP_SCALE,
    rotationSpeed: 0,
    speed: 0,
    inertia: constants.SHIP_INERTIA
  }
}

function ship (state = resetShip, action) {
  let rotation

  switch (action.type) {
    case constants.START:
      return updateObj(state, initShip())
    case constants.ROTATE_RIGHT:
      return updateObj(state, {
        rotationSpeed: constants.SHIP_ROTATION_SPEED
      })
    case constants.ROTATE_LEFT:
      return updateObj(state, {
        rotationSpeed: -constants.SHIP_ROTATION_SPEED
      })
    case constants.FORWARD:
      return updateObj(state, {
        speed: constants.SHIP_ACCELERATION
      })
    case constants.REVERSE:
      return updateObj(state, {
        speed: -constants.SHIP_ACCELERATION
      })
    case constants.STOP:
      return updateObj(state, {
        speed: 0
      })
    case constants.STOP_ROTATION:
      return updateObj(state, {
        rotationSpeed: 0
      })
    case constants.GAME_OVER:
      return updateObj(state, resetShip)
    case constants.UPDATE:
      rotation = (state.rotation + 360 + state.rotationSpeed) % 360
      return updateObj(state, {
        position: {
          x: (state.position.x + calcXDist(state.direction, state.speed) +
            screen.width()) % screen.width(),
          y: (state.position.y + calcYDist(state.direction, state.speed) +
            screen.height()) % screen.height()
        },
        rotation: rotation,
        direction: rotation
      })
    default:
      return state
  }
}

export default ship