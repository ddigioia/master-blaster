import React, { Component } from 'react'
import { Line } from 'react-konva'
import * as constants from '../constants'

class Laser extends Component {
  render () {
    let {position, rotation, radius, color} = this.props

    return (
      <Line
        x={position.x}
        y={position.y}
        points={
          [radius, 0, radius * 2, 0]
        }
        strokeWidth={constants.LASER_STROKE_WIDTH}
        stroke={color}
        closed='true'
        rotation={rotation}
      />
    )
  }
}

export default Laser
