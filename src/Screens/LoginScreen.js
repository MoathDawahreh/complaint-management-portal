import React from 'react'
import {useState,useEffect } from 'react'
import Btn from '../components/Btn'
import axios from 'axios';

const LoginScreen = (props) => {

    const [userName,setUserName] = useState('')
    const [passowrd,setPassowrd] = useState('')
    const [admin,setAdmin] = useState(false)
    
     const [users, setUsers] = useState([])


    const onSubmit = (e) =>{
        e.preventDefault()
        if(!userName || !passowrd){
            alert("Please Enter the email and the password!!")
            return
        }

         setUserName('')
        setPassowrd('')
        setAdmin(false) 


        
        

    }
    useEffect(() => {

        console.log("in use effect")

        const getallusers = async () => {
            const usersSever = await fetchusers()
            setUsers(usersSever)
        
            // console.log(users)
          }
        

          getallusers()


        
        
      }, [])
 
 

      const fetchusers = async () => {
        const res = await fetch("http://localhost:5000/AllUsers")
        const data = await res.json()

        // console.log(users)
 
        return data
      }

  





    return (
        <form className="login-form" onSubmit={onSubmit} > 
            <div className='form-control'>
                {/* <label>task</label> */}
                <input type='text' placeholder='user name' value={userName} onChange={ (e)=> setUserName(e.target.value)} /> 

            </div>
            <div className='form-control'>
                {/* <label>day</label> */}
                <input type='text' placeholder='passowrd' value={passowrd} onChange={ (e)=> setPassowrd(e.target.value)} /> 

            </div>
            <div className='form-control form-control-check'>
                <label> Is Admin ? </label>
                <input type='checkbox' checked={admin} value={admin} onChange={ (e)=> setAdmin(e.currentTarget.checked)} /> 

            </div>

            <input className='btn' type='submit' value='Login'/>
            {/* <Btn text={"Login"} /> */}
            
        </form>
    )
}

export default LoginScreen
