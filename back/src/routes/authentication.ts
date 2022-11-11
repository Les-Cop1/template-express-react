import express, { Request, Response } from 'express'

import { authenticated, handleMongoDBErrors } from '@helpers'
import { UserModel } from '@models'
import { AuthenticatedRequest, IUser, ResponseType } from '@types'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

// LoggedIn
router.get('/', authenticated, (req: AuthenticatedRequest, res: Response) => {
  let response: ResponseType = {
    success: true,
  }

  const useSecureAuth = process.env.NODE_ENV !== 'development'

  if (req.cookies['auth-token']) {
    res.cookie('auth-token', req.cookies['auth-token'], {
      maxAge: 31 * 24 * 3600 * 1000, // 1 mois
      httpOnly: useSecureAuth,
      secure: useSecureAuth,
    })
  }

  response = {
    ...response,
    data: { user: { ...req.user, token: req.cookies['auth-token'] } },
  }

  return res.send(response)
})

// Login
router.post('/', async (req: Request, res: Response) => {
  let response: ResponseType = {
    success: true,
  }

  const useSecureAuth = process.env.NODE_ENV !== 'development'

  //Validation des données
  const validation = req.body.username !== undefined && req.body.password !== undefined
  if (!validation) {
    return res.send({
      ...response,
      success: false,
      error: 'Some data is missing',
    })
  }

  try {
    const user = await UserModel.findOne<IUser | null>({ username: req.body.username }).exec()

    // If the user doesn't exist
    if (user === null) {
      response = {
        ...response,
        success: false,
        error: 'Username or password incorrect',
      }
      return res.status(401).send(response)
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
      response = {
        ...response,
        success: false,
        error: 'Username or password incorrect',
      }
      return res.status(401).send(response)
    }

    // Token generation
    const {
      password, // eslint-disable-line no-unused-vars
      ...tokenContent
    } = user.toObject()

    const token = jwt.sign(tokenContent, process.env.JWT_SECRET || '')
    res.cookie('auth-token', token, {
      maxAge: 31 * 24 * 3600 * 1000 * parseInt(process.env.JWT_EXPIRES_IN || '1'), // in months
      httpOnly: useSecureAuth,
      secure: useSecureAuth,
    })

    response = { ...response, data: { user: { ...tokenContent, token } } }
  } catch (error) {
    response = {
      ...response,
      success: false,
      error: handleMongoDBErrors(error),
    }
  }

  return res.send(response)
})

// Logout
router.delete('/', authenticated, (_req: AuthenticatedRequest, res: Response) => {
  let response: ResponseType = {
    success: true,
  }

  res.cookie('auth-token', '', {
    maxAge: -100,
  })

  return res.send(response)
})

export { router as authenticationRouter }
