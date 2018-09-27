import React, { Component } from 'react'
import { Line, Star } from 'react-konva'
import * as constants from '../constants'

class PowerUp extends Component {
  render () {
    let {rotation, position, radius} = this.props

    return (
      // <Line
      //   x={position.x}
      //   y={position.y}
      //   points={
      //     [
      //       -(radius * 2), -radius, // bottom
      //         (radius * 2), -radius, // wing
      //       radius / 2, (-radius / 2),
      //       radius * 1, 0, // nose of power up
      //       radius / 2, (radius / 2),
      //         (radius * 2), radius, // wing
      //       -(radius * 2), radius, // top
      //       -radius, 0 // back
      //     ]
      //   }
      //   strokeWidth={constants.POWER_UP_STROKE_WIDTH}
      //   stroke={constants.POWER_UP_COLOR}
      //   closed='true'
      //   rotation={rotation}
      // />
      <Star
        x={position.x}
        y={position.y}
        numPoints={10}
        innerRadius={7}
        outerRadius={10}
        stroke={constants.POWER_UP_COLOR}
        strokeWidth={constants.POWER_UP_STROKE_WIDTH}
        fill={constants.POWER_UP_COLOR}
      />
    )
  }
}

export default PowerUp
