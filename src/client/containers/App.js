import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Board from './Board'
import { getCookie } from '../helpers'

class App extends Component {
  constructor (props) {
    super()
    this.state = {}
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
    const options = {
      method: 'GET',
      headers: new Headers({ token })
    }

    if (token && name) {
      // if token is still valid, get user info
      // const req = await fetch(`/users?${name}&${token}`)
      const req = await fetch(`/users/${name}`, options)
      const res = await req.json()

      if (req.status !== 200) throw Error(res.message)
      console.log('res: ', res)
      return res
    }
  }

  componentDidMount () {
    // grab any data needed for start of app
    this.getUser()
    this.getUsers()
    console.log('app mounted')
  }

  render () {
    return (
      <div className='App'>
        <Board />
      </div>
    )
  }
}

export default connect((state) => ({
  app: state.app
}))(App)
