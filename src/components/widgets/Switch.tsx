import React, { InputHTMLAttributes, useRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
}

const Switch = ({ label, className = "", id, ...inputProps }: Props) => {

  const switchSwitch = useRef(null);

  return (
    <div className={`Switch ${className}`}>
      <input id={id} name={id} type="checkbox" ref={switchSwitch} {...inputProps} />
      <label className="Switch__switch" htmlFor={id}>
        <div className="Switch__switch--toggle"></div>
      </label>
      <label htmlFor={id} className="Switch__title">{label}</label>
    </div>
  )
}

export default Switch