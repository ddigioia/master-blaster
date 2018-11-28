import React from 'react'
import '../styles/InputError.css'

function InputError (props) {
  const {
    className,
    style,
    text
  } = props

  return (
    <span
      className={className}
      style={style}
    >
      {text}
    </span>
  )
}

export default InputError