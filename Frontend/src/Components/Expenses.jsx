import axios from 'axios'
import React from 'react'
import { API_URL } from '../Config/Config';
import { useState, useEffect, useContext, useRef } from 'react'
import { UserContex } from '../Contexts/Usercontex'

const Expenses = () => {
    const ref = useRef();
    const { username, setExpenses } = useContext(UserContex);
    const [form, setForm] = useState({ id: "", title: "", ammount: "", date: "", category: "", description: "" })
    const [existexpenses, setExistExpenses] = useState([]);    //THIS IS TO SHOW EXISTING EXPENSES TO USER
    const [count, setCount] = useState(0);

    async function getAllExpenses() {
        try {
            const response = await axios.get(`${API_URL}/expenses/${username}`);  //THIS APIS RETURN ALL EXISTING DATA
            var data = await response.data;
            setExistExpenses(data);

        } catch (error) {
            console.log(error)
        }
    }


    async function AddExpensese(expenses) {
        try {
            const response = await axios.post(`${API_URL}/expenses/${username}`, expenses);  //THIS API ADD NEW EXPENSES
            const data = await response.data;
            console.log(data)
            getAllExpenses()

        } catch (error) {
            console.log("Unexpected error occure ")
            console.log(error);
        }
    }

    useEffect(() => {
        getAllExpenses();
    }, [])

    useEffect(() => {
        const total = existexpenses.reduce((sum, items) => sum + items.ammount, 0);
        setCount(total)
        setExpenses(count);
    }, [existexpenses]);

    function HandelChange(e) {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }))
    }

    function HandleClick() {
        if (form.title == "" || form.ammount == "" || form.category == "" || form.date == "" || form.date == "" || form.category == "" || form.description == "") {
            alert("Fill all the date first")
            return 0;
        }

        const expenses = {
            title: form.title,
            ammount: form.ammount,
            date: form.date,
            category: form.category,
            description: form.description
        }
        AddExpensese(expenses);
        setForm({ title: "", ammount: "", date: "", category: "", description: "" })
    }

    async function HandleDelete(data) {
        alert("Do you relly want to delete this ??")
        try {
            const response = await axios.delete(`${API_URL}/expenses/${username}`,
                { data: data });
            getAllExpenses();
        } catch (error) {
            console.log(error)
        }
    }

    async function HandleEdit(e) {
        ref.current.classList.remove("hidden");
        ref.current.classList.add("block");
        setForm({
            id: e.id,
            title: e.title,
            ammount: e.ammount,
            date: e.data,
            category: e.category,
            description: e.description
        });
    }


    async function HandleUpdate() {
        try {
            const response = await axios.put(`${API_URL}/expenses`, form);
            console.log(response.data);
            setForm({ title: "", ammount: "", date: "", category: "", description: "" })
            getAllExpenses();
        } catch (error) {
            console.log(error);
        }
        ref.current.classList.remove("block");
        ref.current.classList.add("hidden");

    }

    return (
        <div className='h-auto md:h-[90vh] w-[100%] md:w-full bg-zinc-700 text-white p-10 flex flex-col gap-10 justify-center items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-800'>
            <div className='h-10 w-300 flex flrx-row gap-70'>
                <span className='font-medium m-1 text-2xl bg-gradient-to-r from-cyan-300 to-blue-500 text-transparent bg-clip-text'><h1>Hii, <strong>{username}</strong></h1></span>
                <span className='font-medium m-1 text-2xl bg-gradient-to-r from-green-300 to-teal-400 text-transparent bg-clip-text'><h1>Total Expenses : <strong>{count}</strong></h1></span>
            </div>

            <div className=' flex flex-col md:w-[80%] w-full md:flex-row gap-10 justify-center items-center'>
                <div className='w-full md:w-110  md:h-150 border-2 border-cyan-500 bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl shadow-md slide-from-left'>
                    <div className='flex flex-col justify-center items-center p-5'>
                        <span className='font-medium mb-5 text-2xl'><h1>Add new Expenses</h1></span>
                        <form className='w-full flex flex-col gap-2.5'>
                            <input className='border-2 rounded-lg  text-white p-2' type='text' placeholder='Enter title' name='title' value={form.title} onChange={HandelChange}></input>
                            <input className='border-2 rounded-lg p-2  text-white' type='number' placeholder='Enter ammount' name='ammount' value={form.ammount} onChange={HandelChange}></input>
                            <input className='border-2 rounded-lg p-2  text-white' type='date' min={"2020-01-01"} max={"2040-01-01"} placeholder='Enter date' name='date' value={form.date} onChange={HandelChange}></input>
                            <select name="category" className="border-2 border-white rounded-lg p-2 w-full  text-black" value={form.category} onChange={HandelChange}>
                                <option value="">Select Category</option>
                                <option value="Rent">Rent</option>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Internet">Internet</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Health">Health</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Education">Education</option>
                                <option value="Others">Others</option>
                            </select>
                            <textarea name="description" placeholder="Enter description" className="border-2 rounded-lg p-2 w-full h-32 text-white" value={form.description} onChange={HandelChange} />
                            <input className='mt-6 bg-blue-500 border-2 border-green-900 rounded-lg px-2 py-1 font-medium text-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-gray-900' type='button' value={"Save Expenses"} onClick={HandleClick}></input>
                            <input ref={ref} className='hidden mt-6 bg-blue-500 border-2 border-green-900 rounded-lg px-2 py-1 font-medium text-2xl bg-gradient-to-b from-indigo-400 to-green-400' type='button' value={"Update Expenses"} onClick={HandleUpdate}></input>
                        </form>
                    </div>
                </div>



                <div className='w-full md:w-200 h-[50vh] md:h-150 border-2 border-cyan-500 bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl shadow-md slide-from-right'>
                <span className='font-medium mb-5 text-2xl text-cyan-300 h-10 flex justify-center items-center'><h1>All Expenses</h1></span>
                    <div className='flex flex-col justify-center items-center py-5 overflow-x-scroll thin-scrollbar'>

                        <div className='w-auto flex flex-col gap-3 md:ml-0 ml-100'>
                            <div className='flex flex-row justify-between w-full h-10 border-2 border-s-white font-medium text-1.5xl rounded-lg  p-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-gray-900'>
                                <span className='w-30 flex justify-center'><h1>Title</h1></span>
                                <span className='w-20 flex justify-center'><h1>ammount</h1></span>
                                <span className='w-25 flex justify-center'><h1>Date</h1></span>
                                <span className='w-25 flex justify-center'><h1>Category</h1></span>
                                <span className='h-10 w-65 flex justify-center'><h1>Description</h1></span>
                                <span className='h-10 w-20 flex justify-center'><h1>Edit</h1></span>
                            </div>


                            {existexpenses.length > 0 ? (
                                existexpenses.map((e, index) => (
                                    <div key={index} className='flex flex-row justify-between w-full h-10 border-2 border-s-white text-1xl rounded-lg  text-white '>
                                        <span className='w-30 flex justify-center items-center'><p>{e.title}</p></span>
                                        <span className='w-20 flex justify-center items-center'><p>{e.ammount}</p></span>
                                        <span className='w-25 flex justify-center items-center'><p>{e.date}</p></span>
                                        <span className='w-25 flex justify-center items-center'><p>{e.category}</p></span>
                                        <span className='w-65 text-0.5xl font-light overflow-y-scroll thin-scrollbar'><p>{e.description}</p></span>
                                        <span className='w-20 text-0.5xl font-light flex flex-row gap-3'><span>
                                            <button onClick={() => { HandleEdit(e) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </button>
                                        </span >
                                            <button onClick={() => { HandleDelete(e) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hwjcdycb.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </button>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className='w-full mt-10 flex items-center justify-center font-bold text-3xl '><h1>No expenses exist</h1></div>
                            )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Expenses
