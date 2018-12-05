import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Board from './Board'
import { getCookie } from '../helpers'

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      loggedIn: false
    }
  }

  async getUsers () {
    const req = await fetch('/users')
    const res = await req.json()

    if (req.status !== 200) throw Error(res.message)

    console.log('Fetched users: ', res)
    return res
  }

  async getUser () {
    const token = getCookie('login_jwt')
    const name = getCookie('userName')
    
    if (token && name) {
      // if token is still valid, get user info
      const options = {
        method: 'GET',
        headers: new Headers({ token })
      }

      const req = await fetch(`/users/${name}`, options)
      const res = await req.json()

      if (req.status !== 200) throw Error(res.message)

      return res
    }
  }

  componentDidMount () {
    // grab any data needed for start of app
    this.getUser().then(res => {
      if (res && res.user) {
        // user is logged in
        this.setState(prevState => {
          return {
            ...prevState,
            loggedIn: true
          }
        })
      }
    })
    this.getUsers()
  }

  render () {
    return (
      <div className='App'>
        <Board loggedIn={this.state.loggedIn}/>
      </div>
    )
  }
}

export default connect((state) => ({
  app: state.app
}))(App)
