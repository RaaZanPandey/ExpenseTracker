import React from 'react'
import { useNavigate, useLocation, } from 'react-router-dom'
import { useContext } from 'react'
import { UserContex } from '../Contexts/Usercontex'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const {username} = useContext(UserContex);

  return (
    <div className='h-[10%] w-full bg-zinc-700 text-white bg-gradient-to-b from-indigo-400 to-green-40'>

        <nav className="w-full bg-gradient-to-r from-indigo-900 to-green-900 text-white px-6 py-4 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">

            <div className="text-2xl font-bold font-[cursive]">
              <span className="text-white">&lt;</span>
              <span className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">Expenses</span>
              <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Tracker</span>
              <span className="text-white">/&gt;</span>
            </div>


            {<div className="hidden md:flex space-x-8 text-lg font-medium">
              <button onClick={() => navigate(`/home?username=${username}`)} className={`hover:text-green-300 transition-all duration-300 ${location.pathname === "/home" ? "text-green-300" : ""}`}>Home</button>
              <button onClick={() => navigate(`/income?username=${username}`)}  className={`hover:text-green-300 transition-all duration-300 ${location.pathname === "/income" ? "text-green-300":""}`}>Income</button>
              <button onClick={() => navigate(`/expenses?username=${username}`)} className={`hover:text-green-300 transition-all duration-300 ${location.pathname === "/expenses"? "text-green-300":""}`}>Expenses</button>
              <button  onClick={() => navigate(`/overview?username=${username}`)} className={"hover:text-green-300 transition-all duration-300"}>Overview</button>
            </div>}


            <div className="flex space-x-4">
              <button className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition-all duration-300" onClick={() => { navigate("/login") }}>
                Login
              </button>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-all duration-300" onClick={() => { navigate("/") }}>
                Sign Up
              </button>
            </div>
          </div>
        </nav>
      </div>
  )
}

export default Navbar
