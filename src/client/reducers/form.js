import * as constants from '../constants'
import {
  updateObj
} from '../helpers'

const initForm = {
  name: '',
  password: '',
  loginSelected: true,
  signUpSelected: false,
  nameInvalid: false,
  passwordInvalid: false,
  nameTaken: false,
  invalidCredentials: false,
  validated: false
}

function form (state = initForm, action) {
  switch (action.type) {
    case constants.LOGIN_SELECTED:
      return updateObj(state, {
        loginSelected: true,
        signUpSelected: false,
        nameInvalid: false,
        passwordInvalid: false,
        nameTaken: false,
        invalidCredentials: false
      })
    case constants.SIGNUP_SELECTED:
      return updateObj(state, {
        signUpSelected: true,
        loginSelected: false,
        nameInvalid: false,
        passwordInvalid: false,
        nameTaken: false,
        invalidCredentials: false
      })
    case constants.HANDLE_INPUT:
      return updateObj(state, {
        [action.name]: action.value
      })
    case constants.ERASE_FORM:
      return updateObj(state, {
        name: '',
        password: ''
      })
    case constants.NAME_INVALID:
      return updateObj(state, {
        nameInvalid: true
      })
    case constants.PASSWORD_INVALID:
      return updateObj(state, {
        passwordInvalid: true
      })
    case constants.NAME_TAKEN:
      return updateObj(state, {
        nameTaken: true
      })
    case constants.INVALID_CREDENTIALS:
      return updateObj(state, {
        invalidCredentials: true
      })
    case constants.HIDE_ERRORS:
      return updateObj(state, {
        nameInvalid: false,
        passwordInvalid: false,
        nameTaken: false,
        invalidCredentials: false
      })
    case constants.VALIDATED:
      return updateObj(state, {
        validated: true
      })
    default:
      return state
  }
}

export default form
