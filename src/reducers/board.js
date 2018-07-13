import * as constants from '../constants'
import { updateObj } from '../helpers'

function initBoard() {
  return {
    gameState: 'paused'
  }
}

export default function board(state, action) {
  if (typeof state === 'undefined') {
    state = updateObj(state, initBoard())
  }

  switch(action.type) {
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