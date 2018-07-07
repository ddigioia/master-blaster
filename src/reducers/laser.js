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

function initLaser () {
  return {
    beams: []
  }
}

function initLaserBeam (laserOrigin) {
  const {rotation, position: {x, y}, radius} = laserOrigin
  return {
    rotation,
    position: {x, y},
    // radius: constants.LASER_BEAM_RADIUS,
    radius,
    speed: constants.LASER_BEAM_SPEED
  }
}

export default function laser(state, action) {
  if (typeof state === 'undefined') {
    state = updateObj(state, initLaser())
  }

  let beams

  switch(action.type){
    case constants.FIRE:
      let newBeam = initLaserBeam(action.laserOrigin)
      beams = [...state.beams] // copy beams from state
      beams.push(newBeam)

      return updateObj(state, {beams})
    default:
      return state
  }
}