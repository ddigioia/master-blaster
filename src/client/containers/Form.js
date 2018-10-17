import React, { Component } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

class Form extends Component {
  constructor (props) {
    super(props)
  
    this.state = {
      name: '',
      password: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleFormSubmit (event) {
    event.preventDefault()

    
    /*
        - validate inputs
        - check if user name is taken
        - submit to createUser route
        - set a cookie to keep user logged in
    */


  }

  checkExistingUser () {
    
  }

  validateInputs () {

  }

  handleInput (event) {
    console.log('handle input')

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
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        <Input
          type={"text"}
          title={"Name"}
          name={"name"}
          value={this.state.name}
          handleChange={this.handleInput}
        />
        <Input
          type={"text"}
          title={"Password"}
          name={"password"}
          value={this.state.password}
          handleChange={this.handleInput}
        />
        <Button
            handleClick={this.handleFormSubmit}
            title={"Submit"}
        >
        </Button>
      </form>
    )
  }
}

export default Form