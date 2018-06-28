import React, { Component } from 'react'
import '../styles/Board.css'
import Ship from './Ship'
import Asteroid from './Asteroid'
import Laser from './Laser'

class Board extends Component {
  constructor(props) {
    super()
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        // ratio: window.devicePixelRatio || 1,
        ratio: 1,
      },
      context: null,
      keys : {
        left: 0,
        right: 0,
        up: 0,
        down: 0,
        space: 0,
      },
      asteroidCount: 3,
      currentScore: 0,
      topScore: localStorage['topscore'] || 0,
      inGame: false
    }
    this.ship = []
    this.asteroids = []
    this.lasers = []
    this.particles = []
  }

  componentDidMount() {
    console.log('board component mounted')
    const context = this.refs.canvas.getContext('2d')
    context.fillStyle = 'white'
    context.fillRect(100, 100, 100, 100)
  }



  render() {
    return (
      <div className="Board">
        <span className="score current-score">Score: {this.currentScore}</span>
        <span className="score top-score">Top Score: {this.topScore}</span>
        <span className="controls" >
          Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br/>
          Use [SPACE] to SHOOT
        </span>
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    )
  }
}

export default Board