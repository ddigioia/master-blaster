import * as constants from '../constants'
import { updateObj } from '../helpers'

let initScoreBoard = {
  currentScore: 0,
  topScore: getTopScore()
}

function getTopScore () {
  return Number(window.sessionStorage.getItem('masterBlasterTopScore'))
}

function setTopScore (topScore) {
  return window.sessionStorage.setItem('masterBlasterTopScore', topScore)
}

function scoreBoard (state = initScoreBoard, action) {
  let {currentScore, topScore} = state

  switch (action.type) {
    case constants.START:
      return updateObj(state, initScoreBoard)
    case constants.ASTEROID_HIT:
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

export default scoreBoard
