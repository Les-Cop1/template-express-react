import mongoose, { MongooseError } from 'mongoose'

export const databaseConnection = async (): Promise<void> => {
  const mongoUrl: string = decodeURIComponent(process.env.MONGO_URI_ENCODED || '')

  if (mongoUrl === '') {
    throw new Error('MONGO_URI_ENCODED has not been set')
  }

  try {
    await mongoose.connect(mongoUrl)
  } catch (error: unknown) {
    console.error((error as MongooseError).message)
  }
}
