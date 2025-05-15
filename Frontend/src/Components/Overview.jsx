import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContex } from '../Contexts/Usercontex'
const Overview = () => {

  const { username, income, expenses } = useContext(UserContex);
  const navigate = useNavigate();
  return (
    <div className='h-[100vh] w-full bg-zinc-700 text-white bg-gradient-to-b from-indigo-400 to-green-400 px-15 py-10 flex flex-col gap-10'>
      <div className='mt-0'>
        <h1 className="text-3xl font-medium bg-gradient-to-b from-red-700 to-blue-600 bg-clip-text text-transparent">
          Welcome, {username}
        </h1>  </div>
      <div className=' w-[100%] '>
        <p className="text-2xl font-medium text-center mt-2 italic text-zinc-600 bg-[rgba(255,255,255,0.4)] rounded-lg p-3 hover:scale-[1.02]">
          "Do not save what is left after spending, but spend what is left after saving." – Warren Buffett
        </p>
      </div>

      <div className='h-50 w-[100%]'>
        <span className='w-full flex justify-center items-center text-3xl font-bold text-indigo-600'><h1>Your details till now </h1></span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-[rgba(255,255,255,0.4)] hover:scale-[1.02] transition-transform duration-500 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-600">Total Income</p>
            <p className="text-xl font-bold text-green-700">{income}</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.4)]  p-4 rounded-xl hover:scale-[1.02] shadow transition-transform duration-500">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-xl font-bold text-red-700">₹{expenses}</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.4)]  p-4 rounded-xl shadow hover:scale-[1.02] transition-transform duration-500">
            <p className="text-sm text-gray-600">Savings</p>
            <p className="text-xl font-bold text-blue-700">{income - expenses}</p>
          </div>
        </div>
      </div>
      <div className='w-full  p-2 flex flex-col items-center gap-5 text-3xl font-medium text-gray-500 bg-[rgba(255,255,255,0.4)] rounded-lg '>
        <span><h1 className=''>Navigate to different pages</h1></span>
  <div className='flex flex-row gap-100  text-2xl font-medium text-blue-600 '>
    <button className='bg-[rgba(179,179,179,0.4)] rounded-lg hover:scale-[1.02]' onClick={()=>{navigate(`/expenses?username=${username}`)}}>Add Expenses</button>
     <button className='bg-[rgba(179,179,179,0.4)] rounded-lg hover:scale-[1.02]' onClick={()=>{navigate(`/income?username=${username}`)}}>Add Income</button>
        <button className='bg-[rgba(179,179,179,0.4)] rounded-lg hover:scale-[1.02]' onClick={()=>{navigate(`/overview?username=${username}`)}}>Overview</button>
  </div>
         
      </div>
    </div>
  )
}

export default Overview
