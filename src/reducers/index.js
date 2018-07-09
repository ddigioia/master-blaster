import {combineReducers} from 'redux'
import ship from './ship'
import laser from './laser'
import asteroid from './asteroid'

export default combineReducers({
  ship,
  laser,
  asteroid
})
