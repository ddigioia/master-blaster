import * as constants from '../constants'
import { updateObj } from '../helpers'

let initScoreBoard = {
  currentScore: 0,
  highScore: 0,
  highScores: []
}

function getHighScore () {
  return Number(window.sessionStorage.getItem('masterBlasterHighScore'))
}

function setHighScore (highScore) {
  return window.sessionStorage.setItem('masterBlasterHighScore', highScore)
}

function scoreBoard (state = initScoreBoard, action) {
  let {currentScore, highScore} = state
  
  switch (action.type) {
    case constants.START:
      const startObj = updateObj(initScoreBoard, {highScores: state.highScores})

      return updateObj(state, startObj)
    case constants.SET_HIGH_SCORES:
      const { highScores } = action

      return updateObj(state, {highScores})
    case constants.ASTEROID_HIT:
      currentScore++
      if (currentScore > highScore) highScore++

      return updateObj(state, {currentScore, highScore})
    case constants.GAME_OVER:
      if (state.highScore > getHighScore()) {
        setHighScore(state.highScore)
      }

      return updateObj(state, {currentScore, highScore})
    default:
      return state
  }
}

export default scoreBoard
