import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Board from './Board'
import { getCookie } from '../helpers'
import { loggedIn, setHighScores } from '../actions'

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      loggedIn: false
    }
  }

  async getHighScores () {
    const req = await fetch('/scores')
    const res = await req.json()

    if (req.status !== 200) throw Error(res.message)

    return res
  }

  async getUser () {
    const token = getCookie('login_jwt')
    const name = getCookie('userName')
    const id = getCookie('userId')
    
    if (token && name && id) {
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
      const user = res && res.user

      if (user) {
        // user is logged in
        this.props.loggedIn(user)
      }
    })

    this.getHighScores().then(res => {
      if (!res) return

      this.props.setHighScores(res)
    })
  }

  render () {
    return (
      <div className='App'>
        <Board />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    board: state.board,
    scoreBoard: state.scoreBoard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: (user) => dispatch(loggedIn(user)),
    setHighScores: (highScores) => dispatch(setHighScores(highScores))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
