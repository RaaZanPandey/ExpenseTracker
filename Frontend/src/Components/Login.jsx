import React, { use } from 'react'
import { useAsyncError, useNavigate } from 'react-router-dom'
import { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContex } from '../Contexts/Usercontex';
import { API_URL } from '../Config/Config';

const Login = () => {


    const { username, setUsername } = useContext(UserContex);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false);
    function HandleChange(e) {
        setForm((prevDate => ({
            ...prevDate,
            [e.target.name]: e.target.value
        })))
    }

    async function LogIn(user) {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/user/login`, user)
            const data = await response.data;
            setUsername(data.user.username);
            navigate(`/home?username=${data.user.username}`);


        } catch (error) {

            console.log(error)
            if (error.response) {
                if (error.response.status === 404) {
                    alert("User not found ")
                }
                else if (error.response.status === 401) {
                    alert("Incorrect Password")
                }
            }
            else {
                alert("Server unreachable")
            }
        }
        finally {
            setLoading(false)
        }
    }

    function HandleClick() {
        if (form.email == "" || form.password == "") {
            alert("Fill requied details first")
            setForm({ username: "", email: "", password: "" })
            navigate("/login")
            return 0;
        }
        const user = {
            email: form.email,
            password: form.password
        }
        LogIn(user);

        setForm({ email: "", password: "" })
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

            ) : (

                <div  className='bg-[rgba(255,255,255,0.4)]  h-150 w-100 rounded-lg p-8 hover:scale-105 transition-transform duration-500 '>

                    <div className='flex justify-center'>
                        <span className='flex flex-row justify-center items-center h-20 w-70 '><span className='flex flex-row'>
                            <span className="text-4xl font-bold text-green-700 mr-4">&lt;</span>
                            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-700 to-green-500 text-transparent bg-clip-text font-[cursive]'>E</h1><p className='text-xl font-medium mt-3 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text font-[cursive]'>xpenses</p></span><span className='flex flex-row'><h1 className='text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text font-[cursive]'>T</h1><p className='text-xl font-medium mt-3 bg-gradient-to-r from-blue-700 to-green-500 text-transparent bg-clip-text font-[cursive]'>racker</p>
                                <span className="text-4xl font-bold text-blue-700 ml-4">/&gt;</span>
                            </span></span>
                    </div>


                    <div className='font-bold text-3xl mb-15 flex justify-center'><h1>Login</h1></div>
                    <form className='w-full flex flex-col gap-2.5'>
                        <input className='border-2 rounded-lg p-2' type='email' placeholder='email' name='email' value={form.email} onChange={HandleChange}></input>
                        <input className='border-2 rounded-lg p-2' type='password' placeholder='password' name='password' value={form.password} onChange={HandleChange}></input>

                        <div className='w-full py-10 px-2 flex justify-center'>
                            <input className='bg-blue-500 border-2 border-green-900 rounded-lg px-2 py-1 font-medium text-2xl bg-gradient-to-b from-zinc-200 to-zinc-500' onClick={HandleClick} type='button' value={"Login"}></input>
                        </div>


                        <div className='flex justify-center'>
                            <span className='text-medium text-1.8xl'>Dont't have account ?  <span onClick={() => { navigate("/") }} className='text-bold text-blue-700'>Sign in</span></span>
                        </div>
                    </form>
                </div>
            )}

        </div>
    )
}

export default Login
