import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { FaAngleRight, FaCartShopping, FaXmark } from 'react-icons/fa6'
import CartContext from '@/context/CartContext'
import { useRouter } from 'next/router'

const Cart = () => {
  const { cart, removeProduct, emptyCart } = useContext(CartContext)
  const [opened, setOpened] = useState<boolean>(false)
  const router = useRouter()

  return (
    <>
      <div className="Cart relative py-5">
        <button onClick={() => setOpened(!opened)} className="font-bold text-2xl curs">
          < FaCartShopping className="inline-block fill-slate-600" /> <span className="text-xl">{cart.length}</span>
        </button>
        {
          opened &&
          <>
            <div className="Cart__modal">
              <div className="Cart__header">
                <span>
                  <span>En el carrito</span>
                  <small>{cart.length}</small>
                </span>
                <button onClick={emptyCart}>Vaciar carrito</button>
              </div>
              <ul className="Cart__items">
                {
                  cart.map(({ sku, name, image, available }) =>
                    <li key={sku}>
                      <div>
                        <img src={image} alt="" />
                      </div>
                      <div className='Cart__items--details'>
                        <span>{name}</span>
                        <small>Disponible: {available}</small>
                        <small>SKU: {sku}</small>
                      </div>
                      <button onClick={() => {
                        removeProduct(sku)
                        if (cart.length === 1) setOpened(false)
                      }}>
                        <FaXmark size={10} className="fill-white" />
                      </button>
                    </li>
                  )
                }
              </ul>
              <button
                className="Cart__button"
                onClick={() => router.push("/seleccionar-empleados")}
              >
                <span>Siguiente</span>
                <FaAngleRight />
              </button>
            </div>
            <div onClick={() => setOpened(!opened)} className='overlay'></div>
          </>
        }
      </div>
    </>
  )
}

export default Cart