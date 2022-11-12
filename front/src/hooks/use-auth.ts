import React from 'react'

import { AuthenticationContext } from '@contexts'
import { AuthenticationContextType } from '@types'

export function useAuth(): AuthenticationContextType {
  return React.useContext(AuthenticationContext)
}
