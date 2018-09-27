import React, { Component } from 'react'
import { Line } from 'react-konva'
import * as constants from '../constants'

class Asteroid extends Component {
  render () {
    let {position, rotation, vertices} = this.props

    return (
      <Line
        x={position.x}
        y={position.y}
        points={vertices}
        strokeWidth={constants.ASTEROID_STROKE_WIDTH}
        stroke={constants.ASTEROID_COLOR}
        closed='true'
        rotation={rotation}
      />
    )
  }
}

export default Asteroid
