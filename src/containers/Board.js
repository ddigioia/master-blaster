import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect } from 'react-konva'
import '../styles/Board.css'
import Ship from '../components/Ship'
// import Asteroid from '../components/Asteroid'
// import Laser from '../components/Laser'
// import Particle from '../components/Particle'
import { screen } from '../helpers'
import * as constants from '../constants'
import {
  rotateLeft,
  rotateRight,
  forward,
  fire,
  stop,
  update,
  asteroidHitTest,
  shipHitTest
} from '../actions'

class Board extends Component {
  constructor(props) {
    super()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyDown(event) {
    let laserOrigin
    let rotation
    let x
    let y

    switch(event.keyCode) {
      case constants.LEFT:
      debugger
        this.props.rotateLeft()
        break
      case constants.RIGHT:
        this.props.rotateRight()
        break
      case constants.UP:
        this.props.forward()
        break
      case constants.SPACE:
        ({rotation, position: {x, y}} = this.props.ship)
        laserOrigin = {rotation, position: {x, y}}
        this.props.fire(laserOrigin)
        break
      default:
        break
    }
    this.updateGame()
  }

  updateGame() {
    // this.props.dispatch(asteroidHitTest())
    // this.props.dispatch(shipHitTest())
    this.props.update()
    // requestAnimationFrame(this.updateGame.bind(this))
  }

  handleKeyUp() {
    this.updateGame()
  }

  componentDidMount() {
    console.log('board component mounted')
    this.updateGame()
  }

  render() {

    let {
      ship,
      // asteroid,
      // laser,
      // particle
    } = this.props

    return (
      <div className="Board"
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        tabIndex="0"
      >
        <span className="score current-score">Score: {this.currentScore}</span>
        <span className="score top-score">Top Score: {this.topScore}</span>
        <span className="controls" >
          Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br/>
          Use [SPACE] to SHOOT
        </span>
        <Stage
          width={screen.width()}
          height={screen.height()}
        >
          <Layer>
            <Rect
              width={screen.width()}
              height={screen.height()}
            />
            <Ship
              position={ship.position}
              rotation={ship.rotation}
              radius={ship.radius}
            />
          </Layer>
        </Stage>
        {/* <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        /> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state: ', state)
  return {
    ship: state.ship,
    // asteroid: state.asteroid,
    // laser: state.laser,
    // particle: state.particle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rotateLeft: () => dispatch(rotateLeft()),
    rotateRight: () => dispatch(rotateRight()),
    forward: () => dispatch(forward()),
    fire: () => dispatch(fire()),
    stop: () => dispatch(stop()),
    update: () => dispatch(update()),
    asteroidHitTest: () => dispatch(asteroidHitTest()),
    shipHitTest: () => dispatch(shipHitTest())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
