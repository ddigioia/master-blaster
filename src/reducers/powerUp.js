import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist,
  updateObj,
  randomNumInRange,
  checkIfElementIsInPlay
} from '../helpers'

let initPowerUp = {
  powerUps: []
}

function createPowerUp () {
  const xStart = Math.round(Math.random()) > 0
  const startTop = Math.round(Math.random()) > 0
  const startLeft = Math.round(Math.random()) > 0
  const randXPosition = Math.random() * screen.width()
  const randYPosition = Math.random() * screen.height()
  const scale = constants.POWER_UP_SCALE
  const radius = screen.width() / scale
  const speed = constants.POWER_UP_SPEED

  return {
    position: {
      x: xStart ? (startLeft || screen.width()) : randXPosition,
      y: xStart ? randYPosition : (startTop || screen.height())
    },
    rotation: Math.round(Math.random() * 360),
    speed,
    radius
  }
}

function updatePowerUpPosition (powerUp) {
  return updateObj(powerUp, {
    position: {
      x: powerUp.position.x + calcXDist(powerUp.rotation, constants.POWER_UP_SPEED),
      y: powerUp.position.y + calcYDist(powerUp.rotation, constants.POWER_UP_SPEED)
    }
  })
}

function powerUp (state = initPowerUp, action) {
  let powerUps

  switch(action.type) {
    case constants.START:
      return updateObj(state, initPowerUp)
    case constants.CREATE_POWER_UP:
      powerUps = [...state.powerUps]
      powerUps.push(createPowerUp())

      return updateObj(state, {powerUps})
    case constants.UPDATE:
      powerUps = (
        state.powerUps
          .map(updatePowerUpPosition)
          .filter(checkIfElementIsInPlay)
      )

      return updateObj(state, {powerUps})
    case constants.POWER_UP_HIT:
      let { powerUp } = action
      powerUps = [...state.powerUps]

      powerUps.splice(powerUp.index, 1)

      return updateObj(state, {powerUps})
    default:
      return state
  }
}

export default powerUp