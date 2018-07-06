import {combineReducers} from 'redux'
import ship from './ship'
import laser from './laser'

export default combineReducers({
  ship,
  laser
})
