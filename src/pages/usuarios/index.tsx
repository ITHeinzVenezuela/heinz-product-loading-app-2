import Header from '@/components/widgets/Header/Header'
import Spinner from '@/components/widgets/Spinner'
import React, { useEffect, useState } from 'react'
import Button from '@/components/widgets/Button'
import UserRow from '@/components/pages/usuarios/UserRow'
import CreateUserModal, { UserModalInfo } from '@/components/pages/usuarios/CreateUserModal'
import UserService from '@/services/users'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'

export const initializedUser = {
  id: 0,
  nombre: "",
  email: "@kraftheinz.com",
  password: "",
  ficha: "",
  two_factor_auth: "",
  is_admin: false,
  password_login_available: false,
}

const service = new UserService()

const Users = () => {

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const [renderPage, credentials] = useAuth({ is_admin_route: true })

  const { is_admin } = credentials.user

  //This is part of CreateUserModal Component
  const [userModal, setUserModal] = useState<boolean>(false)

  //This is part of CreateUserModal Component
  const [userModalInfo, setUserModalInfo] = useState<UserModalInfo>({
    create: true,
    user: initializedUser,
  })

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      setLoading(true)

      const users = await service.getUsers()
      setUsers(users)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  console.log('users', users)

  return (
    renderPage &&
    <div className="Layout">
      <Header />
      <main className="pt-10 xl:px-60">

        {
          loading &&
          <Spinner size="normal" />
        }
        {
          !loading && users.length &&
          <>
            <div className="flex justify-between">
              <h1 className="font-semibold text-xl">Usuarios</h1>
              <Button
                color="secondary"
                className="font-semibold !py-2"
                onClick={() => {
                  setUserModal(true)
                  setUserModalInfo({
                    create: true,
                    user: initializedUser,
                  })
                }}
              >
                Crear Usuario
              </Button>
            </div>
            <div className="overflow-x-scroll pt-10 md:overflow-x-auto">
              <table className="Table UsersTable" style={{ minWidth: "768px" }}>
                <thead>
                  <tr>
                    <th>Ficha</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th className="!text-center">2FA</th>
                    <th className="!text-center">Admin</th>
                    <th className="!text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user) =>
                      <UserRow
                        key={user.ficha}
                        user={user}
                        setUserModal={setUserModal}
                        setUserModalInfo={setUserModalInfo}
                        users={users}
                        setUsers={setUsers}
                        setLoading={setLoading}
                      />
                    )
                  }
                </tbody>
              </table>
            </div>
          </>
        }

      </main >

      <CreateUserModal
        showModal={userModal}
        setModal={setUserModal}
        userModalInfo={userModalInfo}
        setUserModalInfo={setUserModalInfo}
        users={users}
        setUsers={setUsers}
      />

    </div >
  )
}

export default Users;
