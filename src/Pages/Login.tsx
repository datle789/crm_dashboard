import React from 'react'
import LoginImg from '../img/Login.jpg'

const Login = () => {
  return (
    <div className='p-[50px] bg-gradient-to-r from-[#07bd89] to-[#006e8c]'>
      <div className='relative h-[700px] w-[500px] m-auto shadow-[0px 30px 125px -5px #000] rounded-xl'>
        <div className='w-full'>
          <img src={LoginImg} alt="LoginImg" className='relative w-full h-[250px] bg-cover' />
          <div className='absolute top-[175px] z-10'>
            <h2 className='pl-[15px] text-[25px] uppercase inline-block font-light text-[#fff] '>Sign In</h2>
            <h2 className='pl-[15px] text-[25px] uppercase inline-block font-light text-colorRgb '>Sign Up</h2>
          </div>
          <p className='absolute z-50 text-[#07bd89] top-[227px] pl-[50px] text-[20px]'>&#9650;</p>
        </div>
        <div className='w-full h-[400px] pt-5 bg-gradient-to-r from-[#07bd89] to-[#006e8c]'>
          <form>
            <div className='flex gap-10 flex-col w-full'>
              <div className='flex flex-col gap-2  items-center '>
                <label htmlFor="" className='text-xl text-main ml-[-340px]'>UserName</label>
                <input
                  type="text"
                  className='w-[90%] px-4 mt-[8px] placeholder:text-sm placeholder:italic outline-none  h-[50px] rounded-full '
                  placeholder='Please fill in your username' />
              </div>
              <div className='flex flex-col gap-2  items-center '>
                <label htmlFor="" className='text-xl text-main ml-[-340px] flex'>PassWord</label>
                <input
                  type="password"
                  className='w-[90%] px-4 mt-[8px] placeholder:text-sm placeholder:italic outline-none bg-[#fff] h-[50px] rounded-full '
                  placeholder='Please fill in your password' />
              </div>
            </div>
            <button className='w-[90%]  h-[60px] px-4 rounded-full text-main bg-gradient-to-r from-[#07bd89] mt-[50px] ml-[20px] to-[#006e8c] text-semibold border hover: bg-[#888888] '>SIGN IN</button>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Login