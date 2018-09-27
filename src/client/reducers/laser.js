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

function initLaserBeams (laser) {
  // quantity is proxy for powered up state
  const {rotation, position: {x, y}, radius, quantity} = laser
  let beams = []
  let color = quantity === 2 ? constants.LASER_POWER_UP_COLOR : constants.LASER_INITIAL_COLOR

  for (let i = 0; i < quantity; i++) {
    beams.push(
      {
        rotation, // this may need to change for 2 beams
        position: {
          x,
          y: quantity === 2 ? (i ? y - radius : y + radius) : y
        },
        radius,
        speed: constants.LASER_BEAM_SPEED,
        color
      }
    )
  }

  return beams
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
      let newBeams = initLaserBeams(action.laser)
      beams = [...state.beams, ...newBeams]

      return updateObj(state, {beams})
    case constants.UPDATE:
      beams = (
        state.beams
          .map(updateBeamPosition)
          .filter(checkIfElementIsInPlay)
      )

      return updateObj(state, {beams})
    case constants.ASTEROID_HIT:
    case constants.POWER_UP_HIT:
      let { laserBeam } = action
      beams = [...state.beams]

      beams.splice(laserBeam.index, 1)

      return updateObj(state, {beams})
    default:
      return state
  }
}

export default laser
