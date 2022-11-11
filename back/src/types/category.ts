import { Document } from 'mongoose'

export interface ICategory extends Document {
  en: string
  fr: string
}
