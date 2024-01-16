import React, { useState, useContext, Dispatch, SetStateAction } from 'react'
import Spinner from '@/components/widgets/Spinner'
import CartContext from '@/context/CartContext'
import { getBulletinInfo } from '@/services/boletin'
import { getProducts } from '@/services/products-id'
import { shortDate } from '@/utils/parseDate'
import { FaCartShopping } from 'react-icons/fa6'
import { RiFilePaperFill } from 'react-icons/ri'
import { HandleNotification } from '@/hooks/useNotification'
import { BulletinHeader } from '@/pages/api/boletin/info'

type Props = {
  bulletin: Bulletin,
  setModal: Dispatch<SetStateAction<boolean>>,
  setBulletinDetails: Dispatch<SetStateAction<BulletinHeader[]>>,
  handleNotification: HandleNotification,
}

const MyOrdersRow = ({ bulletin, setModal, setBulletinDetails, handleNotification }: Props) => {

  const { setCart } = useContext(CartContext)

  const [loadingCopyCart, setLoadingCopyCart] = useState<boolean>(false)
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false)

  const setBulletinDetailsAtCart = async (bulletinNumber: number) => {
    try {
      setLoadingCopyCart(true)
      const data = await getBulletinInfo(bulletinNumber)

      const bulletinProducts = data.map(({ product }) => product)
      const productIDs = bulletinProducts.map((product) => product.sku)

      const products = await getProducts(productIDs)

      const productsToBeSaved = products.map(product => {
        const bulletinProduct = bulletinProducts.find(({ sku }) => sku === product.sku)
        if (bulletinProduct && product.available) {
          const modifiedProduct: Product = {
            ...product,
            quantity: product.available >= bulletinProduct.quantity ? bulletinProduct.quantity : product.available,
          }
          return modifiedProduct
        }

        return null
      })
        .filter(product => Boolean(product)) as Product[]

      handleNotification.open({
        type: "success",
        title: "Exito ✅",
        message: "Los productos del boletín seleccionado se han añadido al carrito"
      })

      setCart(productsToBeSaved)

    } catch (error) {
      console.log('error', error)
      handleNotification.open({
        type: "danger",
        title: "Error ❌",
        message: "Ha habido un error copiando los productos del boletin al carrito, intente de nuevo"
      })
    } finally {
      setLoadingCopyCart(false)
    }
  }

  const getDetails = async (bulletinNumber: number) => {
    try {
      setLoadingDetails(true)
      setBulletinDetails([])

      const data = await getBulletinInfo(bulletinNumber)

      setBulletinDetails(data)
      setModal(true)

      console.log('data', data)

    } catch (error) {

      console.log('error', error)

    } finally {
      setLoadingDetails(false)
    }
  }

  return (
    <tr>
      <td className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
        {bulletin.number}
      </td>
      <td className="font-bold">
        {bulletin.zone}
      </td>
      <td className="">
        {bulletin.ficha}
      </td>
      <td className="">
        {bulletin.name}
      </td>
      <td className="">
        {shortDate(bulletin.date)}
      </td>
      <td className="">
        {/* {bulletin.cajas} */}
      </td>
      <td className="">
        {/* {bulletin.total_pedido} */}
      </td>
      <td className="grid grid-cols-2 gap-4">
        {
          loadingCopyCart ?
            <Spinner size="small" />
            :
            <button onClick={() => setBulletinDetailsAtCart(bulletin.number)}>
              <FaCartShopping size={20} className={`hover:fill-sky-500`} />
            </button>
        }
        {
          loadingDetails ?
            <Spinner size="small" />
            :
            <button onClick={() => getDetails(bulletin.number)}>
              <RiFilePaperFill size={20} className="hover:fill-sky-500" />
            </button>
        }
      </td>
    </tr>
  )
}

export default MyOrdersRow