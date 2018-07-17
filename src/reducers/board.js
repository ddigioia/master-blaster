import * as constants from '../constants'
import { updateObj } from '../helpers'

let initBoard = {
  gameState: 'paused',
  asteroidIntId: 0
}

function board (state = initBoard, action) {
  switch (action.type) {
    case constants.PAUSE:
      return updateObj(state, { gameState: 'paused' })
    case constants.START:
      return updateObj(state, { gameState: 'started' })
    case constants.GAME_OVER:
      return updateObj(state, { gameState: 'gameOver' })
    default:
      return state
  }
}

export default board