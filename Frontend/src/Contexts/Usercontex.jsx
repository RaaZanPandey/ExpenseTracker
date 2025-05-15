import React, { use } from 'react'
import { useState, createContext } from 'react'

export const UserContex = createContext();


const UserProvider = ({children}) => {
  const [username, setUsername] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  return (
   <UserContex.Provider value={{username, setUsername, income, setIncome, expenses, setExpenses}}>
    {children}
   </UserContex.Provider>
  )
}

export default UserProvider
 

