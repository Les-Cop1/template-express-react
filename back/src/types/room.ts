import { IUser } from './user'
import { Document } from 'mongoose'

export interface IRoom extends Document {
  name: string
  user: IUser['_id']
}
