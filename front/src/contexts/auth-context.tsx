import React, { useEffect, useState } from 'react'

import { isLoggedIn, login as loginApi, logout as logoutApi, createUser as registerApi } from '@api'
import { useQuery } from '@hooks'
import { AuthenticationContextType, AuthenticationProviderProps, AuthenticationStateType } from '@types'

import { useLocation, useNavigate } from 'react-router-dom'

const initState: AuthenticationStateType = {
  authenticated: false,
  user: null,
}

export const AuthenticationContext = React.createContext<AuthenticationContextType>({
  ...initState,
  login: () => {},
  register: () => {},
  logout: () => {},
})

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const query = useQuery()
  const [authState, setAuthState] = useState<AuthenticationStateType>(initState)

  const redirect = () => {
    navigate(query.get('redirect_uri') || '/')
  }

  const login = async (username: string, password: string) => {
    const response = await loginApi(username, password)

    if (response.success) {
      setAuthState({ authenticated: true, user: response.data?.user })
      redirect()
    }

    return response
  }

  const register = async (username: string, password: string, confirmation: string) => {
    const response = await registerApi(username, password, confirmation)

    if (response.success) {
      setAuthState({ authenticated: true, user: response.data?.user })
      redirect()
    }

    return response
  }

  const logout = () => {
    logoutApi().then((response) => {
      if (response.success) {
        setAuthState(initState)
        navigate(`/login`)
      } else {
        console.error(response.error)
      }
    })
  }

  useEffect(() => {
    isLoggedIn().then((response) => {
      if (response.success && response.data?.user) {
        setAuthState({ user: response.data.user, authenticated: response.success })
        if (location.pathname === '/login') {
          redirect()
        }
      } else if (!location.pathname.match(/^(\/|\/login|\/register)$/)) {
        navigate(`/login?redirect_uri=${encodeURI(location.pathname)}`)
      }
    })
  }, [])

  useEffect(() => {
    if (location.pathname === '/logout') {
      logout()
    }
  }, [location])

  return (
    <AuthenticationContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
