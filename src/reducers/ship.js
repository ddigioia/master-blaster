import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist
} from '../helpers'

const resetShip = {
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

function initShip() {
  return {
    direction: 0,
    rotation: 0,
    position: {
      x: Math.round(screen.width / 2),
      y: Math.round(screen.height / 2)
    },
    radius: screen.width / constants.SHIP_SCALE,
    rotationSpeed: 0,
    speed: 0
  }
}

export default function ship(state = (() => {
  return Object.assign({}, state, resetShip)
})(), action) {
  var rotation;
  switch (action.type) {
    case constants.START:
      return Object.assign({}, state, initShip());
    case constants.ROTATE_RIGHT:
      return Object.assign({}, state, {
        rotationSpeed: constants.SHIP_ROTATION_SPEED
      });
    case constants.ROTATE_LEFT:
      return Object.assign({}, state, {
        rotationSpeed: -constants.SHIP_ROTATION_SPEED
      });
    case constants.FORWARD:
      return Object.assign({}, state, {
        speed: state.speed = constants.SHIP_ACCL
      });
    case constants.STOP:
      return Object.assign({}, state, {
        speed: 0
      });
    case constants.STOP_ROTATION:
      return Object.assign({}, state, {
        rotationSpeed: 0
      });
    case constants.GAME_OVER:
      return Object.assign({}, state, resetShip);
    case constants.UPDATE:
      rotation = (state.rotation + 360 + state.rotationSpeed) % 360;
      return Object.assign({}, state, {
        position: {
          x: (state.position.x + calcXDist(state.direction, state.speed) +
            screen.width) % screen.width,
          y: (state.position.y + calcYDist(state.direction, state.speed) +
            screen.height) % screen.height
        },
        rotation: rotation,
        direction: rotation
      });
    default:
      return state;
  }
}