import React, { useState, useContext, ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import BillsContext from '@/context/BillsContext'
import useAvailableStock from '@/hooks/useAvailableStock'
import formatMoney from '@/utils/formatMoney'
import { FaTrash } from 'react-icons/fa6'
import ConfirmModal from '@/components/widgets/ConfirmModal'
import useNotification from '@/hooks/useNotification'

type Props = {
  modify: boolean,
  product: Product,
  employee: Employee,
  bill: Bill,
  setBill: Dispatch<SetStateAction<Bill>>
}

const BillProductRow = ({ product, employee, modify, bill, setBill }: Props) => {

  const { bills, updateProduct } = useContext(BillsContext)
  const { sku, name, quantity, price, available } = product

  const MIN_VALUE = 0.25
  const stock = useAvailableStock(available)

  const [notification, handleNotification] = useNotification()
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const quantity = parseFloat(target.value)

    if (quantity <= stock) {
      const updatedProduct = {
        ...product,
        quantity: (quantity >= MIN_VALUE) ? quantity : MIN_VALUE,
      }
      updateProduct(updatedProduct, employee.ficha)
    }
  }

  const deleteProduct = (productID: Product["sku"]) => {
    const products = bill.products.filter(product => product.sku !== productID)
    setBill({ ...bill, products })
  }
  
  const handleDeleteProduct = () => {
    handleNotification.open({
      title: "¡Precaución!",
      type: "warning",
      message: "¿Estás seguro de querer eliminar el producto del pedido de este empleado?",
    })
  }

  return (
    <>
      <tr className="text-slate-500">
        <td className="text-center font-medium">{sku}</td>
        <td className="font-medium">{name}</td>

        {
          modify &&
          <td className="font-medium text-right">{stock}</td>
        }
        <td className="text-right">
          {
            modify ?
              <input
                id=""
                min={MIN_VALUE}
                step="0.25"
                name="product_quantity"
                type="number"
                value={quantity}
                placeholder='0.00'
                onChange={handleChange}
                className="border-gray-300 text-right px-2 py-1 border rounded-md w-28"
              />
              :
              quantity
          }
        </td>
        <td className="text-right">{formatMoney(price)}</td>
        <td className="text-right font-medium">{formatMoney(quantity * price)}</td>
        {
          modify &&
          <td className="text-right font-semibold">
            <button
              onClick={handleDeleteProduct}
            >
              <FaTrash className="hover:fill-red-700 inline-block" />
            </button>
          </td>
        }
      </tr>
      <ConfirmModal
        notificationProps={[notification, handleNotification]}
        acceptAction={() => {
          deleteProduct(product.sku)
        }}
      />
    </>
  )
}

export default BillProductRow