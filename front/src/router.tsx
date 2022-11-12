import React from 'react'

import { Layout } from '@components'
import { Home, Login, Register, Unknown } from '@pages'

import { Route, Routes } from 'react-router-dom'

export const Router: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
    <Route path="*" element={<Unknown />} />
  </Routes>
)
