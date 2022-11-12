import React from 'react'

import { AuthResponseType, UserResponseType } from '@api'

import { ResponseType } from './global'

export type AuthenticationStateType = {
  authenticated: boolean
  user: any
}

export type AuthenticationContextType = AuthenticationStateType & {
  login: (email: string, password: string) => Promise<ResponseType<AuthResponseType>> | void
  register: (email: string, password: string, confirmation: string) => Promise<ResponseType<UserResponseType>> | void
  logout: () => void
}

export type AuthenticationProviderProps = {
  children: React.ReactNode
}
