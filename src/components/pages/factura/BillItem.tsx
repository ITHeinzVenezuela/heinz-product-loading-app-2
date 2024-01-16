import React, { useState, useContext, ChangeEventHandler, useEffect } from 'react'
import BillsContext from '@/context/BillsContext'
import Link from 'next/link'
import ConfirmModal from '@/components/widgets/ConfirmModal'
import formatMoney, { getBoxQuantity, getTotalFromProducts } from '@/utils/formatMoney'
import useNotification from '@/hooks/useNotification'
import NotificationModal from '@/components/widgets/NotificationModal'
import { useRouter } from 'next/router'
import BillProductRow from './BillProductRow'
import Input from '@/components/widgets/Input'
import { getRandomID } from '@/utils/getRandomID'
import { saveToSStorage } from '@/utils/sessionStorage'
import CartContext from '@/context/CartContext'
import { getPurchaseOrders, getSKUList } from '@/utils'

type Props = {
  bill: Bill,
  modify?: boolean,
}

const BillItem = ({ bill: billItem, modify = false }: Props) => {

  const router = useRouter()

  const cart = useContext(CartContext)
  const { bills, setBills, deleteBill } = useContext(BillsContext)

  const [loading, setLoading] = useState<boolean>(false)
  const [bill, setBill] = useState<Bill>(billItem)

  const { employee, products, purchase } = bill

  const [notification, handleNotification] = useNotification()

  const [alert, handleAlert] = useNotification()

  const boxQuantity = getBoxQuantity(products)
  const total = formatMoney(getTotalFromProducts(products))

  const handleDeleteBill = () => {
    handleNotification.open({
      title: "¡Precaución!",
      type: "warning",
      message: "¿Estás seguro de querer eliminar este pedido?",
    })
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    if (name === "order") {
      setBill({
        ...bill,
        purchase: {
          ...purchase,
          order: value,
          id: getRandomID(),
        }
      })
    }
  }

  const handleSave = () => {
    setLoading(true)

    const default_order_name = cart.purchase.order
    const modifiedBills = bills.filter((bill) => {
      return (
        (bill.purchase.order !== default_order_name) &&
        (bill.employee.ficha !== employee.ficha)
      )
    })

    const orders = getPurchaseOrders(modifiedBills, default_order_name)
    
    const sku_list = getSKUList(cart.cart)         // Los SKU del boletín en general
    const billProducts = getSKUList(products)
    
    debugger
    
    if (orders.includes(purchase.order) && (sku_list !== billProducts)) {
      handleAlert.open({
        type: "warning",
        title: "Restricción",
        message: `Debido a que modificó el listado de productos en este pedido, debe colocar una orden de compra distinta a la del boletín general`
      })
      setLoading(false)
    } else {
      setBills(bills.map(
        item => (item.employee.ficha === employee.ficha) ? bill : item
      ))
      handleAlert.open({
        type: "success",
        title: "Éxito",
        message: "Se han guardado las modificaciones del pedido con éxito"
      })
      setTimeout(() => router.push("/factura"), 4000);
    }
  }

  const buttonStyles = "text-white font-bold py-2 px-4 bg-secondary hover:bg-sky-500 rounded-lg disabled:bg-slate-400"

  return (
    <>
      <div className="BillItem">
        <div className="p-8">
          <div className="py-4 px-8 mb-4 bg-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold">Información del Pedido</h3>
            <div className="flex gap-4">
              {
                modify &&
                <>
                  <button
                    className={buttonStyles}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Guardando..." : "Guardar"}
                  </button>
                  <button onClick={handleDeleteBill} className={buttonStyles}>
                    Eliminar
                  </button>
                </>
              }
              {
                !modify &&
                <Link href={`/factura/${employee.ficha}`} className={buttonStyles}>
                  Modificar
                </Link>
              }
            </div>
          </div>
          <div className="EmployeeBill__main-container px-8 py-8 bg-white">
            <ul>
              <li><span>Orden:</span> {bill.number}</li>
              <li><span>Ficha:</span> {employee.ficha}</li>
              <li><span>Nombre:</span> {employee.name}</li>
              <li><span>Dirección:</span> {employee.address}</li>
              <li><span>Zona:</span> {employee.zone}</li>
              <li><span>Tipo de cliente:</span> {employee.clientType}</li>
              <li className="flex items-center gap-4">
                <span>Orden de compra:</span>
                {
                  !modify ?
                    purchase.order
                    :
                    <input
                      name="order"
                      placeholder="📄 12-12052023"
                      className="border-gray-300 px-2 py-1 border rounded-md w-48"
                      value={purchase.order}
                      onChange={handleChange}
                    />
                }
              </li>
              <li>
                <span>Fecha de Recepción:</span>{" "}
                {new Date(purchase.date).toLocaleDateString("es")}
              </li>
            </ul>
            <table className="w-full mt-8">
              <thead>
                <tr className="text-right">
                  <th className="text-center">SKU</th>
                  <th className="text-center">Descripción</th>
                  {
                    modify &&
                    <th className="">Stock</th>
                  }
                  <th>Cantidad</th>
                  <th>Precio Base</th>
                  <th>Subtotal</th>
                  {
                    modify &&
                    <th></th>
                  }
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product, i) =>
                    <BillProductRow
                      key={i}
                      bill={bill}
                      modify={modify}
                      product={product}
                      employee={employee}
                      setBill={setBill}
                    />
                  )
                }
                <tr className="text-sky-700">
                  <td></td>
                  <td></td>
                  {
                    modify &&
                    <td></td>
                  }
                  <td className="text-right font-bold">{boxQuantity}</td>
                  <td></td>
                  <td className="text-right font-bold">{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmModal
        notificationProps={[notification, handleNotification]}
        acceptAction={() => {
          deleteBill(employee.ficha)
          router.push("/factura")
        }}
      />
      <NotificationModal alertProps={[alert, handleAlert]} />
    </>
  )
}

export default BillItem