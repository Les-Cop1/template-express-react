import { NextFunction, Response } from 'express'

import { AuthenticatedRequest, IUser } from '@types'

import jwt from 'jsonwebtoken'

export const authenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token = req.cookies['auth-token']

  if (!token) {
    token = req.headers['bearer']

    if (token === undefined) {
      return res.status(401).send({ success: false, error: 'Access denied' })
    }
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || '') as IUser

    next()
  } catch (err) {
    return res.status(400).send({ success: false, error: 'Invalid token' })
  }
}
