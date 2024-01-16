import React from 'react'
import Header from '@/components/widgets/Header/Header'
import MassivelyActivate from '@/components/pages/activar-ficha/MassivelyActivate'
import SingleActivate from '@/components/pages/activar-ficha/SingleActivate'
import NotificationModal from '@/components/widgets/NotificationModal'
import useNotification from '@/hooks/useNotification'
import useAuth from '@/hooks/useAuth'

const ActivateEmployeesID = () => {

  const [renderPage, credentials] = useAuth({})
  const [notification, handleNotification] = useNotification()

  const props = { handleNotification }
  
  return (
    renderPage &&
    <>
      <div className="SelectEmployees Layout">
        <Header />
        <main className="pt-10 xl:px-80">
          <section className="">

            <SingleActivate {...props} />
            <MassivelyActivate {...props} />

          </section>
        </main>
      </div>
      <NotificationModal alertProps={[notification, handleNotification]}/>
    </>
  )
}

export default ActivateEmployeesID