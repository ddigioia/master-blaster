import React, { Component } from 'react'
import { Line } from 'react-konva'
import * as constants from '../constants'

class Ship extends Component {

  render() {
    let {position, rotation, radius} = this.props

    return (
      <Line
        x={position.x}
        y={position.y}
        points={
          [
            -(radius * 2), -radius,
            radius * 2, 0,
            -(radius * 2), radius,
            -radius, 0
          ]
        }
        strokeWidth={constants.SHIP_STROKE_WIDTH}
        stroke="#ffffff"
        closed="true"
        rotation={rotation}
      />
    )
  }
}

export default Ship
