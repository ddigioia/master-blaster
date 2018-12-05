import * as constants from '../constants'
import {
  updateObj
} from '../helpers'

const initUser = {
  userName: '',
  loggedIn: false,
  highScore: 0
}

function user (state = initUser, action) {
  switch (action.type) {
    case constants.LOGGED_IN:
      const { userName } = action

      return updateObj(state, {
        loggedIn: true,
        userName
      })
    case constants.LOGGED_OUT:
      return updateObj(state, {
        loggedIn: false,
        userName: '',
        highScore: 0
      })
    case constants.NEW_HIGH_SCORE:
      const { highScore } = action

      return updateObj(state, {
        highScore
      })
    default:
      return state
  }
}

export default user
