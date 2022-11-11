import { ICreateFileInput, IFile, IRoom, IUser } from '@types'

import { Document } from 'mongoose'

export interface IItem extends Document {
  brand: string
  model?: string
  user: IUser['_id']
  room: IRoom['_id']
  price?: number
  purchaseDate?: Date
  description?: string
  link?: string
  categories?: string[]
  image?: IFile['_id']
  invoice?: IFile['_id']
}

export interface ICreateItemInput extends Document {
  brand?: string
  model?: string
  user?: IUser['_id']
  room?: IRoom['_id']
  price?: number
  purchaseDate?: string
  description?: string
  link?: string
  categories?: string
  image?: IFile['_id']
  invoice?: IFile['_id']
}

export interface IUpdateItemInput extends Document {
  brand?: string
  model?: string
  user?: IUser['_id']
  room?: IRoom['_id']
  price?: number
  purchaseDate?: string
  description?: string
  link?: string
  categories?: string
  image?: { _id: IFile['_id']; name: IFile['name'] }
  invoice?: { _id: IFile['_id']; name: IFile['name'] }
}

export interface IUploadFile {
  invoice?: ICreateFileInput[]
  image?: ICreateFileInput[]
}
