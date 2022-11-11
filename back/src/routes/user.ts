import express, { Request, Response } from 'express'

import { createUser, deleteUser, getUsers, updateUser } from '@controllers'
import { authenticated } from '@helpers'
import { AuthenticatedRequest, ICreateUserInput, IGetUserInput, IUpdateUserInput, IUser, ResponseType } from '@types'

const router = express.Router()

router.get('/', authenticated, async (req: AuthenticatedRequest, res: Response) => {
  let response: ResponseType = {
    success: true,
  }
  try {
    response = { ...response, ...(await getUsers(<IGetUserInput>req.query, <IUser>req.user)) }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    response = { ...response, success: false, error: error.message }
  }

  res.send(response)
})

router.post('/', async (req: Request, res: Response) => {
  let response: ResponseType = {
    success: true,
  }

  const useSecureAuth = process.env.NODE_ENV !== 'development'

  try {
    response = { ...response, ...(await createUser(<ICreateUserInput>req.body)) }

    res.cookie('auth-token', response.data.token, {
      maxAge: 31 * 24 * 3600 * 1000 * parseInt(process.env.JWT_EXPIRES_IN || '1'), // in months
      httpOnly: useSecureAuth,
      secure: useSecureAuth,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    response = { ...response, success: false, error: error.message }
  }

  res.send(response)
})

router.put('/:_id', authenticated, async (req: AuthenticatedRequest, res: Response) => {
  let response: ResponseType = {
    success: true,
  }

  const useSecureAuth = process.env.NODE_ENV !== 'development'

  try {
    response = {
      ...response,
      ...(await updateUser(<IUser['_id']>req.params._id, <IUpdateUserInput>req.body, <IUser>req.user)),
    }

    res.cookie('auth-token', response.data.token, {
      maxAge: 31 * 24 * 3600 * 1000 * parseInt(process.env.JWT_EXPIRES_IN || '1'), // in months
      httpOnly: useSecureAuth,
      secure: useSecureAuth,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    response = { ...response, success: false, error: error.message }
  }

  res.send(response)
})

router.delete('/:_id', authenticated, async (req: AuthenticatedRequest, res: Response) => {
  let response: ResponseType = {
    success: true,
  }

  try {
    response = { ...response, ...(await deleteUser(<IUser['_id']>req.params._id, <IUser>req.user)) }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    response = { ...response, success: false, error: error.message }
  }

  res.send(response)
})

export { router as userRouter }
