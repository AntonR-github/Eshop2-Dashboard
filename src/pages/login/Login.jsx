import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const HandleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
    >
      <input
        style={{ padding: '10px', marginBottom: '10px' }}
        type="text"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        style={{ padding: '10px', marginBottom: '10px' }}
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button
        style={{ padding: '10px', width: '100px', cursor: 'pointer' }}
        onClick={HandleClick}
        >
          Login
      </button>
    </div>
  )
}

export default Login
