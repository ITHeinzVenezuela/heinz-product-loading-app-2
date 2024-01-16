export const parseDecimals = (price: number): number =>{
  const parsed = parseFloat((price).toFixed(4))
  return parsed;
}

const formatMoney = (price: number): string => {
  return (
    `${parseDecimals(price)} VES`
  )
  // return (
  //   price.toLocaleString("es", {
  //     style: "currency",
  //     currency: "VES"
  //   })
  // )
}

export const getTotalFromProducts = (products: Product[]): number =>{
  const total = products.reduce((accumulator, product) => {
    return accumulator + (product.quantity * product.price)
  }, 0)
  return total;
}

export const getTotalBoxesFromProducts = (products: Product[]): number =>{
  const total = products.reduce((accumulator, product) => {
    return accumulator + product.quantity
  }, 0)
  return total;
}

export const getBoxQuantity  = (products: Product[])=>{
  const boxQuantity = products.reduce((accumulator, product) => {
    return accumulator + product.quantity
  }, 0)
  return boxQuantity
}

export default formatMoney;