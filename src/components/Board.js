import React, { Component } from 'react'
import '../styles/Board.css'
import Ship from './Ship'
import Asteroid from './Asteroid'
import Laser from './Laser'

class Board extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className="Board">
        Hello. I am a board.
      </div>
    )
  }
}

export default Board