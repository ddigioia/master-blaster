import React, { Component } from 'react'
import uuid from 'uuid/v4'

class ScoreBoard extends Component {
  mapScores (highScores) {
    return highScores.map(score => {
      let { userName, value } =  score

      if (userName.length >= 15) {
        userName = userName.slice(0, 12) + '...'
      }

      return (
        <li key={uuid()}>
          <span className='scoreboard-user'>{userName}</span>
          <span className='scoreboard-score'>{value}</span>
        </li>
      )
    })
  }

  render () {
    const { currentScore, highScore, highScores } = this.props

    return (
      <div className='score-con'>
        <span className='score current-score'>Score: {currentScore}</span>
        <span className='score top-score'>High Score: {highScore}</span>
        <div className='scoreboard-con'>
          <div className='scoreboard-header'>
            <span className='scoreboard-user'>User</span>
            <span className='scoreboard-score'>Score</span>
          </div>
          <ul>
              {this.mapScores(highScores)}
          </ul>
        </div>
      </div>
    )
  }
}

export default ScoreBoard
