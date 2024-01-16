import React, { useState, Dispatch, SetStateAction } from 'react'
import { RiEditFill, RiSave3Fill, RiLockPasswordFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import useNotification from '@/hooks/useNotification'
import ConfirmModal from '@/components/widgets/ConfirmModal'
import ChangePassword from './ChangePassword'
import { UserModalInfo } from '@/components/pages/usuarios/CreateUserModal'
import UserService from '@/services/users'

interface Props {
  user: User,
  setUserModal: Dispatch<SetStateAction<boolean>>,
  setUserModalInfo: Dispatch<SetStateAction<UserModalInfo>>,
  users: User[],
  setUsers: Dispatch<SetStateAction<User[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
}

const service = new UserService()

const UserRow = ({ user, users, setUsers, setLoading, setUserModal, setUserModalInfo }: Props) => {

  const { nombre, email, ficha, two_factor_auth, is_admin } = user

  const [deleteModal, handleDeleteModal] = useNotification()

  const handleDelete = async () => {
    try {
      setLoading(true)
      
      await service.deleteUser(user.id)
      setUsers(users.filter(({ id }) => id !== user.id))
      
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <tr>
      <th className="text-start">{ficha}</th>
      <th className="text-start">
        {nombre}
      </th>
      <th className="text-start">
        {email}
      </th>
      <th>
        <input
          type="checkbox"
          tabIndex={-1}
          checked={Boolean(two_factor_auth)}
          name="2fa"
          onChange={() => { }}
        />
      </th>
      <th>
        <input
          type="checkbox"
          tabIndex={-1}
          checked={Boolean(is_admin)}
          name="admin"
          onClick={() => { }}
        />
      </th>
      <th>
        <div className="flex justify-end gap-8">
          <button
            onClick={() => {
              setUserModal(true)
              setUserModalInfo({
                create: false,
                user: {
                  ...user,
                  password: "",
                },
              })
            }}
          >
            <RiEditFill className="hover:fill-sky-500" size={20} title="Editar" />
          </button>

          <button
            onClick={() => {
              handleDeleteModal.open({
                type: "warning",
                title: "Advertencia",
                message: "¿Estás seguro de eliminar el usuario?"
              })
            }}
          >
            <FaTrash className="hover:fill-sky-500" size={18} title="Eliminar Usuario" />
          </button>
        </div>
      </th>

      <ConfirmModal
        acceptAction={handleDelete}
        notificationProps={[deleteModal, handleDeleteModal]}
      />

    </tr>
  )
}

export default UserRow