import React, { useState, useEffect, useContext } from 'react'
import BillItem from '@/components/pages/factura/BillItem'
import Header from '@/components/widgets/Header/Header'
import CartContext from '@/context/CartContext'
import BillsContext from '@/context/BillsContext'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'

const EmployeeID = () => {

  const [renderPage, credentials] = useAuth({})
  
  const { findBill } = useContext(BillsContext)
  const [bill, setBill] = useState<Bill | undefined>()

  const [notFound, setNotFound] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    (async () => {

      const { ficha } = router.query

      if (ficha && typeof ficha !== "object") {
        const bill = findBill(parseInt(ficha))

        if (bill) {
          setBill(bill)
        } else {
          setNotFound(true)
        }
      }

    })()
  }, [router])

  return (
    renderPage &&
    <div className="Layout">
      <Header />
      <main className="Bill xl:px-60">
        <section>
          {
            bill &&
            <>
              <h1 className="text-4xl font-bold mb-10">Modificar Pedido</h1>
              <BillItem modify bill={bill} />
            </>
          }
          {
            notFound &&
            <div className="flex items-center flex-col gap-12 py-28">
              <div>
                <img width={300} src="/images/not-found.jpg" alt="" />
              </div>
              <h2 className="text-2xl font-semibold">No se ha encontrado la ficha que estás buscando</h2>
            </div>
          }
        </section>
      </main>
    </div >
  )
}

export default EmployeeID