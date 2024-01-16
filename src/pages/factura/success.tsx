import Button from '@/components/widgets/Button'
import BillsContext from '@/context/BillsContext'
import CartContext from '@/context/CartContext'
import useAuth from '@/hooks/useAuth'
import formatMoney, { getTotalBoxesFromProducts, getTotalFromProducts } from '@/utils/formatMoney'
import { shortDate } from '@/utils/parseDate'
import { getFromSStorage } from '@/utils/sessionStorage'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

const BillingSuccess = () => {

  const router = useRouter()
  const [renderPageAuth, credentials] = useAuth({})
  
  const { resetCart } = useContext(CartContext)
  const { resetBills, bills } = useContext(BillsContext)

  const [confirmedBills, setConfirmedBills] = useState<Bill[]>([])

  const [renderPage, setRenderPage] = useState<boolean>(true)

  useEffect(() => {
    const confirmed = getFromSStorage<boolean>("bills-confirmation")
    if (confirmed === true) {

      setConfirmedBills(bills)

      resetCart()
      resetBills()
      setRenderPage(true)

      sessionStorage.removeItem("bills-confirmation")

    } else {
      router.push("/productos")
    }
  }, [])

  return (
    renderPage && renderPageAuth &&
    <main className="BillingSuccess">
      <div className="main-container">
        <div className="w-full grid grid-cols-[1fr_auto] items-center justify-between">
          <h1 className="title">Se creado el boletín con éxito</h1>
          <img src="/images/success.png" alt="" />
        </div>
        <table className="w-full">
          <thead>
            <tr className="">
              <th>Pedido</th>
              <th>Ficha</th>
              <th>Cliente</th>
              <th>Orden de Compra</th>
              <th>Fecha</th>
              <th>Cajas</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {confirmedBills.map(({ employee, purchase, products, number }) => {
              const boxes = getTotalBoxesFromProducts(products)
              const total = getTotalFromProducts(products)
              return (
                <tr key={number}>
                  <td>{number}</td>
                  <td>{employee.ficha}</td>
                  <td>{employee.name}</td>
                  <td>{purchase.order}</td>
                  <td>{shortDate(purchase.date)}</td>
                  <td>{boxes}</td>
                  <td>{formatMoney(total)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={() => router.push("/productos")}>
          Ir al inicio
        </button>
      </div>
    </main >
  )
}

export default BillingSuccess