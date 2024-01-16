import React, { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react'
import Input from '@/components/widgets/Input'
import Button from '@/components/widgets/Button'
import Form from '@/components/widgets/Form'
import useNotification from '@/hooks/useNotification'
import NotificationModal from '@/components/widgets/NotificationModal'
import AuthService from '@/services/auth'
import { saveToSStorage } from '@/utils/sessionStorage'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
// import LoginButtonTry from '@/components/LoginButtonTry'
import LoginButton from '@/components/LoginButton'

const auth = new AuthService()

const LogIn = (): JSX.Element => {

  const [loading, setLoading] = useState<boolean>(false)

  const [enabledPassword, setEnabledPassword] = useState<boolean>(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [modal, handleModal] = useNotification()

  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {

      const credentials = await auth.login(enabledPassword ? user : { email: user.email })
      saveToSStorage<AuthCredentials>("temp-login", credentials)

      if(enabledPassword) saveToSStorage<boolean>("login-by-password", true)
      
      router.push("/login/two-factor-auth")

    } catch (error) {
      setLoading(false)
      console.error(error)

      let message = "Ha habido un error intentando loguearse"

      if (error instanceof AxiosError) {
        message = error.response?.data?.message
      }

      handleModal.open({
        type: "danger",
        title: "Error",
        message,
      })
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setUser({
      ...user, [name]: value
    })
  }

  return (
    <main className="LogIn">
      {/* <img src="https://i.imgur.com/hkIgVIM.png" alt="" /> */}
      <img src="https://i.imgur.com/yoGBPON.png" alt="" />

      <Form onSubmit={handleSubmit}>

        <h1>Inicio de Sesión</h1>
        <p>Carga de Productos VEMP</p>
        {/* <p>Carga de Información de Pedidos Comunicados Heinz</p> */}

        <div className="mt-8 grid gap-10">
          <Input
            title="Usuario"
            id="email"
            type="email"
            onChange={handleChange}
            placeholder="user@kraftheinz.com"
            value={user.email}
          />
          {
            enabledPassword &&
            <Input
              title="Contraseña"
              id="password"
              type="password"
              onChange={handleChange}
              placeholder="Your Password"
              value={user.password}
            />
          }

          <Button loading={loading} type="submit" color="secondary">
            Iniciar sesión
          </Button>

          <button
            type="button"
            className="text-secondary text-sm"
            onClick={() => {
              setEnabledPassword(!enabledPassword)
            }}
          >
            {enabledPassword ? "Login sin contraseña" : "Login con contraseña"}
          </button>
        </div>
      </Form>

      <LoginButton/>

      <NotificationModal alertProps={[modal, handleModal]} />
    </main>
  )
}

export default LogIn