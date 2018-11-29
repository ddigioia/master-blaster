import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Board from './Board'

class App extends Component {
  constructor (props) {
    super()
    this.state = {}
  }

  async createUser () {
    const user = {
      userName: 'name1',
      userPassword: 'password1'
    }

    const reqObj = {
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json'
      }
    }

    const url = '/users'
    const req = await fetch(url, reqObj)
    const res = await req.json() // might need to include error handling

    if (req.status !== 200) throw Error(res.message)

    return res
  }

  async getUsers () {
    const req = await fetch('/users')
    const res = await req.json()

    if (req.status !== 200) throw Error(res.message)

    console.log('Fetched users: ', res)
    return res
  }

  // async getUser () {
  //   const req = await fetch(`/users`)
  //   const res = await req.json()
  // }

  componentDidMount () {
    // grab any data needed for start of app
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
