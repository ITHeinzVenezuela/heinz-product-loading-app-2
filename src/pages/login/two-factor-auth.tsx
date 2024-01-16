import React, { FormEventHandler, useEffect, useState } from 'react'
import Link from 'next/link'
import Form from '@/components/widgets/Form'
import Button from '@/components/widgets/Button'
import Warning from '@/components/icons/Warning'
import useNotification from '@/hooks/useNotification'
import OTPInput from '@/components/pages/login/OTPInput'
import { useRouter } from 'next/router'
import { getFromSStorage, saveToSStorage } from '@/utils/sessionStorage'
import NotificationModal from '@/components/widgets/NotificationModal'
import AuthService from '@/services/auth'
import { setCookie } from '@/utils/cookies'
import UserService from '@/services/users'

const service = new AuthService()
const userService = new UserService()

const QRCode = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [renderPage, setRenderPage] = useState<boolean>(false)
  const [loginByPassword, setLoginByPassword] = useState<boolean>(false)

  const [scannedCode, setScannedCode] = useState<boolean>(false)
  const [alreadySet2FA, setAlreadySet2FA] = useState<boolean>(false)

  const [auth, setAuth] = useState({
    qrcode: "",
    code: "",
  })

  const [credentials, setCredentials] = useState<AuthCredentials>()
  const [OTPCode, setOTPCode] = useState<string>("")

  const [modal, handleModal] = useNotification()

  useEffect(() => {
    (async () => {
      try {

        const credentials = getFromSStorage<AuthCredentials>("temp-login")
        const loginByPassword = getFromSStorage<boolean>("login-by-password")

        setLoginByPassword(Boolean(loginByPassword))

        if (credentials) {
          const { user, token } = credentials

          if (!user.two_factor_auth) {

            const auth = await service.getAuthQRCode(user.email, token)
            setAuth(auth)

          } else {
            setScannedCode(true)
            setAlreadySet2FA(true)
          }

          setCredentials(credentials)
          setRenderPage(true)

        } else {
          router.push("/")
        }

      } catch (error) {
        console.log(error)
        handleModal.open({
          type: "danger",
          title: "Error",
          message: "Ha habido un error con el inicio de sesión, se le redirijirá al login para que lo intente de nuevamente",
        })
      }
    })()
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    if (credentials) {
      try {
        setLoading(true)

        const { user, token } = credentials

        const secret = alreadySet2FA ? user.two_factor_auth : auth.code

        const verified = await service.verifyAuthOTP({
          secret,
          OTPCode,
        })

        if (verified) {
          try {

            const updatedUser: User = {
              ...user,
              password_login_available: user.is_admin,
              two_factor_auth: secret,
            }

            // await userService.updateUser(updatedUser, token)
            await userService.updateUser(updatedUser)

            sessionStorage.removeItem("temp-login")

            setCookie("login", credentials, 1)

          } catch (error) {
            setLoading(false)
            alert("No se pudo guardar su doble factor de autenticación, al iniciar se sesión de nuevo deberá volver a configurarlo")
          }

          handleModal.open({
            type: "success",
            title: "Inicio de Sesión exitoso ✅",
            message: "En un momento serás redirigido al inventario de productos",
          })

          setTimeout(() => router.push("/productos"), 4000);

        } else {

          handleModal.open({
            type: "danger",
            title: "Error de Autenticación",
            message: "Verifica si el código que proporcionaste es el correcto",
          })
        }

      } catch (error) {
        setLoading(false)

        handleModal.open({
          type: "danger",
          title: "Error",
          message: "Ha habido un error intentado validar el código, intelo de nuevo",
        })

      }
    }
  }

  return (
    <main className="Set2FA">

      {
        renderPage &&
        <>
          {
            !scannedCode &&
            <>
              <div className="title">
                <h1>Configurá el autenticador</h1>
                <ol className="list-decimal pl-8">
                  <li>En la app del Autenticador, presioná el ícono +</li>
                  <li>Elegí la opción Escanear código QR; y escaneá la siguiente imagen:</li>
                </ol>
              </div>

              {/* QR CODE is displayed here */}
              <div
                className="p-4 rounded-2xl justify-self-center"
                style={{ boxShadow: "0px 4px 8px 0px rgba(171, 190, 209, 0.40)" }}
              >
                <img src={auth.qrcode} alt="" />
              </div>

              <div className="flex justify-end gap-10 items-center mt-24">
                <Link href="/" className="font-semibold">
                  Cancelar
                </Link>
                <Button color="secondary" className="font-semibold !px-10" onClick={() => setScannedCode(true)}>
                  Siguiente
                </Button>
              </div>
            </>
          }

          {
            scannedCode &&
            <Form onSubmit={handleSubmit}>
              <div className="title">
                <h1>{alreadySet2FA ? "Revisa" : "Configura"} el autenticador</h1>
                <p>Ingresá el código de 6 dígitos que ves en la app</p>
              </div>
              <OTPInput
                // invalid
                setOTPCode={setOTPCode}
                onInvalid={() =>
                  <span className="invalid-message !flex">
                    <Warning /> Revisá el código e intentalo nuevamente
                  </span>
                }
              />
              <div className="flex justify-end gap-10 items-center mt-32">
                {
                  loginByPassword &&
                  <button type="button" className="mr-8 font-semibold" onClick={async () => {
                    if (alreadySet2FA && credentials) {

                      const { user, token } = credentials

                      const auth = await service.getAuthQRCode(user.email, token)
                      setAuth(auth)

                      setAlreadySet2FA(false)
                      setScannedCode(false)

                    } else {
                      setScannedCode(false)
                    }
                  }}
                  >
                    {
                      alreadySet2FA ? 'Reestablecer "2FA"' : "Volver"
                    }
                  </button>
                }
                <Button color="secondary" className="font-bold" type="submit" disabled={loading} loading={loading}>
                  Verificar código
                </Button>
              </div>
            </Form>
          }
        </>
      }

      <NotificationModal alertProps={[modal, handleModal]} />
    </main >
  )
}

export default QRCode
// Set2FA