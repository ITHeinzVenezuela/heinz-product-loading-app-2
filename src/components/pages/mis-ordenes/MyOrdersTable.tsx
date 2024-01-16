import React, { Dispatch, SetStateAction } from 'react'
import { HandleNotification } from '@/hooks/useNotification'
import { getBulletinInfo } from '@/services/boletin'
import { BulletinHeader } from '@/pages/api/boletin/info'
import MyOrdersRow from './MyOrdersRow'

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>,
  setBulletinDetails: Dispatch<SetStateAction<BulletinHeader[]>>,
  handleNotification: HandleNotification,
  bulletins: Bulletin[],
}

const MyOrdersTable = ({ bulletins, setModal, setBulletinDetails, handleNotification }: Props) => {

  const fields = [
    "Pedido",
    "Zona",
    "Ficha",
    "Cliente",
    "Fecha",
    "Cajas",
    "Total Pedido",
  ]

  return (
    <div className="overflow-x-scroll md:overflow-x-auto">
      <table className="Table" style={{ minWidth: "860px" }}>
        <thead>
          <tr>
            {
              fields.map((name, i) =>
                <th key={`${name}-${i}`} className="px-6 py-3">
                  <span>{name}</span>
                </th>
              )
            }
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            bulletins.map((bulletin, i) =>
              <MyOrdersRow key={i}
                {...{
                  setModal,
                  bulletin,
                  handleNotification,
                  setBulletinDetails,
                }}
              />
            )
          }
          {/*Bill Footer */}
          {/* <tr>
                <td className=" font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  -
                </td>
                <td className="font-bold text-secondary">
                  Total
                </td>
                <td className="text-end font-bold text-secondary !pr-12">
                  {boxQuantity}
                </td>
                <td className=""></td>
                <td className=" font-bold text-secondary">
                  {bill}
                </td>
                <td className="atext-right"></td>
                <td className="w-4 p-4"></td>
              </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default MyOrdersTable