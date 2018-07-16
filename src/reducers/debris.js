import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist,
  updateObj,
  checkIfElementIsInPlay
} from '../helpers'

function initDebris () {
  return {
    fragments: []
  }
}

function createFragment (scale, speed, rotationSpeed, verticesCount, position) {
  const radius = screen.width() / scale
  const vertices = debrisVertices(radius, verticesCount)

  return {
    // direction: undefined,
    rotation: Math.round(Math.random() * 360),
    position,
    radius,
    rotationSpeed,
    speed,
    vertices
  }
}

function createFragments (type, object) {
  const fragments = []
  const {position} = object
  let fragment

  for (let i = 0; i < constants[`${type}_DEBRIS_COUNT`]; i++) {
    fragment = createFragment(
      constants[`${type}_DEBRIS_SCALE`],
      constants[`${type}_DEBRIS_SPEED`],
      constants[`${type}_DEBRIS_ROTATION_SPEED`],
      constants[`${type}_DEBRIS_VERTICES_COUNT`],
      position
    )
    fragments.push(fragment)
  }

  return fragments
}

function debrisVertices (radius, count) {
  let vertices = []
  let xVertice
  let yVertice

  for (let i = 0; i < count; i++) {
    xVertice = (-Math.sin((360 / count) * i * Math.PI / 180) + Math.round(Math.random() * 2 - 1) * Math.random() / 3) * radius
    yVertice = (-Math.cos((360 / count) * i * Math.PI / 180) + Math.round(Math.random() * 2 - 1) * Math.random() / 3) * radius
    vertices.push(xVertice, yVertice)
  }

  return vertices
}

function updateFragmentPosition (fragment) {
  return updateObj(fragment, {
    position: {
      x: fragment.position.x + calcXDist(fragment.rotation, fragment.speed),
      y: fragment.position.y + calcYDist(fragment.rotation, fragment.speed)
    }
  })
}

export default function debris (state, action) {
  if (typeof state === 'undefined') {
    state = updateObj(state, initDebris())
  }

  let fragments
  let newFragments

  switch (action.type) {
    case constants.ASTEROID_HIT:
      let {asteroid} = action
      newFragments = createFragments('ASTEROID', asteroid)

      fragments = [...state.fragments, ...newFragments]
      return updateObj(state, {fragments})
    case constants.GAME_OVER:
      let {ship} = action
      newFragments = createFragments('SHIP', ship)

      fragments = [...state.fragments, ...newFragments]
      return updateObj(state, {fragments})
    case constants.UPDATE:
      fragments = (
        state.fragments
          .map(updateFragmentPosition)
          .filter(checkIfElementIsInPlay)
      )
      // determine which fragments you should remove from the board
      // maybe include a timestamp on each fragment - delete after 2-3 secs
      return updateObj(state, {fragments})
    default:
      return state
  }
}
