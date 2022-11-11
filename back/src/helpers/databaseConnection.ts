import mongoose from 'mongoose'

export const databaseConnection = async (): Promise<void> => {
  const mongoUrl: string = process.env.MONGO_URL || ''

  if (mongoUrl === '') {
    throw new Error('MONGO_URL has not been set')
  }

  try {
    await mongoose.connect(mongoUrl)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message)
  }
}
