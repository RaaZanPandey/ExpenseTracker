import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContex } from '../Contexts/Usercontex'

const Overview = () => {
  const { username, income, expenses } = useContext(UserContex);
  const navigate = useNavigate();

  return (
    <div className='md:h-[90vh] w-full bg-gradient-to-b from-gray-800 to-gray-700 text-white px-4 py-8 md:px-6 md:py-10 flex flex-col gap-8 md:gap-10'>

      <div className='w-full flex justify-center'>
        <h1 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent drop-shadow-lg text-center md:text-left">
          Welcome, {username}
        </h1>
      </div>

      <div className='w-full max-w-3xl mx-auto'>
        <p className="text-lg sm:text-xl font-medium italic text-white/80 backdrop-blur-sm bg-white/10 rounded-xl p-4 shadow-md hover:scale-[1.02] transition duration-300 text-center">
          "Do not save what is left after spending, but spend what is left after saving." – Warren Buffett
        </p>
      </div>

      <div className='w-full max-w-4xl mx-auto'>
        <h2 className='text-center text-3xl font-bold text-indigo-400 mb-6'>Your Financial Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
            <p className="text-sm text-white/60">Total Income</p>
            <p className="text-2xl font-bold text-cyan-400">₹{income}</p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
            <p className="text-sm text-white/60">Total Expenses</p>
            <p className="text-2xl font-bold text-red-400">₹{expenses}</p>
          </div>
          <div className={`backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 ${income - expenses >= 0 ? 'text-cyan-400' : 'text-red-400'
            }`}>
            <p className="text-sm text-white/60">Savings</p>
            <p className="text-2xl font-bold">₹{income - expenses}</p>
          </div>
        </div>
      </div>

      <div className='w-full max-w-4xl mx-auto p-6 flex flex-col items-center gap-6 text-2xl font-medium text-white/80 backdrop-blur-sm bg-white/10 rounded-xl shadow-md'>
        <h2 className='text-center text-2xl font-semibold text-white'>Navigate to Pages</h2>
        <div className='flex flex-wrap justify-center gap-6'>
          <button
            className='px-6 py-2 bg-blue-600/70 rounded-xl shadow hover:scale-105 transition duration-300 hover:bg-blue-700'
            onClick={() => navigate(`/expenses?username=${username}`)}
          >
            Add Expenses
          </button>
          <button
            className='px-6 py-2 bg-cyan-600/70 rounded-xl shadow hover:scale-105 transition duration-300 hover:bg-cyan-700'
            onClick={() => navigate(`/income?username=${username}`)}
          >
            Add Income
          </button>
          <button
            className='px-6 py-2 bg-purple-600/70 rounded-xl shadow hover:scale-105 transition duration-300 hover:bg-purple-700'
            onClick={() => navigate(`/overview?username=${username}`)}
          >
            Overview
          </button>
        </div>
      </div>

      <div className='h-auto w-full flex justify-center items-center'>
        <div className="hidden md:block text-xl md:text-2xl font-bold font-[cursive">
          <span className="text-white">&lt;</span>
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">Expenses</span>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Tracker</span>
          <span className="text-white">/&gt;</span>
        </div>
      </div>

    </div>
  )
}

export default Overview
