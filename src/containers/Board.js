import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect } from 'react-konva'
import uuid from 'uuid/v4'
import '../styles/Board.css'
import Ship from '../components/Ship'
import Asteroid from '../components/Asteroid'
import Laser from '../components/Laser'
import Debris from '../components/Debris'
import ScoreBoard from '../components/ScoreBoard'
import { screen, randomNumInRange } from '../helpers'
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
  shipHitTest,
  createAsteroids
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
    this.props.asteroidHitTest()
    this.props.shipHitTest()
    this.props.update()
    window.requestAnimationFrame(this.updateGame.bind(this))
  }

  asteroidCreator() {
    let count
    window.setInterval(() => {
      count = randomNumInRange(2, 8)
      this.props.createAsteroids(count)
    }, 2000)
  }

  handleStart() {
    // TODO: Include difficulty options (asteroid speed and count will be multiplied by it) 
    const startBtn = this.startBtn.current
    const board = this.board.current
    const controls = this.controls.current
    startBtn.style.display = 'none'
    controls.style.display = 'none'
    board.focus()
    this.props.start()
    this.updateGame()
    this.asteroidCreator()
  }

  componentDidMount() {

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

  mapAsteroids(asteroid) {
    return asteroid.asteroids.map(asteroid => {
      return (
        <Asteroid
          rotation={asteroid.rotation}
          position={asteroid.position}
          radius={asteroid.radius}
          vertices={asteroid.vertices}
          key={uuid()}
        />
      )
    })
  }

  mapDebris(debris) {
    return debris.fragments.map(fragment => {
      return (
        <Debris
          rotation={fragment.rotation}
          position={fragment.position}
          radius={fragment.radius}
          vertices={fragment.vertices}
          key={uuid()}
        />
      )
    })
  }

  render() {

    let {
      ship,
      asteroid,
      laser,
      debris,
      scoreBoard
    } = this.props

    return (
      <div className="Board"
        ref={this.board}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        tabIndex="0"
      >
        <div className="board-header">
          <ScoreBoard
            currentScore={scoreBoard.currentScore}
            topScore={scoreBoard.topScore}
          />
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
            { this.mapAsteroids(asteroid) }
            { this.mapDebris(debris) }
          </Layer>
        </Stage>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ship: state.ship,
    asteroid: state.asteroid,
    laser: state.laser,
    debris: state.debris,
    scoreBoard: state.scoreBoard
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
    shipHitTest: () => dispatch(shipHitTest()),
    createAsteroids: asteroidCount => dispatch(createAsteroids(asteroidCount))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
