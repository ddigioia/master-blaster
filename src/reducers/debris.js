import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist,
  updateObj,
  randomNumInRange,
  checkIfElementIsInPlay
} from '../helpers'

function initDebris () {
  return {
    fragments: []
  }
}

function createFragment (scale, speed, rotationSpeed, position) {
  return {
    // direction: undefined,
    rotation: 0,
    position,
    radius: screen.width() / scale,
    rotationSpeed,
    speed
  }
}

function createFragments (type, object) {
  const fragments = []
  const {radius, speed, position} = object
  let fragment

  for (let i = 0; i < constants[`${type}_DEBRIS_COUNT`]; i++) {
    fragment = createFragment(
      constants[`${type}_DEBRIS_SCALE`],
      constants[`${type}_DEBRIS_SPEED`],
      constants[`${type}_DEBRIS_ROTATION_SPEED`],
      position
    )
    fragments.push(fragment)
  }

  return fragments
}

export default function debris(state, action) {
  if (typeof state === undefined) {
    state = updateObj(state, initDebris())
  }

  let fragments

  switch(action.type) {
    case constants.ASTEROID_HIT:
      let {asteroid} = action
      let newFragments = createFragments('ASTEROID', asteroid)

      fragments = [...state.fragments, ...newFragments]
      return updateObj(state, {fragments})
    case constants.GAME_OVER:
      let {ship} = action
      let newFragments = createFragments('SHIP', ship)

      fragments = [...state.fragments, ...newFragments]
      return updateObj(state, {fragments})
    case constants.UPDATE:
      // determine which fragments you should remove from the board
      // maybe include a timestamp on each fragment - delete after 2-3 secs
    default:
      return state
  }
}