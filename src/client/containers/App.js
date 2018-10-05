import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Board from './Board'

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      response: ''
    }
  }

  async callApi () {
    const response = await fetch('/api/hello')
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  async createUser () {
    const user = {
      userId: 4,
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

    const url = '/api/user'
    const req = await fetch(url, reqObj)
    console.log('req ', req)
    const res = await req.json()

    if (req.status !== 200) throw Error(res.message)

    return res
  }

  componentDidMount () {
    this.callApi()
      .then(res => {
        this.setState({response: res.express})
      })
      .catch(err => console.log(err))

    this.createUser()
      .then(res => {
        console.log('user res: ', res)
      })
      .catch(err => console.log(err))
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
