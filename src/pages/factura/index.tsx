import BillItem from '@/components/pages/factura/BillItem'
import Header from '@/components/widgets/Header/Header'
import CartContext from '@/context/CartContext'
import formatMoney, { getTotalBoxesFromProducts, getTotalFromProducts, parseDecimals } from '@/utils/formatMoney'
import React, { useContext, useEffect, useState } from 'react'
import BillsContext from '@/context/BillsContext'
import { useRouter } from 'next/router'
import { BulletinsFormat } from '@/utils/getQueries'
import useNotification from '@/hooks/useNotification'
import ConfirmModal from '@/components/widgets/ConfirmModal'
import Button from '@/components/widgets/Button'
import { sendBulletin } from '@/services/boletin'
import { saveToSStorage } from '@/utils/sessionStorage'
import NotificationModal from '@/components/widgets/NotificationModal'
import useAuth from '@/hooks/useAuth'

const Billing = () => {

  const router = useRouter()
  const [renderPage, credentials] = useAuth({})
  
  const { cart, selectedEmployees, purchase } = useContext(CartContext)
  const { bills, setBills } = useContext(BillsContext)

  const [loading, setLoading] = useState<boolean>(false)

  const [notification, handleNotification] = useNotification()
  const [alert, handleAlert] = useNotification()

  useEffect(() => {
    (async () => {

      if (!bills.length) {
        router.push("/productos")
      }

    })()
  }, [])


  const getTotalFromBills = () => {
    const total = bills.reduce((accumulator, { products }) => {
      const totalOrder = getTotalFromProducts(products)
      return accumulator + totalOrder;
    }, 0)
    return total;
  }

  const getTotalBoxesFromBills = () => {
    const totalBoxes = bills.reduce((accumulator, { products }) => {
      const boxes = getTotalBoxesFromProducts(products)
      return accumulator + boxes;
    }, 0)
    return totalBoxes;
  }

  const totalOrders = getTotalFromBills()
  const totalBoxes = getTotalBoxesFromBills()

  const handleConfirm = async () => {
    try {
      setLoading(true)

      const bulletins: BulletinsFormat = bills.map((bill) => {

        const { purchase, employee, products } = bill

        const headers = products.map(({ sku, name, price, quantity, details }): BulletinHeader => {
          const { IBITM, UMCONV, IMSRP1, IMSRP2, IMSRP3, IMSRP4 } = details
          return {
            ODEDOC: bill.number,
            ODEDCT: "BV",
            ODMCU: "        VE03", // Almacén
            ODEKCO: "07200",
            ODAN8: employee.ficha,
            ODITM: IBITM,
            ODLITM: sku,
            ODDSC1: name,
            ODSRP1: IMSRP1, // Codigos de categoria y línea de producto
            ODSRP2: IMSRP2, // Codigos de categoria y línea de producto
            ODSRP3: IMSRP3, // Codigos de categoria y línea de producto
            ODSRP4: IMSRP4, // Codigos de categoria y línea de producto
            ODPRGR: IMSRP1, // Codigos de categoria y línea de producto
            ODAC03: employee.zone,
            ODZON: "",   // Valor siempre vacío
            ODSOQS: quantity,
            ODUPRC: price,
            ODFVTR: 0.0000, // Tipo de conversión (valor fijo)
            ODAMXT: parseDecimals(price * quantity),
            ODCONV: UMCONV, // Factor de conversión
            ODASN: " ",  // Valor con un ESPACIO EN BLANCO (NO CAMBIAR ❌)
            ODNXTR: "010", // Estado (010 = Por Concretar | 020 = Concretado | 999 = No concretado )
            ODLTTR: "000", // Estado (000 = Por Concretar | 010 = Concretado | 999 = No concretado )
            ODUSER: "MLUCENA",   // ⬜ Usuario ("CXK8279" | "MLUCENA")
            ODJOBN: purchase.id, // ID de el Boletín
            ODTMST: purchase.date,
          }
        })

        const info: BulletinInfo = {
          WOEDOC: bill.number,
          WOEDCT: "BV",          // Tipo de documento
          WOMCU: "        VE03", // Almacén "❌ NO QUITARLE EL ESPACIO QUE LE SOBRE AL STRING ❌"
          WOEKCO: "07200",       // Código de la compáñia heinz
          WOAN8: employee.ficha,
          WOALPH: employee.name,
          WOASN: "VTASUBCL",     // Ventas sub clasificadas
          WOCPGP: "", // Valor siempre vacío
          WOADD1: employee.address.slice(0, 40), //Este campo en la BD tiene maximo 40 caracteres
          WOAC03: employee.zone,
          WOAC05: employee.clientType,
          WOZON: "",  // Valor siempre vacío
          WOVR01: purchase.order,
          WODEL1: purchase.details,
          WOTRDJ: purchase.date,
          WODRQJ: purchase.date,  // Otra Fecha 🟨
          WOURDT: purchase.date,  // Fecha igual a WOTRDJ
          WOAAT1: "Z1",
          WOTMSTP: purchase.date, // Fecha igual a WOTRDJ pero con tiempo espec�fico de la creaci�n
          WOUSER: "MLUCENA",   // ⬜ Usuario ("CXK8279" | "MLUCENA")
          WOJOBN: purchase.id, // ID de Boletin 
        }

        return { headers, info }
      })

      debugger
      
      const data = await sendBulletin(bulletins)
      console.log('data', data)

      handleAlert.open({
        type: "success",
        title: "Creación de Boletín",
        message: "Se ha generado el boletín con éxito ✅"
      })

      setTimeout(() => {
        saveToSStorage<boolean>("bills-confirmation", true)
        router.push("/factura/success")
      }, 5000);

    } catch (error) {
      setLoading(false)
      handleAlert.open({
        type: "danger",
        title: "Error",
        message: "Ha habido un error enviando creando el pedido ❌"
      })
    }
  }

  const handleOpenModal = () => {
    handleNotification.open({
      type: "warning",
      title: "Advertencia",
      message: "¿Estás seguro de que quieres confirmar el pedido?"
    })
  }

  return (
    renderPage &&
    <>
      {
        Boolean(bills.length) &&
        <div className="Layout">
          <Header />
          <main className="Bill xl:px-60">
            <section className="header">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold">Confirmar Pedido</h1>
                <Button onClick={handleOpenModal} className="bg-secondary !py-2 font-bold hover:bg-emerald-500" loading={loading}>
                  Confirmar
                </Button>
              </div>
              <ul className="">
                <li><span>Total número de ordenes:</span> {bills.length}</li>
                <li><span>Total cantidad de cajas:</span> {totalBoxes}</li>
                <li><span>Total monto de ordenes:</span> {formatMoney(totalOrders)}</li>
              </ul>
            </section>
            <section>
              {
                bills.map((bill) =>
                  <BillItem bill={bill} key={bill.employee.ficha} />
                )
              }
            </section>
          </main>
        </div >
      }
      <ConfirmModal
        acceptAction={handleConfirm}
        notificationProps={[notification, handleNotification]}
      />
      <NotificationModal alertProps={[alert, handleAlert ]} />
    </>
  )
}

export default Billing