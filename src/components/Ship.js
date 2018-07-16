import React, { Component } from 'react'
import { Line } from 'react-konva'
import * as constants from '../constants'

class Ship extends Component {
  render () {
    let {position, rotation, radius} = this.props

    return (
      <Line
        x={position.x}
        y={position.y}
        points={
        [
          -(radius * 2), -radius,
            (radius * 2), -radius, // wing
          radius / 2, (-radius / 2),
          radius * 1, 0, // nose of ship
          radius / 2, (radius / 2),
            (radius * 2), radius, // wing
          -(radius * 2), radius,
          -radius, 0
        ]
        }
        strokeWidth={constants.SHIP_STROKE_WIDTH}
        stroke={constants.SHIP_COLOR}
        closed='true'
        rotation={rotation}
      />
    )
  }
}

export default Ship
