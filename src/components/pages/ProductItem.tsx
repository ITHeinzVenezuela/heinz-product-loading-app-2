import React, { useContext } from 'react'
import CartContext from '../../context/CartContext'
import formatMoney from '@/utils/formatMoney'
import { FaImages } from 'react-icons/fa'

type Props = {
  product: Product,
}

const ProductItem = ({ product }: Props) => {

  const { cart, saveProduct, removeProduct } = useContext(CartContext)

  const { name, sku, available, price, image } = product

  const found = Boolean(cart.find(item => item.sku === sku))

  const handleClick = () => {
    if (found) {
      removeProduct(product.sku)
    } else {
      saveProduct(product)
    }
  }

  return (
    <div className="ProductItem">
      <div className="image-container">
        <img src={image} alt="" />
        <FaImages size={40} className="fill-slate-200"/>
      </div>
      <div className="ProductItem-info">
        <div className="ProductItem-info-details">
          <h4 className="text-base text-gray-900 font-bold pb-2">{name}</h4>
          <small className="block text-sm">
            SKU: <span className="font-bold">{sku}</span>
          </small>
          <small className="block text-sm">
            Disponible: <span className="font-bold">{available}</span>
          </small>
          <small className="block text-gray-700 text-sm">
            Precio: <span className={"font-bold"}>{formatMoney(price)}</span>
          </small>
        </div>
        <button
          onClick={handleClick}
          disabled={!available || !price}
          className={`ProductItem-action ${price ? "disabled:bg-slate-300" : "disabled:bg-red-300"} ${found ? "bg-green-500" : "bg-sky-800"} `}
        >
          {
            (price > 0) ?
              (
                available ?
                  (found ? "Añadido" : "Añadir") : "Sin Stock"
              )
              :
              "Sin Precio"
          }
        </button>
      </div>
    </div>
  )
}

export default ProductItem