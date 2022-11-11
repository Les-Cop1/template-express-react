import React from 'react'

import { useAuth } from '@hooks'

import { Link, Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  const { user } = useAuth()
  return (
    <>
      <div className="flex">
        <Link to={'/'} className="p-2">
          Home
        </Link>
        {user ? (
          <Link to={'/logout'} className="p-2">
            Logout
          </Link>
        ) : (
          <>
            <Link to={'/login'} className="p-2">
              Login
            </Link>
            <Link to={'/register'} className="p-2">
              Register
            </Link>
          </>
        )}
      </div>
      <Outlet />
    </>
  )
}
