

export type ResponseType<Type = null> = {
  success: boolean
  data?: Type
  error?: any
}
