import React from 'react'

import { Authenticated } from '@components'

import { Router } from './router'

const App: React.FC = () => (
  <Authenticated>
    <Router />
  </Authenticated>
)

export default App
