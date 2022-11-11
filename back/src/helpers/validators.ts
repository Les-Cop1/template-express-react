export const passwordValidators = (password: string): { validator: boolean; message: string }[] => [
  {
    validator: password !== undefined,
    message: 'Password is required',
  },
  {
    validator: password?.length >= 8,
    message: 'Password must be at least 8 characters long',
  },
  {
    validator: /[a-z]/g.test(password),
    message: 'Password must contain at least one lowercase letter',
  },
  {
    validator: /[A-Z]/g.test(password),
    message: 'Password must contain at least one uppercase letter',
  },
  {
    validator: /[0-9]/g.test(password),
    message: 'Password must contain at least one number',
  },
  {
    validator: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(password),
    message: 'Password must contain at least one special character',
  },
]

export const confirmationValidators = (
  password: string,
  confirmation: string,
): { validator: boolean; message: string }[] => [
  {
    validator: confirmation !== undefined,
    message: 'Confirmation is required',
  },
  {
    validator: confirmation === password,
    message: 'Password and confirmation are not the same',
  },
]
