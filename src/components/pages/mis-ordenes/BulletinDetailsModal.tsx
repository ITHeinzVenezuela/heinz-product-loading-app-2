import React, { Dispatch, SetStateAction } from 'react'
import Modal from '@/components/widgets/Modal'
import { BulletinHeader } from '@/pages/api/boletin/info'
import formatMoney from '@/utils/formatMoney'

type Props = {
  showModal: boolean,
  setModal: Dispatch<SetStateAction<boolean>>,
  bulletinDetails: BulletinHeader[],
}

const BulletinDetailsModal = ({ bulletinDetails, ...modalProps }: Props) => {
  return (
    <Modal className="BulletinDetailsModal" transparent closeButton={false} {...modalProps} >
      <table className="Table">
        <thead>
          <tr>
            <th className="px-6 py-3">
              <span>SKU</span>
            </th>
            <th className="px-6 py-3">
              <span>Imagen</span>
            </th>
            <th className="px-6 py-3">
              <span>Descripcion</span>
            </th>
            <th className="px-6 py-3">
              <span>Cantidad</span>
            </th>
            <th className="px-6 py-3">
              <span>P. Base</span>
            </th>
            <th className="px-6 py-3">
              <span>Total</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            bulletinDetails.map(({product}, i) =>
              <tr key={`${product.sku}-${i}`}>
                <th>
                  <span>{product.sku}</span>
                </th>
                <th>
                  <div className="flex justify-center">
                    <figure>
                      <img width={50} src={product.image} alt="" />
                    </figure>
                  </div>
                </th>
                <th className="w-[21rem]">
                  <span>{product.name}</span>
                </th>
                <th>
                  <span>{product.quantity}</span>
                </th>
                <th>
                  <span>{formatMoney(product.price)}</span>
                </th>
                <th>
                  <span>{formatMoney(product.price * product.quantity)}</span>
                </th>
              </tr>
            )
          }
        </tbody>
      </table>
    </Modal>
  )
}

export default BulletinDetailsModal