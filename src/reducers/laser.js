import * as constants from '../constants'
import {
  calcXDist,
  calcYDist,
  updateObj,
  checkIfElementIsInPlay
} from '../helpers'

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

function updateBeamPosition (beam) {
  return updateObj(beam, {
    position: {
      x: beam.position.x + calcXDist(beam.rotation, constants.LASER_BEAM_SPEED),
      y: beam.position.y + calcYDist(beam.rotation, constants.LASER_BEAM_SPEED)
    }
  })
}

export default function laser (state, action) {
  if (typeof state === 'undefined') {
    state = updateObj(state, initLaser())
  }

  let beams

  switch (action.type) {
    case constants.FIRE:
      let newBeam = initLaserBeam(action.laserOrigin)
      beams = [...state.beams] // copy beams from state
      beams.push(newBeam)

      return updateObj(state, {beams})
    case constants.UPDATE:
      beams = (
        state.beams
          .map(updateBeamPosition)
          .filter(checkIfElementIsInPlay) // delete beams that are out of play
      )

      return updateObj(state, {beams})
    case constants.ASTEROID_HIT:
      let { laserBeam } = action
      beams = [...state.beams]

      beams.splice(laserBeam.index, 1)

      return updateObj(state, {beams})
    default:
      return state
  }
}
