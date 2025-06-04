import React from 'react'
import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContex } from '../Contexts/Usercontex'
const Home = () => {

  const { username, income, expenses } = useContext(UserContex);
  const navigate = useNavigate();

  return (
    <div className='h-auto md:h-[90vh] w-[100vw] md:w-full  bg-gradient-to-b from-gray-800 to-gray-700  text-white  py-10 flex flex-col gap-10 overflow-y-hidden'>
      <span className='w-[100vw] md:w-full  bg-cyan-600 text-white text-xl md:text-2xl font-medium p-3 flex justify-center items-center -mt-10'><h1>Every rupee you save today builds the freedom you’ll enjoy tomorrow</h1></span>
      <div className='w-full h-auto md:h-112 flex flex-col md:flex-row gap-10 px-2 md:px-15'>
        <div className='w-full md:w-5/3  flex flex-col  gap-3'>
          <div className='w-full h-49  flex justify-center items-center'>
            <span className='w-[70%] text-3xl md:text-5xl font-bold leading-13'><h1>The Expenses Tracker suit for free</h1></span>
          </div>
          <div className='w-full h-56  flex flex-col justify-center items-center'>
            <span className='w-[85%] text-xl md:text-2xl leading-10 ml-20 font-medium'><p>Track your income, expenses, and savings all in one place. Get started instantly. No downloads. No credit card.</p></span>
            <div className="flex flex-row justify-between gap-24 mt-8">
              <button className="px-4 py-2 rounded-lg border border-white bg-indigo-700 hover:bg-blue-500 hover:text-white transition-all duration-300" onClick={() => { navigate(`/expenses?${username}`) }}>
                Add Expenses
              </button>
              <button className="px-8 py-3 bg-cyan-900 hover:bg-cyan-600 rounded-lg text-white transition-all duration-300" onClick={() => { navigate(`/income?username=${username}`) }}>
                Add Income
              </button>
            </div>
          </div>
        </div>
        <div className='w-5/2 bg-[url(./assets/Create.png)] bg-cover bg-center '>
          <img src="../assets/Create.png" alt="" />
        </div>
      </div>
      <div className="text-center -mt-3">
        <h2 className="text-xl md:text-3xl font-bold mb-2">Track Your Spending, Build Your Future</h2>
        <p className=" mb-3">Your all-in-one tool for budgeting, saving, and financial clarity.</p>
        <div className="h-auto w-full flex justify-center">
    <div className="md:block text-xl md:text-2xl font-bold font-[cursive]">
      <span className="text-white">&lt;</span>
      <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">Expenses</span>
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Tracker</span>
      <span className="text-white">/&gt;</span>
    </div>
  </div>
      </div>

    </div>
  )
}

export default Home
