import React from 'react'

import { Link, Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <>
      <div className="flex">
        <Link to={'/'} className="p-2">
          Home
        </Link>
        <Link to={'/login'} className="p-2">
          Login
        </Link>
        <Link to={'/register'} className="p-2">
          Register
        </Link>
      </div>
      <Outlet />
    </>
  )
}
