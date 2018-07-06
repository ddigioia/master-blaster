import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist,
  updateObj
} from '../helpers'

const resetLaser = {
  rotation: undefined,
  position: {
    x: undefined,
    y: undefined
  },
  radius: undefined,
  speed: undefined
}

function initLaser (laserOrigin) {
  const {rotation, position: {x, y}, radius} = laserOrigin
  return {
    rotation,
    position: {x, y},
    // radius: constants.LASER_BOLT_RADIUS,
    radius,
    speed: constants.LASER_BOLT_SPEED
  }
}

export default function laser(state, action) {

  if (typeof state === 'undefined') {
    state = updateObj(state, resetLaser)
  }

  switch(action.type){
    case constants.FIRE:
      return updateObj(state, initLaser(action.laserOrigin))
    default:
      return state
  }
}