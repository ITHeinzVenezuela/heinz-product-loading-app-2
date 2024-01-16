import { initializedUser } from "@/pages/usuarios"
import { getCookie } from "@/utils/cookies"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


type Params = { is_admin_route?: boolean }

const useAuth = ({ is_admin_route = false }: Params): [boolean, AuthCredentials] => {

  const router = useRouter()

  const [renderPage, setRenderPage] = useState<boolean>(false)
  const [credentials, setCredentials] = useState<AuthCredentials>({
    user: initializedUser,
    token: "",
  })

  useEffect(() => {
    const credentials = getCookie<AuthCredentials>("login")
    if (credentials) {
      debugger
      const { user } = credentials

      if (user.is_admin) {

        setCredentials(credentials)
        setRenderPage(true)

      } else if (!is_admin_route) {

        setCredentials(credentials)
        setRenderPage(true)

      } else {
        router.push("/productos")
      }

    } else {
      router.push("/")
    }
  }, [])

  return [renderPage, credentials];
}

export default useAuth;