import React from 'react'

function Button (props) {
  const {
    handleClick,
    title
  } = props

  return (
    <button className="form-button" onClick={handleClick}>
      {title}
    </button>
  )
}

export default Button