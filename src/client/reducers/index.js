import {combineReducers} from 'redux'
import ship from './ship'
import laser from './laser'
import asteroid from './asteroid'
import debris from './debris'
import scoreBoard from './scoreBoard'
import board from './board'
import powerUp from './powerUp'
import user from './user'
import form from './form'

export default combineReducers({
  ship,
  laser,
  asteroid,
  debris,
  scoreBoard,
  board,
  powerUp,
  user,
  form
})
