import React from 'react'
import '../styles/Input.css'

function Input (props) {
  const {
    name,
    // title,
    value,
    type,
    handleChange,
    placeholder,
    required,
    onFocus
  } = props

  return (
    <div className="form-group">
      {/* <label htmlFor={name} className="form-label">{title}</label> */}
      <input
        className="form-input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        onFocus={onFocus}
      />
    </div>
  )
}

export default Input