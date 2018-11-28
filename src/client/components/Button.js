import React from 'react'
import '../styles/Button.css'

function Button (props) {
  const {
    handleClick,
    className,
    title,
    style,
    type
  } = props

  return (
    <button type={type} className={className} onClick={handleClick} style={style}>
      {title}
    </button>
  )
}

export default Button