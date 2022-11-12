import { Express as ExpressType, Request } from 'express'

import { IUser } from '@types'

import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseType<Type = any> = {
  success: boolean
  error?: string
  data?: Type
}

export interface AuthenticatedRequest extends Request {
  user?: IUser
}

export interface Express extends ExpressType {
  isDbConnected?: boolean
}

export const ObjectId = mongoose.Types.ObjectId
