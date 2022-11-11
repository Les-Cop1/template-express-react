import React, { useState } from 'react'

import { useAuth } from '@hooks'

export const Register: React.FC = () => {
  document.title = 'Register - ProjectName'

  const { register } = useAuth()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmation, setConfirmation] = useState<string>('')
  const [error, setError] = useState<string | null>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await register(username, password, confirmation)

    if (response && !response.success) {
      setError(response.error)
    }
  }

  return (
    <div>
      <h1>Register page</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
