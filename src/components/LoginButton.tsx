import { PublicClientApplication } from '@azure/msal-browser'
import React, { useState } from 'react'

const config = {
  appId: "aaaabb00-c340-4430-b100-97ae3f7f848c",
  redirectUri: "http://localhost:5555",
  scopes: [
    "user.read"
  ],
  // authority: "https://login.microsoftonline.com/achrafchad.onmicrosoft.com",
  authority: "https://login.microsoftonline.com/common/",
}

const { appId: clientId, redirectUri, authority, scopes } = config

const publicClientApplication = new PublicClientApplication({
  auth: {
    clientId,
    redirectUri,
    authority,
  },
  cache: {
    claimsBasedCachingEnabled: true,
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
})

const LoginButton = () => {

  const [state, setState] = useState<any>({
    error: null,
    isAuthenticated: false,
    user: {}
  })

  const login = async () => {
    try {
      await publicClientApplication.initialize();
      const data = await publicClientApplication.loginPopup({
        scopes,
        prompt: "select_account"
      })
      console.log('data', data)
      setState({ ...state, isAuthenticated: true })
    } catch (error) {
      console.error(error)
      setState({
        isAuthenticated: false,
        user: {},
        error,
      })
    }
  }

  return (
    <button onClick={login} className="bg-green-500 text-white">
      Iniciar Sesión
    </button>
  )
}

export default LoginButton