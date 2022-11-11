import mongoose from 'mongoose'

export const databaseConnection = async () => {
  const mongoUrl: string = process.env.MONGO_URL || ''

  if (mongoUrl === '') {
    throw new Error('MONGO_URL has not been set')
  }

  try {
    await mongoose.connect(mongoUrl)
  } catch (err: any) {
    console.error(err.message)
  }
}
