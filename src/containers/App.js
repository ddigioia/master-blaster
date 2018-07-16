import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Board from './Board'

class App extends Component {
  constructor (props) {
    super()
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
