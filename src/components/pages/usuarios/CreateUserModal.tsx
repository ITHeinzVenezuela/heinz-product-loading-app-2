import Button from '@/components/widgets/Button'
import ConfirmModal from '@/components/widgets/ConfirmModal'
import Input from '@/components/widgets/Input'
import Modal from '@/components/widgets/Modal'
import useNotification from '@/hooks/useNotification'
import UserService from '@/services/users'
import parseUserToDB from '@/utils/api/parseUserToDB'
import { getSQLValue } from '@/utils/getQueries'
import React, { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useState } from 'react'

export type UserModalInfo = {
  create: boolean;
  user: User,
}

type Props = {
  showModal: boolean,
  setModal: Dispatch<SetStateAction<boolean>>,
  userModalInfo: UserModalInfo,
  setUserModalInfo: Dispatch<SetStateAction<UserModalInfo>>
  users: User[],
  setUsers: Dispatch<SetStateAction<User[]>>
}

const service = new UserService()

const CreateUserModal = ({ showModal, userModalInfo, users, setModal, setUserModalInfo, setUsers }: Props) => {

  const { user, create } = userModalInfo
  const [alert, handleAlert] = useNotification()

  const [loading, setLoading] = useState(false)
  
  const handleSave = async () => {
    try {
      setLoading(true)
      
      if(create){
       
        await service.createUser(user)
        setUsers([...users, user])
        
      }else{
        
        await service.updateUser(user)
        
        const updatedUsers = users.map((item) => (user.id === item.id) ? user : item)
        setUsers(updatedUsers)
      }

      setModal(false)
      
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value, checked } = target
    const IS_BOOLEAN = (name === "is_admin") || (name === "password_login_available")
    setUserModalInfo({
      create,
      user: {
        ...user,
        [name]: IS_BOOLEAN ? checked : value,
      }
    })
  }

  return (
    <Modal {...{ setModal, showModal }}>
      <h2 className="font-semibold text-xl pb-8">Nuevo Usuario</h2>

      <div className="grid grid-cols-2 gap-x-8">
        <Input
          title="Nombre"
          id="nombre"
          type="text"
          onChange={handleChange}
          className="pb-8"
          placeholder="Henry John Heinz"
          value={user.nombre}
          autoComplete="off"
        />
        <Input
          title="Ficha"
          id="ficha"
          type="text"
          onChange={handleChange}
          className="pb-8"
          placeholder="00001"
          value={user.ficha}
          autoComplete="off"
        />
        <Input
          title="Email"
          id="email"
          type="email"
          onChange={handleChange}
          className="pb-8"
          placeholder="henry.heinz@kraftheinz.com"
          value={user.email}
          autoComplete="off"
        />
        <Input
          title="Contraseña"
          id="password"
          type="password"
          onChange={handleChange}
          className="pb-8"
          placeholder="******"
          value={user.password}
          autoComplete="off"
        />
        <label className="col-start-1 flex gap-4 justify-self-end" htmlFor="password_login_available">
          <span>Inicio de Sesión con contraseña</span>
          <input
            type="checkbox"
            id="password_login_available"
            name="password_login_available"
            tabIndex={-1}
            checked={user.password_login_available}
            onChange={handleChange}
          />
        </label>
        <label className="col-start-2 flex gap-4 justify-self-end" htmlFor="is_admin">
          <span>Usuario administrador</span>
          <input
            type="checkbox"
            id="is_admin"
            name="is_admin"
            tabIndex={-1}
            checked={user.is_admin}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          loading={loading}
          color="success"
          className="!py-2"
          onClick={() => {
            handleAlert.open({
              type: "warning",
              title: "Advertencia",
              message: `¿Estás seguro de que quieres ${create ? "crear" : "modificar"} este usuario?`
            })
          }}
        >
          Guardar
        </Button>
      </div>

      <ConfirmModal
        acceptAction={handleSave}
        notificationProps={[alert, handleAlert]}
      />

    </Modal>
  )
}

export default CreateUserModal