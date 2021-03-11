import React from 'react'
import {useState,useEffect } from 'react'
import Btn from '../components/Btn'

const RegistrationScreen = (props) => {

    const [userName,setUserName] = useState('')
    const [passowrd,setPassowrd] = useState('')
    const [admin,setAdmin] = useState(false)
    const [Log,setLog] = useState(true)

     const [toggle, settoggle] = useState(true)
    //  props.refContainer.current = admin

     const RegisterHandler = (e) =>{
        e.preventDefault()
        if(!userName || !passowrd){
            alert("Please Enter the email and the password!!")
            return
        }
         const signupdata = {
            username: userName,
            pwd: passowrd,
            isAdmin: admin

        }
        console.log(signupdata)
        props.Register(signupdata)

        setUserName('')
        setPassowrd('')
        setAdmin(false) 
        
    }



    const LogInHandler = (e) =>{
        e.preventDefault()
        if (!userName || !passowrd){
            alert("Please Enter the email and the password!!")
            return
        }

        const logindata = {
            username: userName,
            pwd: passowrd,
 
        }
         props.logIn(logindata)

        setUserName('')
        setPassowrd('')
        setAdmin(false) 

        
        

    }
    



    return (
        <>

        <form className="login-form"  > 
            <div className='form-control'>
                {/* <label>task</label> */}
                <input type='text' placeholder='user name' value={userName} onChange={ (e)=> setUserName(e.target.value)} /> 

            </div>
            <div className='form-control'>
                {/* <label>day</label> */}
                <input type='text' placeholder='passowrd' value={passowrd} onChange={ (e)=> setPassowrd(e.target.value)} /> 

            </div>
            <div  className='form-control form-control-check' style={{ display: Log ? "none" : "flex" }}  >
                <label> Is Admin ? </label>
                <input   type='checkbox' checked={admin} value={admin} onChange={ (e)=> setAdmin(e.currentTarget.checked)}  /> 

            </div>


            <div style={{ display: Log ? "block" : "none" }} >
            <Btn  text ={'Login'}  onSubmit={LogInHandler}/> </div>

            <div  style={{ display: Log ? "none" : "block" }}>
            <Btn  text ={'Register'}  onSubmit={RegisterHandler} /> </div>

            <div>
             <a href="#" onClick={() =>  setLog(!Log) }>   {Log ? "Register" :"LogIn"}  </a>
            </div>

        </form>
    </>        
    )
}

export default RegistrationScreen
