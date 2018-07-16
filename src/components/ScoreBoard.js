import React, { Component } from 'react'

class ScoreBoard extends Component {
  render () {
    const { currentScore, topScore } = this.props

    return (
      <div className='score-con'>
        <span className='score current-score'>Score: {currentScore}</span>
        <span className='score top-score'>Top Score: {topScore}</span>
      </div>
    )
  }
}

export default ScoreBoard
