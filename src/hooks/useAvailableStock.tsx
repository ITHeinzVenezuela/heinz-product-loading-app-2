import { useContext } from 'react'
import CartContext from "@/context/CartContext";

const useAvailableStock = (available: number): number => {
  const { selectedEmployees } = useContext(CartContext)
  
  const availablePerUser = available / selectedEmployees.length
  const integerStockValue = Math.floor(availablePerUser)

  const rest = availablePerUser - integerStockValue

  const rounds = [0, 0.25, 0.5, 0.75, 1]

  let extra = 0;
  rounds.forEach((value) => {
    extra = (rest >= value) ? value : extra
  })

  const stock = integerStockValue + extra;
  return stock;
}

export default useAvailableStock;