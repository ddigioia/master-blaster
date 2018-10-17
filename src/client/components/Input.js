import React from 'react'

function Input (props) {
  const {
    name,
    title,
    value,
    type,
    handleChange,
    placeholder
  } = props

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{title}</label>
      <input
        className="form-input"
        id={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input