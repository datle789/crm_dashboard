import React, { useState, ChangeEvent, useEffect } from 'react'
import LoginImg from '../img/Login.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { setDataInSessionStorage } from './type/SetCurrentToSession'

const Login = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  const ACCESS_TOKEN_KEY = 'access_token'
  const setAccessToken = (token: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 3 });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://103.161.181.124:5000/api/auth/login', { username, password })
      if (response.status === 200) {
        const accessToken = await response.data.body.tokens.access.token
        setAccessToken(accessToken)
        const adminData = response.data.body.user
        setDataInSessionStorage(JSON.stringify(adminData))
        // console.log(response.data.body.user.name)
        navigate('/home')
      }
    } catch (error: any) {
      Swal.fire('Oops!', error.response.data.message, 'warning')
    }
  }

  return (
    <div className='p-[38px] bg-gradient-to-r from-[#07bd89] to-[#006e8c]'>
      <div className='relative h-[700px] w-[500px] m-auto shadow-2xl'>
        <div className='w-full'>
          <img src={LoginImg} alt="LoginImg" className='relative w-full h-[250px] bg-cover' />
          <div className='absolute top-[175px] z-10'>
            <h2 className='pl-[15px] text-[25px] uppercase inline-block font-light text-[#fff] '>Sign In</h2>
            <h2 className='pl-[15px] text-[25px] uppercase inline-block font-light text-colorRGB'>Sign Up</h2>
          </div>
          <p className='absolute z-50 text-[#07bd89] top-[227px] pl-[50px] text-[20px]'>&#9650;</p>
        </div>
        <div className='w-full h-[450px] pt-5 bg-gradient-to-r from-[#07bd89] to-[#006e8c] '>
          <form onSubmit={handleSubmit}>
            <div className='flex gap-10 flex-col w-full'>
              <div className='flex flex-col gap-2  items-center '>
                <label htmlFor="" className='text-xl text-[#76ffff] ml-[-340px]'>Username</label>
                <input
                  type="text"
                  className='w-[90%] px-4 mt-[8px] placeholder:text-sm placeholder:italic outline-none bg-gray-100 h-[50px] rounded-full '
                  placeholder='Please fill in your username'
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-2  items-center '>
                <label htmlFor="" className='text-xl text-[#76ffff] ml-[-340px] flex'>Password</label>
                <input
                  type="password"
                  className='w-[90%] px-4 mt-[8px] placeholder:text-sm placeholder:italic outline-none bg-gray-100 h-[50px] rounded-full '
                  placeholder='Please fill in your password'
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type='submit'
              className='w-[90%] h-[60px] px-4 rounded-full text-[#76ffff] bg-gradient-to-r from-[#07bd89]  to-[#006e8c] mt-[50px] ml-[20px] text-semibold border hover:text-yellow-50 '
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Login