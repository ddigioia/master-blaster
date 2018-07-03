import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-konva'

class Ship extends Component {
  constructor(props) {
    super()
  }

  render() {
    let {position, rotation, radius} = this.props
    console.log('position: ', position)
    console.log('rotation: ', rotation)
    console.log('radius: ', radius)

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
        strokeWidth={1}
        stroke="#ffffff"
        closed="true"
        rotation={rotation}
      />
    )
  }
}

export default Ship
