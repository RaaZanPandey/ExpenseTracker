import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useRef, useEffect } from 'react'
import { UserContex } from '../Contexts/Usercontex'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const parent = useRef()
  const btn = useRef()
  const nav = useRef()
  const icon = useRef()
   const act = useRef()

  const { username } = useContext(UserContex);


  useEffect(() => {
      if (!open) {
        nav.current.style.left = "-100%"
        btn.current.style.left = "-25%"
          icon.current.classList.replace("ri-close-line", "ri-align-justify")
      }
      else {
        nav.current.style.left = "0%"
        btn.current.style.left = "0%"
            icon.current.classList.replace("ri-align-justify", "ri-close-line")
      }

  }, [open])

  function HandleClick() {
    setOpen(prev => !prev);
  }

  return (
    <>
      <div ref={btn} onClick={HandleClick} className='z-10 translation-smooth duration-300 ease-in-out absolute mb-10 mt-5 ml-30 w-10 h-auto text-2xl md:hidden block text-white'>
        <i ref={icon} class="ri-align-justify"></i>
      </div>

      <div ref={nav} className='md:ml-[100%] mt-8 md:mt-0 md:relative absolute z-50 h-auto md:h-[9vh] w-[30%] md:w-full bg-zinc-700 text-white md:bg-gradient-to-b from-indigo-400 to-cyan-400 transition-smoooth ease-in-out duration-300'>



        <nav ref={nav} className="md:h-full w-full  bg-gradient-to-r from-indigo-900 to-cyan-900 text-white pl-0 px-2 py-4 shadow-md flex flex-col md:flex-row gap-1">

          <div className="w-full h-auto md:w-[90%] mx-auto flex md:flex-row flex-col md:items-center justify-between space-y-6 ">

            <div className="hidden md:block text-xl md:text-2xl font-bold font-[cursive">
              <span className="text-white">&lt;</span>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">Expenses</span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Tracker</span>
              <span className="text-white">/&gt;</span>
            </div>

            {<div className=" flex flex-col md:flex-row gap-3 md:gap-15 text-lg font-medium">
              <button onClick={() => navigate(`/home?username=${username}`)} className={`hover:text-cyan-300 transition-all duration-300 ${location.pathname === "/home" ? "text-cyan-300" : ""}`}>Home</button>
              <button onClick={() => navigate(`/income?username=${username}`)} className={`hover:text-cyan-300 transition-all duration-300 ${location.pathname === "/income" ? "text-cyan-300" : ""}`}>Income</button>
              <button onClick={() => navigate(`/expenses?username=${username}`)} className={`hover:text-cyan-300 transition-all duration-300 ${location.pathname === "/expenses" ? "text-cyan-300" : ""}`}>Expenses</button>
              <button onClick={() => navigate(`/overview?username=${username}`)} className={`hover:text-cyan-300 transition-all duration-300 ${location.pathname === "/overview" ? "text-cyan-300" : ""}`}>Overview</button>
            </div>}

            <div ref={act} className="flex  md:flex-row flex-col space-y-4 space-x-4 mt-3">
              <button className="md:w-25 md:h-12 h-10 w-full rounded-lg border border-white hover:bg-white hover:text-black transition-all duration-300" onClick={() => { navigate("/login") }}>
                Login
              </button>
              <button className="md:w-25 md:h-12 h-10 w-full rounded-lg border bg-cyan-500 hover:bg-cyan-600  text-white transition-all duration-300" onClick={() => { navigate("/") }}>
                Sign Up
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
