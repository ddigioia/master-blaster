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
  return Number(window.localStorage.getItem('masterBlasterTopScore'))
}

function setTopScore(topScore) {
  return window.localStorage.setItem('masterBlasterTopScore', topScore)
}

export default function scoreBoard (state, action) {

  if (typeof state === 'undefined') {
    state = updateObj(state, initScoreBoard())
  }

  switch(action.type) {
    case constants.ASTEROID_HIT:
      let {currentScore, topScore} = state
      currentScore++
      if (currentScore > topScore) topScore++

      return updateObj(state, {currentScore, topScore})
    case constants.GAME_OVER:
      if (state.topScore > getTopScore()) {
        setTopScore(state.topScore)
      }

      return updateObj(state, {currentScore, topScore})
    default:
      return state
  }
}