import Button from '@/components/widgets/Button';
import ConfirmModal from '@/components/widgets/ConfirmModal';
import Input from '@/components/widgets/Input';
import Modal from '@/components/widgets/Modal';
import useNotification from '@/hooks/useNotification';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  showModal: boolean,
  setModal: Dispatch<SetStateAction<boolean>>,
}

const ChangePassword = ({ showModal, setModal }: Props) => {

  const [notification, handleNotification] = useNotification()
  const handleSavePassword = () => {

  }

  return (
    <Modal {...{ showModal, setModal }}>
      <form action="" onSubmit={() => { }}>
        <h2 className="font-semibold text-xl pb-8">Cambiar contraseña</h2>
        <Input
          // title="Usuario"
          id="password"
          type="password"
          onChange={() => { }}
          className="pb-8"
          placeholder="******"
          value=""
        />
        <div className="flex justify-end">
          <Button
            color="success"
            className="!py-2"
            onClick={() => {
              handleNotification.open({
                type: "warning",
                title: "Advertencia",
                message: "¿Estás seguro que quieres cambiar la contraseña?"
              })
            }}
          >
            Guardar
          </Button>
        </div>
      </form>
      <ConfirmModal
        acceptAction={handleSavePassword}
        notificationProps={[notification, handleNotification]}
      />
    </Modal>
  )
}

export default ChangePassword;