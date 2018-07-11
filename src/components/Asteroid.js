import React, { Component } from 'react'
import { Line } from 'react-konva'
import * as constants from '../constants'

class Asteroid extends Component {
  constructor(props) {
    super()
  }

  render() {
    let {position, rotation, radius, vertices} = this.props

    return (
      <Line
        x={position.x}
        y={position.y}
        points={vertices}
        strokeWidth={constants.ASTEROID_STROKE_WIDTH}
        stroke={constants.ASTEROID_COLOR}
        closed="true"
        rotation={rotation}
        // rotate={150}
      />
    )
  }
}

export default Asteroid