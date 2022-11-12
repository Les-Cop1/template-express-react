import { MongooseError } from 'mongoose'

export const handleMongoDBErrors = (error: MongooseError & { code?: number }): string | undefined => {
  let handledError

  switch (error.code) {
    case 11000:
      handledError = `Data already exists`
      break
  }

  if (!handledError && error.message) {
    handledError = error.message
  }

  throw new Error(handledError)
}
