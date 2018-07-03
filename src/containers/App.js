import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Board from './Board'
import { start } from '../actions'

class App extends Component {

  constructor(props) {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.dispatch(start())

  }

  render() {
    return (
      <div className="App" onClick={this.handleClick}>
        <header className="App-header">
          <h1 className="App-title">Welcome to Master Blaster!!!</h1>
        </header>
        <p className="App-intro">
          To get started, press any key.
        </p>
        <Board />
      </div>
    )
  }
}

export default connect((state) => ({
  app: state.app
}))(App)
