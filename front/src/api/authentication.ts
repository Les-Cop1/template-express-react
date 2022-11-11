import { IUser, ResponseType } from '@types'

import axios from 'axios'

export type AuthResponseType = {
  user: IUser
  token: string
}

export const isLoggedIn = async (): Promise<ResponseType<AuthResponseType>> => {
  try {
    const response = await axios.get('/authenticate')

    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const login = async (username: string, password: string): Promise<ResponseType<AuthResponseType>> => {
  try {
    const response = await axios.post('/authenticate', { username, password })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const logout = async (): Promise<ResponseType> => {
  try {
    const response = await axios.delete('/authenticate')

    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
