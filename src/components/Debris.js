import React, { Component } from 'react'
import { Line } from 'react-konva'
import * as constants from '../constants'

class Debris extends Component {

  render() {
    const {radius, position, rotation, vertices} = this.props

    return (
      <Line
        x={position.x}
        y={position.y}
        points={vertices}
        strokeWidth={constants.DEBRIS_STROKE_WIDTH}
        closed="true"
        stroke={constants.DEBRIS_COLOR}
        rotation={rotation}
      />
    )
  }
}

export default Debris