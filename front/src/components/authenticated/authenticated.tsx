import React from 'react'

import { AuthenticatedProps } from '@components'
import { AuthenticationProvider } from '@contexts'

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  return <AuthenticationProvider>{children}</AuthenticationProvider>
}
