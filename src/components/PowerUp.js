import React, { Component } from 'react'
import { Star } from 'react-konva'
import * as constants from '../constants'

class PowerUp extends Component {
  render () {
    let { position } = this.props

    return (
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
