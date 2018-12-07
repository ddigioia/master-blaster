import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '../components/Input'
import InputError from '../components/InputError'
import Button from '../components/Button'
import '../styles/Form.css'
import { setCookie } from '../helpers'
import {
  loginSelected,
  signUpSelected,
  nameInvalid,
  passwordInvalid,
  nameTaken,
  invalidCredentials,
  handleInput,
  validated,
  loggedIn,
  hideErrors,
  loggedOut,
  eraseForm,
  pause
} from '../actions'

class Form extends Component {
  constructor (props) {
    super(props)
  
    this.handleInput = this.handleInput.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (event) {
    event.preventDefault()

    const validInputs = this.validateInputs()

    if (validInputs) {
      this.sendData(validInputs)
        .then(res => {
          // invalid
          if (res.errors) {
            this.props.nameTaken()
            return
          }
          const { token, user } = res

          // valid
          if (user) {
            setCookie('login_jwt', token, 1)
            setCookie('userName', user.userName, 1)
            setCookie('userId', user.userId, 1)
            this.props.loggedIn(user) // changes user state
            this.props.pause() // reverts back to main menu
            this.props.eraseForm()
          }
        })
    }
  }

  async sendData (input) {
    const route = this.props.form.loginSelected ? '/users/login' : '/users'
    const reqObj = {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const req = await fetch(route, reqObj)
    const res = await req.json()
    res.token = req.headers.get('token')

    return res
  }

  validateInputs () {
    const nameEl = this.formEl.querySelector('#name')
    const name = nameEl.value
    const passwordEl = this.formEl.querySelector('#password')
    const password = passwordEl.value
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    let valid = {userName: name , userPassword: password}

    // validate name
    if (name.length === 0) {
      this.props.nameInvalid()
      valid = false
    }
    
    // validate password
    if (passwordRegex.test(password) === false) {
      this.props.passwordInvalid()
      valid = false
    }

    return valid
  }

  handleInput (event) {
    const name = event.target.name
    const value = event.target.value

    this.props.handleInput(name, value)
  }

  render () {
    let { form } = this.props

    return (
      <form
        ref={form => this.formEl = form}
        className={this.props.className}
        onSubmit={this.handleFormSubmit}
        style={this.props.style}
      >
        <Button
          handleClick={this.props.loginSelected}
          className={form.loginSelected ? "btn login-opt-btn opt-btn-active" : "btn login-opt-btn"}
          title="Login"
          type="button"
        />
        <Button
          handleClick={this.props.signUpSelected}
          className={form.signUpSelected ? "btn signup-opt-btn opt-btn-active"  : "btn signup-opt-btn"}
          title="Sign Up"
          type="button"
        />
        <InputError
          className="input-error invalid-credentials"
          style={{visibility: (form.loginSelected && form.invalidCredentials) ? "visible" : "hidden"}}
          text="Name and password do not match."
        />
        <Input
          type="text"
          title="Name"
          name="name"
          placeholder="Name"
          value={form.name}
          handleChange={this.handleInput}
          onFocus={this.props.hideErrors}
          // required={true}
        />
        <InputError
          className="input-error invalid-name"
          style={{visibility: (form.nameInvalid || form.nameTaken) ? "visible" : "hidden"}}
          text={form.nameInvalid ? "Please include valid name." : "User name already in use."}
        />
        <Input
          type="password"
          title="Password"
          name="password"
          placeholder="Password"
          value={form.password}
          handleChange={this.handleInput}
          onFocus={this.props.hideErrors}
          // required={true}
        />
        <InputError
          className="input-error invalid-password"
          style={{visibility: form.passwordInvalid ? "visible" : "hidden"}}
          text="Please include valid password."
        />
        <Button
          handleClick={this.handleFormSubmit}
          className="btn submit-btn"
          title="Submit"
          type="submit"
        />
        <Button
          handleClick={this.props.pause}
          className="btn back-btn"
          title="Back"
          type="button"
        />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    form: state.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideErrors: () => dispatch(hideErrors()),
    loginSelected: () => dispatch(loginSelected()),
    signUpSelected: () => dispatch(signUpSelected()),
    nameInvalid: () => dispatch(nameInvalid()),
    passwordInvalid: () => dispatch(passwordInvalid()),
    nameTaken: () => dispatch(nameTaken()),
    invalidCredentials: () => dispatch(invalidCredentials()),
    validated: () => dispatch(validated()),
    handleInput: (name, value) => dispatch(handleInput(name, value)),
    loggedIn: (user) => dispatch(loggedIn(user)),
    loggedOut: () => dispatch(loggedOut()),
    eraseForm: () => dispatch(eraseForm()),
    pause: () => dispatch(pause())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)