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
import Button from '../components/Button'
import Form from './Form'
import { screen, randomNumInRange, deleteCookie } from '../helpers'
import * as constants from '../constants'
import {
  start,
  loggingIn,
  loggedOut,
  rotateLeft,
  rotateRight,
  stopRotation,
  forward,
  reverse,
  fire,
  stop,
  pause,
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
    this.handleLogout = this.handleLogout.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.started = false
    this.asteroidIntervalId = 0
    this.powerUpIntervalId = 0
  }

  handleKeyDown (event) {
    const { keyCode } = event

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
        if (!event.repeat) this.handleFire()
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
      if (document.visibilityState === 'visible') this.props.createAsteroids(count)
    }, 2000)
  }

  powerUpCreator () {
    this.powerUpIntervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible') this.props.createPowerUp()
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
    this.props.loggingIn()
  }

  handleLogout () {
    this.props.loggedOut()
    deleteCookie('login_jwt')
    deleteCookie('userName')
  }

  handleBack () {
    this.props.pause()
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
      powerUp,
      user
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
            gameState={board.gameState}
            currentScore={scoreBoard.currentScore}
            highScore={user.userHighScore}
            highScores={scoreBoard.highScores}
          />
          <span
            className="controls"
            style={{display: (board.gameState === "paused" || board.gameState === "gameOver") ? "block" : "none"}}
          >
            Use [ ← ][ ↑ ][ ↓ ][ → ] to MOVE<br />
            Use [ SPACE ] to SHOOT
          </span>
        </div>
        <div
          className="game-over-con"
          style={{display: board.gameState === "gameOver" ? "block" : "none"}}
        >
        GAME OVER
        </div>
        <Button
          className="btn start-btn"
          style={{display: (board.gameState === "paused" || board.gameState === "gameOver") ? "block" : "none"}}
          handleClick={this.handleStart}
          title="Start"
        />
        <Button
          className="btn login-btn"
          style={{display: ((board.gameState === "paused" || board.gameState === "gameOver")) ? "block" : "none"}}
          handleClick={user.loggedIn ? this.handleLogout : this.handleLogin}
          title={user.loggedIn ? "Logout" : "Login"}
        />
        <Form
          style={{display: (board.gameState === "loggingIn" && user.loggedIn === false ? "block" : "none")}}
          handleBack={this.handleBack}
          className="form-container login-form"
        />
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
    powerUp: state.powerUp,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    start: () => dispatch(start()),
    loggingIn: () => dispatch(loggingIn()),
    loggedOut: () => dispatch(loggedOut()),
    rotateLeft: () => dispatch(rotateLeft()),
    rotateRight: () => dispatch(rotateRight()),
    stopRotation: () => dispatch(stopRotation()),
    forward: () => dispatch(forward()),
    reverse: () => dispatch(reverse()),
    stop: () => dispatch(stop()),
    pause: () => dispatch(pause()),
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
