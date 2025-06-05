import React from 'react'
import { API_URL } from '../Config/Config';
import { configs } from 'eslint-plugin-react-refresh';
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContex } from '../Contexts/Usercontex';

const Create = () => {
    const { username, setUsername } = useContext(UserContex)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ username: "", email: "", password: "" })
    function HandleChange(e) {
        setForm((prevDate => ({
            ...prevDate,
            [e.target.name]: e.target.value
        })))
    }

    async function CreateUser(data) {
        try {
            const response = await axios.post(`${API_URL}/user`, data)
            setLoading(true);
            console.log("Date has been sent to server");
            if (response) {
                navigate(`/home?username=${data.username}`)
                setUsername(data.username);
            }

        } catch (error) {
            console.log(error);
            console.log("Unable to singin");
        }
        finally{
            setLoading(true);
        }
    }

    async function HandleClick() {

        if (form.username == "" || form.email == "" || form.password == "") {
            alert("Fill requied details first")
            return 0;
        }

        const data = {
            username: form.username,
            email: form.email,
            password: form.password

        }

        CreateUser(data);
        setForm({ username: "", email: "", password: "" })
    }

    return (

        <div className='create p-10 h-full w-full flex justify-center items-center bg-[url(./assets/backgroundskill.jpg)] bg-cover bg-center'>
            {loading ? (

                <div className='bg-[rgba(255,255,255,0.4)]  h-150 w-100 rounded-lg p-8 hover:scale-105 transition-transform duration-500 '>

                    <div className='flex justify-center'>
                        <span className='flex flex-row justify-center items-center h-20 w-70 '><span className='flex flex-row'>
                            <span className="text-4xl font-bold text-green-700 mr-4">&lt;</span>
                            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-700 to-green-500 text-transparent bg-clip-text font-[cursive]'>E</h1><p className='text-xl font-medium mt-3 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text font-[cursive]'>xpenses</p></span><span className='flex flex-row'><h1 className='text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text font-[cursive]'>T</h1><p className='text-xl font-medium mt-3 bg-gradient-to-r from-blue-700 to-green-500 text-transparent bg-clip-text font-[cursive]'>racker</p>
                                <span className="text-4xl font-bold text-blue-700 ml-4">/&gt;</span>
                            </span></span>
                    </div>


                    <div className='font-bold text-3xl mb-15 flex justify-center'><h1>Login</h1></div>
                    <div className="w-full flex justify-center">
                        <h1><strong>Fetching Data<span className="dot-flash">...</span></strong></h1>
                    </div>

                </div>
            ):(
   <div  className='bg-[rgba(255,255,255,0.4)]  h-150 w-100 rounded-lg p-8 hover:scale-105 transition-transform duration-500 '>
                <div className='flex justify-center'>
                    <span className='flex flex-row justify-center items-center h-20 w-70 '><span className='flex flex-row'>
                        <span className="text-4xl font-bold text-green-700 mr-4">&lt;</span>
                        <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-700 to-green-500 text-transparent bg-clip-text font-[cursive]'>E</h1><p className='text-xl font-medium mt-3 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text font-[cursive]'>xpenses</p></span><span className='flex flex-row'><h1 className='text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text font-[cursive]'>T</h1><p className='text-xl font-medium mt-3 bg-gradient-to-r from-blue-700 to-green-500 text-transparent bg-clip-text font-[cursive]'>racker</p>
                            <span className="text-4xl font-bold text-blue-700 ml-4">/&gt;</span>
                        </span></span>
                </div>
                <div className='font-bold text-3xl mb-15 flex justify-center'><h1>Create Account</h1></div>

                <form className='w-full flex flex-col gap-2.5'>
                    <input className='border-2 rounded-lg p-2' type='text' placeholder='username' name='username' value={form.username} onChange={HandleChange}></input>
                    <input className='border-2 rounded-lg p-2' type='email' placeholder='email' name='email' value={form.email} onChange={HandleChange}></input>
                    <input className='border-2 rounded-lg p-2' type='password' placeholder='password' name='password' value={form.password} onChange={HandleChange}></input>
                    <div className='w-full py-10 px-2 flex justify-center'>
                        <input className='bg-gradient-to-b from-zinc-200 to-zinc-500 border-2 border-green-900 rounded-lg px-2 py-1 font-medium text-2xl' type='button' value={"Sign up"} onClick={HandleClick}></input>
                    </div>
                    <div className='flex justify-center'>
                        <span className='text-medium text-1.8xl'>Already have an account ? <span onClick={() => navigate("/login")} className='text-bold text-blue-700 '>Login</span></span>
                    </div>
                </form>
            </div>
            )}
         
        </div>
    )
}

export default Create
