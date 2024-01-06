import React from 'react'
import { removeCookie } from '../Pages/type/GetAccessToken'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate()
  const handleLogout = () => {
    removeCookie('access_token')
    navigate('/login')
  }

  return (
    <button className="text-white hover:bg-slate-100 hover:text-black p-5 rounded-lg" onClick={handleLogout}>Đăng xuất</button>
  )
}

export default Logout