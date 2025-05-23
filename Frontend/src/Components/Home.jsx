import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContex } from '../Contexts/Usercontex'
const Home = () => {

  const { username, income, expenses } = useContext(UserContex);
  const navigate = useNavigate();
  return (
    <div className='h-[90vh] w-full bg-zinc-700 text-white bg-gradient-to-b from-indigo-400 to-green-400 py-10 flex flex-col gap-10'>
      <span className='w-full bg-green-600 text-white text-2xl font-medium p-3 flex justify-center items-center -mt-10'><h1>Every rupee you save today builds the freedom you’ll enjoy tomorrow</h1></span>
      <div className='w-full h-112 flex flex-row gap-10 px-15'>
        <div className='w-5/3  flex flex-col  gap-3'>
          <div className='w-full h-49  flex justify-center items-center'>
            <span className='w-[70%]  text-5xl font-bold leading-13 text-indigo-700'><h1>The Expenses Tracker suit for free</h1></span>
          </div>
          <div className='w-full h-56  flex flex-col justify-center items-center'>
            <span className='w-[85%]  text-2xl leading-10 text-indigo-700 ml-20 font-medium'><p>Track your income, expenses, and savings all in one place. Get started instantly. No downloads. No credit card.</p></span>
            <div className="flex flex-row justify-between gap-24 mt-8">
              <button className="px-4 py-2 rounded-lg border border-white bg-indigo-700 hover:bg-blue-500 hover:text-white transition-all duration-300" onClick={() => { navigate(`/expenses?${username}`) }}>
                Add Expenses
              </button>
              <button className="px-8 py-3 bg-green-900 hover:bg-green-600 rounded-lg text-white transition-all duration-300" onClick={() => { navigate(`/income?username=${username}`) }}>
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
        <h2 className="text-3xl font-bold mb-2">Track Your Spending, Build Your Future</h2>
        <p className="text-gray-600 mb-6">Your all-in-one tool for budgeting, saving, and financial clarity.</p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">Get Started Now</button>
      </div>

    </div>
  )
}

export default Home
