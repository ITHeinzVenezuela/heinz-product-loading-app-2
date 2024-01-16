import React from 'react'
import Link from 'next/link';
import Picture from '../Picture'
import { useRouter } from 'next/router';
import { RiFilePaperFill } from "react-icons/ri";
import { FaBriefcase, FaBottleWater, FaArrowRightToBracket, FaUsers } from "react-icons/fa6";
import Cart from './Cart';
import { eraseCookie } from '@/utils/cookies';
import useAuth from '@/hooks/useAuth';
const XLSX = require('../../../../node_modules/xlsx/xlsx.js')



// {
//   link: "/login",
//   label: "Cerrar Sesión",
// },

const navigationList = (is_admin: boolean) => {
  const list = [
    {
      link: "/mis-ordenes",
      label: "Mis Ordenes",
      Icon: RiFilePaperFill
    },
    {
      link: "/activar-ficha",
      label: "Activar Ficha",
      Icon: FaBriefcase
    },
    {
      link: "/activar-producto",
      label: "Activar Producto",
      Icon: FaBottleWater
    },
  ]
  
  const onlyAdminsRoute = {
    link: "/usuarios",
    label: "Usuarios",
    Icon: FaUsers
  }
  
  if(is_admin) list.push(onlyAdminsRoute)
  return list;
}

type Props = {
  products?: Product[]
}

const Header = ({ products }: Props) => {

  const router = useRouter()

  const [renderPage, credentials] = useAuth({})

  const { nombre, is_admin } = credentials.user



  const handleDownloadInventory = () => {
    if (products && products.length) {
      const availableProducts = products.filter(product => product.available)
      const formattedProducts = availableProducts.map(product => {
        return ({
          SKU: product.sku,
          NOMBRE: product.name,
          STOCK: product.available,
          PRECIO: product.price.toFixed(4),
        })
      })
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(formattedProducts)

      XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
      XLSX.writeFile(workbook, `Inventario de Productos.xlsx`)
    }
  }

  return (
    <header className="Header">

      <div className="flex justify-between items-center">
        <Link href="/productos">
          <Picture className="w-48" url="https://i.imgur.com/j4F3kJ3.png" />
          {/* <Picture className="w-48" url="https://i.imgur.com/hkIgVIM.png" /> */}
        </Link>
        <Cart />
      </div>

      <nav className="font-bold">
        <span className="sm:hidden">🍔</span>
        <ul>
          {
            navigationList(is_admin).map(({ link, label, Icon }, i) =>
              <li key={i}>
                <Link href={link}><Icon /> {label}</Link>
              </li>
            )
          }
          {
            products &&
            <li onClick={handleDownloadInventory} className="cursor-pointer">
              <span><FaBriefcase /> Descargar inventario</span>
            </li>
          }
        </ul>
        <button
          className='flex items-center gap-2'
          onClick={() => {
            eraseCookie("login")
            router.push("/")
          }}
        >
          <FaArrowRightToBracket /> <span>Cerrar Sesión</span>
        </button>
      </nav>
      {
        router.pathname !== "/productos" &&
        <div className="Header__default">
          <span></span>
          <span>Bienvenido <strong className="text-cyan-600">{nombre.split(" ")[0]}</strong></span>
        </div>
      }
    </header >
  )
}

export default Header