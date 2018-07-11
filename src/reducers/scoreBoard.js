import * as constants from '../constants'
import {
  screen,
  updateObj
} from '../helpers'

function initScoreBoard () {
  return {
    currentScore: 0,
    topScore: getTopScore()
  }
}

function getTopScore() {
  return window.localStorage.getItem('masterBlasterTopScore') || 0
}

export default function scoreBoard (state, action) {

  if (typeof state === 'undefined') {
    state = updateObj(state, initScoreBoard())
  }

  switch(action.type) {
    case constants.ASTEROID_HIT:
      let currentScore = state.currentScore
      currentScore++

      return updateObj(state, {currentScore})
    case constants.GAME_OVER:
      return updateObj(state, {})
    default:
      return state
  }
}