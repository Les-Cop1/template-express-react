import mongoose, { MongooseError } from 'mongoose'

export const databaseConnection = async (): Promise<void> => {
  const mongoUrl: string = process.env.MONGO_URL || ''

  if (mongoUrl === '') {
    throw new Error('MONGO_URL has not been set')
  }

  try {
    await mongoose.connect(mongoUrl)
  } catch (error: unknown) {
    console.error((error as MongooseError).message)
  }
}
