import React, { useState } from 'react'

import { useAuth } from '@hooks'

export const Login: React.FC = () => {
  document.title = 'Login - ProjectName'

  const { login } = useAuth()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await login(username, password)

    if (response && !response.success) {
      setError(response.error)
    }
  }

  return (
    <div>
      <h1>Login page</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmit}>
        <input type="text" value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
