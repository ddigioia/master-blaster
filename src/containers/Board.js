import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect } from 'react-konva'
import uuid from 'uuid/v4'
import '../styles/Board.css'
import Ship from '../components/Ship'
// import Asteroid from '../components/Asteroid'
import Laser from '../components/Laser'
// import Particle from '../components/Particle'
import { screen } from '../helpers'
import * as constants from '../constants'
import {
  start,
  rotateLeft,
  rotateRight,
  stopRotation,
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
    this.handleStart = this.handleStart.bind(this)
    this.board = React.createRef()
    this.startBtn = React.createRef()
    this.controls = React.createRef()
  }

  handleKeyDown({keyCode}) {
    switch(keyCode) {
      case constants.LEFT:
        this.props.rotateLeft()
        break
      case constants.RIGHT:
        this.props.rotateRight()
        break
      case constants.UP:
        this.props.forward()
        break
      case constants.SPACE:
        let {rotation, position: {x, y}, radius} = this.props.ship
        let laserOrigin = {rotation, position: {x, y}, radius}
        this.props.fire(laserOrigin)
        break
      default:
        break
    }
  }

  handleKeyUp({keyCode}) {
    switch(keyCode) {
      case constants.LEFT:
      case constants.RIGHT:
        this.props.stopRotation()
        break
      case constants.UP:
        this.props.stop()
    }
  }

  updateGame() {
    // this.props.asteroidHitTest()
    // this.props.shipHitTest()
    this.props.update()
    window.requestAnimationFrame(this.updateGame.bind(this))
  }

  handleStart() {
    const startBtn = this.startBtn.current
    const board = this.board.current
    const controls = this.controls.current
    startBtn.style.display = 'none'
    controls.style.display = 'none'
    board.focus()
    this.props.start()
    this.updateGame()
  }

  componentDidMount() {
    // this.updateGame()
  }

  getCurrentScore() {
    return 0
  }

  getTopScore() {
    return window.localStorage.getItem('masterBlasterTopScore') || 0
  }

  mapLaserBeams(laser) {
    return laser.beams.map(beam => {
      return (
        <Laser
          rotation={beam.rotation}
          position={beam.position}
          radius={beam.radius}
          key={uuid()}
        />
      )
    })
  }

  render() {

    let {
      ship,
      // asteroid,
      laser,
      // particle
    } = this.props

    return (
      <div className="Board"
        ref={this.board}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        tabIndex="0"
      >
        <div className="board-header">
          <div className="score-con">
            <span className="score current-score">Score: {this.getCurrentScore()}</span>
            <span className="score top-score">Top Score: {this.getTopScore()}</span>
          </div>
          <span className="controls" ref={this.controls}>
            Use [ ← ][ ↑ ][ ↓ ][ → ] to MOVE<br/>
            Use [ SPACE ] to SHOOT
          </span>
        </div>
        <button
          ref={this.startBtn}
          className="btn start-btn"
          onClick={this.handleStart}
        >
          Start
        </button>
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
            { this.mapLaserBeams(laser) }
          </Layer>
        </Stage>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ship: state.ship,
    // asteroid: state.asteroid,
    laser: state.laser,
    // particle: state.particle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    start: () => dispatch(start()),
    rotateLeft: () => dispatch(rotateLeft()),
    rotateRight: () => dispatch(rotateRight()),
    stopRotation: () => dispatch(stopRotation()),
    forward: () => dispatch(forward()),
    fire: laserOrigin => dispatch(fire(laserOrigin)),
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
