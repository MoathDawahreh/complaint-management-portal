import React from 'react'
import {useState,useEffect } from 'react'
import Btn from '../components/Btn'
import axios from 'axios';
const RegistrationScreen = (props) => {

    const [userName,setUserName] = useState('')
    const [passowrd,setPassowrd] = useState('')
    const [admin,setAdmin] = useState(true)
    
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
            admin: admin

        }
        console.log(signupdata)
        props.Register(signupdata)

        // JSON.stringify(signupdata)

        // axios.post('http://localhost:5000/api/add-user',signupdata)
        // .then(res => console.log(res.data) )


        setUserName('')
        setPassowrd('')
        setAdmin(false) 
        
    }



    const LogInHandler = (e) =>{
        e.preventDefault()
        if(!userName || !passowrd){
            alert("Please Enter the email and the password!!")
            return
        }
        console.log("not ready yet lol")
        setUserName('')
        setPassowrd('')
        setAdmin(false) 

        
        

    }
    



    return (
        <>
        {/* <Btn text={toggle ? 'Register' : 'Login'} onSubmit={()=>{ settoggle(!toggle)  }} /> */}

        <form className="login-form"  > 
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

            {/* <input className='btn' type='submit' value='Register'/> */}
           {/* <label> Dont have account? </label>  */}

            <Btn  text ={'Login'}  onSubmit={LogInHandler}/>

            <Btn  text ={'Register'}  onSubmit={RegisterHandler}/>


        </form>
    </>        
    )
}

export default RegistrationScreen
