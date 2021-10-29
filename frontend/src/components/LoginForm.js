import React, { useState } from 'react'
import Togglable from './Togglable'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login({
      username: username,
      password: password,
    })
    setUsername('')
    setPassword('')
  }

  return (
    <Togglable buttonLabel='Login'>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password:
          <input type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit' className='button'>Login</button>
      </form>
    </Togglable>
  )
}

export default LoginForm