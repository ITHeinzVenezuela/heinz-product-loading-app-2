import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  
}

const Checkbox = (props: Props) => {
  const {className, ...inputProps} = props
  return (
    <div className="flex items-center">
      <input type="checkbox" className={`Checkbox ${className}`} {...inputProps}  />
      <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
    </div>
  )
}

export default Checkbox