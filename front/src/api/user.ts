import { IUser, ResponseType } from '@types'

import axios from 'axios'

export type UserResponseType = {
  user: IUser
  token: string
}

export const createUser = async (
  username: string,
  password: string,
  confirmation: string,
): Promise<ResponseType<UserResponseType>> => {
  try {
    const response = await axios.post('/user', { username, password, confirmation })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const updateUser = async (
  user: IUser,
  username: string,
  oldpassword: string,
  password: string,
  confirmation: string,
): Promise<ResponseType<UserResponseType>> => {
  try {
    const response = await axios.put(`/user/${user._id}`, {
      username,
      oldpassword,
      password,
      confirmation,
    })

    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
