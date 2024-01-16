import React, { useState } from 'react'
import Header from '@/components/widgets/Header/Header'
import Switch from '@/components/widgets/Switch'
import Spinner from '@/components/widgets/Spinner'
import NotificationModal from '@/components/widgets/NotificationModal'
import useNotification from '@/hooks/useNotification'
import MyOrdersTable from '@/components/pages/mis-ordenes/MyOrdersTable'
import MyOrdersForm from '@/components/pages/mis-ordenes/MyOrdersForm'
import BulletinDetailsModal from '@/components/pages/mis-ordenes/BulletinDetailsModal'
import { BulletinHeader } from '../api/boletin/info'
import useAuth from '@/hooks/useAuth'

export enum OPTIONS {
  DATE = 1,
  BOLETIN_NUMBER = 2,
}

export type Dates = {
  dateFrom: string;
  dateTo: string;
}

const { DATE, BOLETIN_NUMBER } = OPTIONS

const MyOrders = () => {
  
  const [renderPage, credentials] = useAuth({})

  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setModal] = useState<boolean>(false)

  const [option, setOption] = useState<OPTIONS>(1)

  const [bulletins, setBulletins] = useState<Bulletin[]>([])
  const [bulletinDetails, setBulletinDetails] = useState<BulletinHeader[]>([])

  const [notification, handleNotification] = useNotification()

  return (
    renderPage &&
    <div className="SelectEmployees Layout MyOrders">
      <Header />
      <main className="pt-10 xl:px-60">

        <div className="pb-8">
          <h1 className="MyOrders__title">Mis Ordenes</h1>
          <Switch
            id="search2"
            label="Fecha / N° Boletín"
            onChange={({ target }) => {
              setOption(target.checked ? BOLETIN_NUMBER : DATE)
            }}
          />
        </div>

        <section>
          <MyOrdersForm
            {...{
              option,
              handleNotification,
              setLoading,
              setBulletins
            }}
          />
          {
            loading ?
              <div className="py-20">
                <Spinner size="normal" />
              </div>
              :
              <MyOrdersTable
                {...{
                  setModal,
                  bulletins,
                  handleNotification,
                  setBulletinDetails,
                }}
              />
          }
        </section>
      </main>

      <NotificationModal alertProps={[notification, handleNotification]} />
      <BulletinDetailsModal {...{ setModal, showModal, bulletinDetails }} />

    </div>
  )
}

export default MyOrders