import React, { Component } from 'react'
import Input from '../components/Input'
import InputError from '../components/InputError'
import Button from '../components/Button'
import '../styles/Form.css'

class Form extends Component {
  constructor (props) {
    super(props)
  
    this.state = {
      name: '',
      password: '',
      logginIn: true,
      signingUp: false,
      nameInvalid: false,
      passwordInvalid: false,
      nameTaken: false,
      invalidExistingCredentials: false,
      validated: false
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.signUpSelected = this.signUpSelected.bind(this)
    this.loginSelected = this.loginSelected.bind(this)
    this.hideErrors = this.hideErrors.bind(this)
  }

  handleFormSubmit (event) {
    event.preventDefault()

    const validInputs = this.validateInputs()

    if (validInputs) {
      this.sendData(validInputs)
    }


    /*
        - validate inputs
        - check if user name is taken
        - submit to createUser route OR check DB for password / username match
        - set a cookie to keep user logged in
    */


  }

  async sendData (user) {
    const route = this.state.logginIn ? '/users/login' : '/users'
    const reqObj = {
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    const req = await fetch(route, reqObj)
    const res = await req.json()

    return res
  }

  checkValidExistingCredentials () {

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
      this.setState(prevState => {
        return {
          ...prevState,
          nameInvalid: true
        }
      })
      valid = false
    }
    
    // validate password
    if (passwordRegex.test(password) === false) {
      this.setState(prevState => {
        return {
          ...prevState,
          passwordInvalid: true
        }
      })
      valid = false
    }

    return valid
  }

  hideErrors () {
    // hide error messages on input focus
    this.setState(prevState => {
      return {
        ...prevState,
        nameInvalid: false,
        passwordInvalid: false,
        nameTaken: false,
        invalidExistingCredentials: false
      }
    })
  }

  loginSelected () {
    this.hideErrors()
    this.setState(prevState => {
      return {
        ...prevState,
        logginIn: true,
        signingUp: false
      }
    })
  }

  signUpSelected () {
    this.hideErrors()
    this.setState(prevState => {
      return {
        ...prevState,
        logginIn: false,
        signingUp: true
      }
    })
  }

  handleInput (event) {
    const name = event.target.name
    const value = event.target.value

    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  render () {
    return (
      <form
        ref={form => this.formEl = form}
        className={this.props.className}
        onSubmit={this.handleFormSubmit}
        style={this.props.style}
        // onClick={this.hideErrors}
      >
        <Button
          handleClick={this.loginSelected}
          className={this.state.logginIn ? "btn login-opt-btn opt-btn-active" : "btn login-opt-btn"}
          title="Login"
          type="button"
        />
        <Button
          handleClick={this.signUpSelected}
          className={this.state.signingUp ? "btn signup-opt-btn opt-btn-active"  : "btn signup-opt-btn"}
          title="Sign Up"
          type="button"
        />
        <InputError
          className="input-error invalid-credentials"
          style={{visibility: (this.state.logginIn && this.state.invalidExistingCredentials) ? "visible" : "hidden"}}
          text="Name and password do not match."
        />
        <Input
          type="text"
          title="Name"
          name="name"
          placeholder="Name"
          value={this.state.name}
          handleChange={this.handleInput}
          onFocus={this.hideErrors}
          // required={true}
        />
        <InputError
          className="input-error invalid-name"
          style={{visibility: (this.state.nameInvalid || this.state.nameTaken) ? "visible" : "hidden"}}
          text={this.state.nameInvalid ? "Please include valid name." : "Username already taken."}
        />
        <Input
          type="password"
          title="Password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          handleChange={this.handleInput}
          onFocus={this.hideErrors}
          // required={true}
        />
        <InputError
          className="input-error invalid-password"
          style={{visibility: this.state.passwordInvalid ? "visible" : "hidden"}}
          text="Please include valid password."
        />
        <Button
          handleClick={this.handleFormSubmit}
          className="btn submit-btn"
          title="Submit"
          type="submit"
        />
        <Button
          handleClick={this.props.handleBack}
          className="btn back-btn"
          title="Back"
          type="button"
        />
      </form>
    )
  }
}

export default Form