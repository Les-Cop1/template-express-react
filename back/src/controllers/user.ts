import { confirmationValidators, handleMongoDBErrors, passwordValidators } from '@helpers'
import { UserModel } from '@models'
import { ICreateUserInput, IGetUserInput, IUpdateUserInput, IUser, ResponseType } from '@types'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUsers = async (query: IGetUserInput, loggedUser: IUser): Promise<ResponseType> => {
  let response: ResponseType = {
    success: true,
  }

  if (loggedUser.permission < 10) {
    query._id = loggedUser._id
  }

  try {
    const tmp = await UserModel.find(query).exec()

    if (tmp !== null) {
      const users = tmp.map((user) => {
        const { ...rest } = user.toObject()

        return rest
      })

      response = { ...response, data: { users } }
    } else {
      response = { ...response, success: false, error: 'User not found' }
    }
  } catch (error: unknown) {
    throw handleMongoDBErrors(error)
  }

  return response
}

export const createUser = async (userData: ICreateUserInput): Promise<ResponseType> => {
  let response: ResponseType = {
    success: true,
  }

  const user = new UserModel({
    username: userData.username,
    password: userData.password,
    permission: 1,
  })

  // Validation des données
  const validations = [
    {
      validator: userData.username !== undefined && userData.password !== undefined,
      message: 'Some data is missing',
    },
    {
      validator: userData.username?.length >= 3,
      message: 'Username must be at least 3 characters long',
    },
    ...passwordValidators(userData.password),
    ...confirmationValidators(userData.password, userData.confirmation),
  ]
  // On vérifie chacun des tests
  for (const validation of validations) {
    if (!validation.validator) {
      throw new Error(validation.message)
    }
  }

  // Hash du mot de passe
  if (response.success) {
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(user.password, salt)
  }

  // Insertion dans la base de donnée
  try {
    const tmp = await user.save()

    const { ...tmpUser } = tmp.toObject()

    const token = jwt.sign(tmpUser, process.env.JWT_SECRET || '')

    response = { ...response, data: { user: tmpUser, token } }
  } catch (error: unknown) {
    throw handleMongoDBErrors(error)
  }

  return response
}

export const updateUser = async (_id: string, userData: IUpdateUserInput, loggedUser: IUser): Promise<ResponseType> => {
  let response: ResponseType = {
    success: true,
  }

  let hashPassword
  const { ...newUserFilter } = userData
  let newUser: IUpdateUserInput = newUserFilter

  if (loggedUser.permission < 10) {
    newUser.permission = userData.permission
  }

  // Verification des authorisation
  if (loggedUser._id !== _id && loggedUser.permission < 10) {
    throw new Error('Unauthorized')
  }

  let oldUser = await UserModel.findOne<IUser | null>({ _id }).exec()
  if (oldUser === null) {
    throw new Error('User not found')
  }
  oldUser = oldUser.toObject()

  if (userData.password && !userData.confirmation) {
    throw new Error('Password confirmation is required')
  }

  if (userData.password && userData.password !== userData.confirmation) {
    throw new Error('Password and confirmation are not the same')
  }

  const validations = []

  if (userData.username) {
    validations.push({
      validator: userData?.username?.length >= 3,
      message: 'Username must be at least 3 characters long',
    })
  }

  // Hash du mot de passe
  if (userData.password) {
    if (!userData.oldpassword) {
      throw new Error('Old password is required')
    }

    const oldPassword = userData.oldpassword || ''

    validations.push(
      ...passwordValidators(userData.password),
      ...confirmationValidators(userData.password, userData.confirmation || ''),
    )

    const { password: oldPasswordDb } = oldUser

    const validPass = await bcrypt.compare(oldPassword, oldPasswordDb)
    if (!validPass) {
      throw new Error('Old password incorrect')
    }

    const salt = await bcrypt.genSalt(10)
    hashPassword = await bcrypt.hash(userData.password, salt)
    newUser = { ...newUser, password: hashPassword }
  }

  for (const validation of validations) {
    if (!validation.validator) {
      throw new Error(validation.message)
    }
  }

  // Insertion dans la base de donnée
  try {
    const tmp = await UserModel.findByIdAndUpdate<IUser | null>(_id, { $set: newUser }, { new: true }).exec()

    if (tmp === null) {
      throw new Error('User not found')
    }

    const { ...tmpUser } = tmp.toObject()

    response = { ...response, data: { user: tmpUser } }
  } catch (error: unknown) {
    throw handleMongoDBErrors(error)
  }

  const { ...tokenContent } = response.data.user

  const token = jwt.sign(tokenContent, process.env.JWT_SECRET || '')
  response.data.token = { ...response, data: { token } }

  return response
}

export const deleteUser = async (_id: IUser['_id'], loggedUser: IUser): Promise<ResponseType> => {
  const response: ResponseType = {
    success: true,
  }
  try {
    const userData = await UserModel.findById(_id).exec()

    if (userData === null) {
      // Check authorization
      throw new Error('User not found')
    }

    if (loggedUser.permission < 10 && loggedUser._id !== _id) {
      throw new Error('You are not allowed to delete this user')
    }

    await UserModel.deleteOne({ _id }).exec()
  } catch (error: unknown) {
    throw handleMongoDBErrors(error)
  }

  return response
}
