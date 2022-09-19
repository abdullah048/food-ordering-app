import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:3000/api/login', { email, password })
      router.push('/admin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-[50px] bg-[#d1cfcf]'>
      <div className='flex flex-col items-center justify-between h-[40vh] bg-white p-5 rounded-md'>
        <h1 className='font-bold text-4xl text-blue-400'>Admin Dashboard</h1>
        <input
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='border border-black outline-none w-[30%] h-[7vh] rounded-md pl-5'
          placeholder='Email'
        />
        <input
          type='text'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='border border-black outline-none w-[30%] h-[7vh] rounded-md pl-5'
          placeholder='Password'
        />
        <button
          className='text-white bg-sky-400 px-2 py-3 w-[30%] rounded-md'
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Login
