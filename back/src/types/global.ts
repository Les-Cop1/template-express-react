import { Express as ExpressType, Request } from 'express'

import { IUser } from '@types'

import mongoose from 'mongoose'

export type ResponseType = {
  success: boolean
  error?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

export interface AuthenticatedRequest extends Request {
  user?: IUser
}

export interface Express extends ExpressType {
  isDbConnected?: boolean
}

export const ObjectId = mongoose.Types.ObjectId
