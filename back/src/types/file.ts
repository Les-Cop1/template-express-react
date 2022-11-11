import { IUser } from '@types'

import { Document } from 'mongoose'

export interface IFile extends Document {
  name: string
  mimetype: string
  data: string
  filename: string
  user: IUser['_id']
}

export interface ICreateFileInput {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}
