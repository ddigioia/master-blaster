import * as constants from '../constants'
import {
  calcXDist,
  calcYDist,
  updateObj,
  checkIfElementIsInPlay
} from '../helpers'

let initLaser = {
  beams: []
}

function initLaserBeam (laserOrigin) {
  const {rotation, position: {x, y}, radius} = laserOrigin
  return {
    rotation,
    position: {x, y},
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

function laser (state = initLaser, action) {
  let beams

  switch (action.type) {
    case constants.FIRE:
      let newBeam = initLaserBeam(action.laserOrigin)
      beams = [...state.beams]
      beams.push(newBeam)

      return updateObj(state, {beams})
    case constants.UPDATE:
      beams = (
        state.beams
          .map(updateBeamPosition)
          .filter(checkIfElementIsInPlay)
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

export default laser
