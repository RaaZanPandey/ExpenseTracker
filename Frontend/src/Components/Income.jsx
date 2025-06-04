import axios from 'axios'
import React from 'react'
import { API_URL } from '../Config/Config';
import { useState, useEffect, useContext, useRef } from 'react'
import { UserContex } from '../Contexts/Usercontex'
import { data } from 'react-router-dom'

const Income = () => {

  const container = useRef();
  const left = useRef();
  const ref = useRef();
  const { username, setIncome } = useContext(UserContex);
  const [form, setFrom] = useState({ id: "", title: "", ammount: "", date: "", description: "" })
  const [existincome, setexistincome] = useState([]);    //THIS IS TO SHOW EXISTING INCOME TO USER
  const [count, setCount] = useState(0);

  async function getAllIncome() {
    try {
      const response = await axios.get(`${API_URL}/income/${username}`);  //THIS APIS RETURN ALL EXISTING DATA
      var data = await response.data;
      setexistincome(data);

    } catch (error) {
      console.log(error)
    }
  }


  async function AddIncomee(income) {
    try {
      const response = await axios.post(`${API_URL}/income/${username}`, income);  //THIS API ADD NEW INCOME
      getAllIncome()

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllIncome();
  }, [])

  useEffect(() => {
    const total = existincome.reduce((sum, items) => sum + items.ammount, 0);
    setCount(total)
    setIncome(count);
  }, [existincome]);

  function HandelChange(e) {
    setFrom(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }))
  }

  function HandleClick() {
    if (form.title == "" || form.ammount == "" || form.category == "" || form.date == "" || form.date == "" || form.description == "") {
      alert("Fill all the date first")
      return 0;
    }

    const Income = {
      title: form.title,
      ammount: form.ammount,
      date: form.date,
      description: form.description
    }

    AddIncomee(Income);
    setFrom({ title: "", ammount: "", date: "", description: "" })
  }

  async function HandleDelete(data) {
    alert("Do you really want to delete this ??")
    try {
      const response = axios.delete(`${API_URL}/income/${username}`, {
        data: data
      });
      getAllIncome();
    } catch (error) {
      console.log(error)
    }
  }

  function HandleEdit(e) {
    ref.current.classList.remove("hidden");
    ref.current.classList.add("block");
    console.log("Edit icon hit")
    setFrom({
      id: e.id,
      title: e.title,
      ammount: e.ammount,
      description: e.description,
      date: e.data
    });
  }

  async function HandleUpdate() {
    try {
      const response = await axios.put(`${API_URL}/income`, form);
      console.log(response.data);
      getAllIncome();
    } catch (error) {
      console.log(error);
    }
    setFrom({ title: "", ammount: "", description: "", data: "" });
    ref.current.classList.remove("block");
    ref.current.classList.add("hidden");
  }


  return (
    <div className='h-auto md:h-[90vh] w-full bg-gray-900 text-white p-10 flex flex-col gap-10 justify-center items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-800'>
      <div className='h-10 w-300 flex flrx-row gap-70'>
        <span className='font-medium m-1 text-2xl bg-gradient-to-r from-cyan-300 to-blue-500 text-transparent bg-clip-text'>
          <h1>Hii, <strong>{username}</strong></h1>
        </span>
        <span className='font-medium m-1 text-2xl bg-gradient-to-r from-cyan-300 to-teal-400 text-transparent bg-clip-text'>
          <h1 >Total Income : <strong>{count}</strong></h1>
        </span>
      </div>

      <div ref={container} className='flex flex-col h-full w-full md:w-[80%] md:flex-row gap-10 justify-center items-center'>
        <div className='w-full md:w-110 h-full md:h-150 border-2 border-cyan-500 bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl shadow-md slide-from-left'>
          <div className='flex flex-col justify-center items-center p-5 '>
            <span className='font-medium mb-5 text-2xl text-cyan-300'><h1>Add new Income</h1></span>
            <form className='w-full flex flex-col gap-2.5'>
              <input className='border-2 rounded-lg text-white p-2 bg-gray-800 placeholder-gray-400' type='text' placeholder='Enter title' name='title' value={form.title} onChange={HandelChange} />
              <input className='border-2 rounded-lg p-2 text-white bg-gray-800 placeholder-gray-400' type='number' placeholder='Enter amount' name='ammount' value={form.ammount} onChange={HandelChange} />
              <input className='border-2 rounded-lg p-2 text-white bg-gray-800 placeholder-gray-400' type='date' min={"2020-01-01"} max={"2040-01-01"} name='date' value={form.date} onChange={HandelChange} />
              <textarea name="description" placeholder="Enter description" className="border-2 rounded-lg p-2 w-full h-32 text-white bg-gray-800 placeholder-gray-400" value={form.description} onChange={HandelChange} />
              <input className='mt-6 bg-gradient-to-r from-teal-400 to-cyan-500 border-2 border-cyan-600 rounded-lg px-2 py-1 font-medium text-2xl text-gray-900' type='button' value={"Save Income"} onClick={HandleClick} />
              <input ref={ref} className='hidden mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 border-2 border-blue-600 rounded-lg px-2 py-1 font-medium text-2xl text-gray-900' type='button' value={"Update Expenses"} onClick={HandleUpdate} />
            </form>
          </div>
        </div>

        <div className='w-full md:w-200 h-auto md:h-150 border-2 border-cyan-500 bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl overflow-y-scroll thin-scrollbar shadow-md slide-from-right'>
          <span className='font-medium mb-5 text-2xl text-cyan-300 h-10 flex justify-center items-center'><h1>All Income</h1></span>
          <div className='flex flex-col justify-center items-center py-5 overflow-x-scroll thin-scrollbar'>
    
            <div className='w-auto md:w-full flex flex-col gap-3 md:ml-0 ml-75'>
              <div className='w-full flex flex-row justify-between h-10 border-2 border-white font-medium text-1.5xl rounded-lg p-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-gray-900'>
                <span className='w-30 flex justify-center'><h1>Title</h1></span>
                <span className='w-20 flex justify-center'><h1>Amount</h1></span>
                <span className='w-25 flex justify-center'><h1>Date</h1></span>
                <span className='h-10 w-65 flex justify-center'><h1>Description</h1></span>
                <span className='h-10 w-20 flex justify-center'><h1>Edit</h1></span>
              </div>

              {existincome.length > 0 ? (
                existincome.map((e, index) => (
                  <div key={index} className='flex flex-row justify-between w-full h-10 border-2 border-white text-0.5xl md:text-1xl rounded-lg text-white bg-gray-800'>
                    <span className='w-30 flex justify-center items-center overflow-y-scroll thin-scrollbar'><p>{e.title}</p></span>
                    <span className='w-20 flex justify-center items-center'><p>{e.ammount}</p></span>
                    <span className='w-25 flex justify-center items-center'><p>{e.date}</p></span>
                    <span className='w-65 text-0.5xl font-light overflow-y-scroll thin-scrollbar'><p>{e.description}</p></span>
                    <span className='w-20 text-0.5xl font-light flex flex-row gap-3'>
                      <button onClick={() => { HandleEdit(e) }}>
                        <lord-icon src="https://cdn.lordicon.com/exymduqj.json" trigger="hover"></lord-icon>
                      </button>
                      <button onClick={() => { HandleDelete(e) }}>
                        <lord-icon src="https://cdn.lordicon.com/hwjcdycb.json" trigger="hover"></lord-icon>
                      </button>
                    </span>
                  </div>
                ))
              ) : (
                <div className='w-full mt-10 flex items-center justify-center font-bold text-3xl text-cyan-300'><h1>No Income Exist</h1></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Income
