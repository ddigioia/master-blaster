import {combineReducers} from 'redux'
import ship from './ship'
import laser from './laser'
import asteroid from './asteroid'
import debris from './debris'
import scoreBoard from './scoreBoard'

export default combineReducers({
  ship,
  laser,
  asteroid,
  debris,
  scoreBoard
})
