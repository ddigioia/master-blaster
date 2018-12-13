import React, { Component } from 'react'

class ScoreBoard extends Component {
  render () {
    const { currentScore, highScore } = this.props

    return (
      <div className='score-con'>
        <span className='score current-score'>Score: {currentScore}</span>
        <span className='score top-score'>Top Score: {highScore}</span>
      </div>
    )
  }
}

export default ScoreBoard
