import {combineReducers} from 'redux'
import ship from './ship'
import laser from './laser'
import asteroid from './asteroid'
import debris from './debris'

export default combineReducers({
  ship,
  laser,
  asteroid,
  debris
})
