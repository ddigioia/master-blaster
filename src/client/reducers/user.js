import * as constants from '../constants'
import {
  updateObj
} from '../helpers'

const initUser = {
  userName: '',
  userId: '',
  loggedIn: false,
  userHighScore: 0,
  currentScore: 0
}

function user (state = initUser, action) {
  switch (action.type) {
    case constants.LOGGED_IN:
      const {
        user: {
          userName,
          userId,
          userHighScore
        }
      } = action

      return updateObj(state, {
        loggedIn: true,
        userName,
        userId,
        userHighScore
      })
    case constants.LOGGED_OUT:
      return updateObj(state, {
        loggedIn: false,
        userName: '',
        userId: '',
        userHighScore: 0,
        currentScore: 0
      })
    case constants.SET_HIGH_SCORE:
      return updateObj(state, {
        userHighScore: action.userHighScore
      })
    default:
      return state
  }
}

export default user
