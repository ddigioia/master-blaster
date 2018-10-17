import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect } from 'react-konva'
import uuid from 'uuid/v4'
import '../styles/Board.css'
import Ship from '../components/Ship'
import Asteroid from '../components/Asteroid'
import Laser from '../components/Laser'
import Debris from '../components/Debris'
import PowerUp from '../components/PowerUp'
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
  powerUpHitTest,
  createAsteroids,
  createPowerUp
} from '../actions'

class Board extends Component {
  constructor (props) {
    super()
    this.board = React.createRef()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.started = false
    this.asteroidIntervalId = 0
    this.powerUpIntervalId = 0
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
        this.handleFire()
        // this.props.stopRotation() // prevents spray and pray
        break
      default:
        break
    }
  }

  handleFire () {
    let {rotation, position: {x, y}, radius, poweredUpTimeStamp} = this.props.ship
    let laser = {
      rotation,
      position: {x, y},
      radius,
      quantity: poweredUpTimeStamp ? 2 : 1
    }
    this.props.fire(laser)
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
    this.props.powerUpHitTest()
    this.props.update()
    window.requestAnimationFrame(this.updateGame.bind(this))
  }

  asteroidCreator () {
    let count
    let rangeMax = constants.ASTEROID_BATCH_COUNT
    let rangeMin = constants.ASTEROID_BATCH_COUNT
    let batchMax = constants.ASTEROID_BATCH_COUNT_MAX
    let increment = constants.ASTEROID_BATCH_COUNT_INCREASE

    this.asteroidIntervalId = window.setInterval(() => {
      if (rangeMax < batchMax) rangeMax *= increment

      count = randomNumInRange(rangeMin, Math.floor(rangeMax))
      this.props.createAsteroids(count)
    }, 2000)
  }

  powerUpCreator () {
    this.powerUpIntervalId = window.setInterval(() => {
      this.props.createPowerUp()
    }, 5000)
  }

  handleStart () {
    const board = this.board.current
    window.clearInterval(this.asteroidIntervalId)
    window.clearInterval(this.powerUpIntervalId)
    board.focus()
    this.props.start()
    if (this.started === false) {
      this.updateGame()
    }
    this.asteroidCreator()
    this.powerUpCreator()
    this.started = true
  }

  handleLogin () {
    console.log('trying to login')
  }

  mapLaserBeams (laser) {
    return laser.beams.map(beam => {
      return (
        <Laser
          rotation={beam.rotation}
          position={beam.position}
          radius={beam.radius}
          color={beam.color}
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

  mapPowerUps (powerUp) {
    return powerUp.powerUps.map(powerUp => {
      return (
        <PowerUp
          rotation={powerUp.rotation}
          position={powerUp.position}
          radius={powerUp.radius}
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
      board,
      powerUp
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
        <button
          className='btn login-btn'
          style={{display: ((board.gameState === 'paused' || board.gameState === 'gameOver') && board.gameState !== 'loggedIn') ? 'block' : 'none'}}
          onClick={this.handleLogin}
        >
          Login
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
              color={ship.color}
            />
            { this.mapLaserBeams(laser) }
            { this.mapAsteroids(asteroid) }
            { this.mapDebris(debris) }
            { this.mapPowerUps(powerUp) }
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
    board: state.board,
    powerUp: state.powerUp
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
    createPowerUp: () => dispatch(createPowerUp()),
    powerUpHitTest: () => dispatch(powerUpHitTest()),
    fire: laser => dispatch(fire(laser)),
    createAsteroids: asteroidCount => dispatch(createAsteroids(asteroidCount))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
