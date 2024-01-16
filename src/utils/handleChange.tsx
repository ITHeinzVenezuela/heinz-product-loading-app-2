import { ChangeEventHandler } from 'react'

type params = {
  stock: number,
  value: string,
  MIN_VALUE: number,
}

export const handleQuantity = ({ stock, value, MIN_VALUE }: params) =>  {
  const quantity = parseFloat(value)
  if (quantity <= stock) {
    return (quantity >= 0.25) ? quantity : MIN_VALUE
  }
  return
}