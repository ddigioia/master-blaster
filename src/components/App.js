import React, { Component } from 'react'
import '../styles/App.css'
import Board from './Board'

class App extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className="App">
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

export default App
