import { Component } from 'react'
import { Line } from 'react-konva'
import * as constants from '../constants'

class PowerUp extends Component {
  
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
            radius * 1, 0, // nose of power up
            radius / 2, (radius / 2),
              (radius * 2), radius, // wing
            -(radius * 2), radius,
            -radius, 0
          ]
        }
        strokeWidth={constants.POWER_UP_STROKE_WIDTH}
        stroke={constants.POWER_UP_COLOR}
        closed='true'
        rotation={rotation}
      />
    )
  }
}

export default PowerUp