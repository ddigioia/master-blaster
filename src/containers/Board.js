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
  reverse,
  fire,
  stop,
  update,
  asteroidHitTest,
  shipHitTest,
  createAsteroids
} from '../actions'

class Board extends Component {
  constructor (props) {
    super()
    this.board = React.createRef()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.started = false
    this.asteroidIntervalId = 0
  }

  handleKeyDown ({keyCode}) {
    switch (keyCode) {
      case constants.LEFT:
        this.props.rotateLeft()
        break
      case constants.RIGHT:
        this.props.rotateRight()
        break
      case constants.UP:
        this.props.forward()
        break
      case constants.DOWN:
        this.props.reverse()
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

  handleKeyUp ({keyCode}) {
    switch (keyCode) {
      case constants.LEFT:
      case constants.RIGHT:
        this.props.stopRotation()
        break
      case constants.UP:
      case constants.DOWN:
        this.props.stop()
        break
      default:
        break
    }
  }

  updateGame () {
    this.props.asteroidHitTest()
    this.props.shipHitTest()
    this.props.update()
    window.requestAnimationFrame(this.updateGame.bind(this))
  }

  asteroidCreator () {
    let count
    let max = constants.ASTEROID_BATCH_COUNT
    let min = constants.ASTEROID_BATCH_COUNT
    let increment = constants.ASTEROID_BATCH_COUNT_INCREASE
    this.asteroidIntervalId = window.setInterval(() => {
      max *= increment
      count = randomNumInRange(min, Math.floor(max))
      this.props.createAsteroids(count)
    }, 2000)
  }

  handleStart () {
    const board = this.board.current
    window.clearInterval(this.asteroidIntervalId)
    board.focus()
    this.props.start()
    if (this.started === false) {
      this.updateGame()
    }
    this.asteroidCreator()
    this.started = true
  }

  mapLaserBeams (laser) {
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

  mapAsteroids (asteroid) {
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

  mapDebris (debris) {
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

  render () {
    let {
      ship,
      asteroid,
      laser,
      debris,
      scoreBoard,
      board
    } = this.props

    return (
      <div className='Board'
        ref={this.board}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        tabIndex='0'
      >
        <div className='board-header'>
          <ScoreBoard
            currentScore={scoreBoard.currentScore}
            topScore={scoreBoard.topScore}
          />
          <span
            className='controls'
            style={{display: (board.gameState === 'paused' || board.gameState === 'gameOver') ? 'block' : 'none'}}
          >
            Use [ ← ][ ↑ ][ ↓ ][ → ] to MOVE<br />
            Use [ SPACE ] to SHOOT
          </span>
        </div>
        <div
          className='game-over-con'
          style={{display: board.gameState === 'gameOver' ? 'block' : 'none'}}
        >
        GAME OVER
        </div>
        <button
          className='btn start-btn'
          style={{display: (board.gameState === 'paused' || board.gameState === 'gameOver') ? 'block' : 'none'}}
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
    scoreBoard: state.scoreBoard,
    board: state.board
  }
}

const mapDispatchToProps = dispatch => {
  return {
    start: () => dispatch(start()),
    rotateLeft: () => dispatch(rotateLeft()),
    rotateRight: () => dispatch(rotateRight()),
    stopRotation: () => dispatch(stopRotation()),
    forward: () => dispatch(forward()),
    reverse: () => dispatch(reverse()),
    stop: () => dispatch(stop()),
    update: () => dispatch(update()),
    asteroidHitTest: () => dispatch(asteroidHitTest()),
    shipHitTest: () => dispatch(shipHitTest()),
    fire: laserOrigin => dispatch(fire(laserOrigin)),
    createAsteroids: asteroidCount => dispatch(createAsteroids(asteroidCount))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
