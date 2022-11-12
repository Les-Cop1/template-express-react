import { IUser } from '@types'

import mongoose, { Schema } from 'mongoose'

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permission: { type: Number, required: true },
})

UserSchema.set('timestamps', true)

export const UserModel = mongoose.model<IUser>('User', UserSchema)
