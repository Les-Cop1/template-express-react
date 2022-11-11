// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMongoDBErrors = (error: any): string | undefined => {
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
