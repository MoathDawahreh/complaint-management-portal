import {useState,useEffect,React,useRef } from 'react'

import RegistrationScreen from './Screens/RegistrationScreen'
import UserScreen from './Screens/UserScreen'
import AdminScreen from './Screens/AdminScreen'
// import Complaints from './components/Complaints'
import axios from 'axios';

function App() {


 
  // const refContainer = useRef({});

  const [isSignedIn,setisSignedIn] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
  const [logedUser,setlogedUser] = useState({username:"",_id:""})

  
  const Register = (signupdata) =>{

    console.log("bing")

    axios.post('http://localhost:5000/api/add-user',signupdata)
    .then(res => console.log(res.data), setisSignedIn(true) )
  

}

useEffect(() => {

  console.log("appjs effect",logedUser)
    

}, [])



const logIn = (logindata) =>{

  console.log("bing")

  axios.post('http://localhost:5000/api/login',logindata)
  .then((res) => {
    
    setIsAdmin(res.data.isAdmin);  setisSignedIn(true)
    // console.log(res.data)
    setlogedUser({username:res.data.username,_id:res.data._id})
    // console.log()
    return res.data
  }  )
  .catch((error) => {
    alert ("not registeted")
    console.log(error.request);
    return error

  })


}

  
   return (
     
    // <div className="container">
    //      <LoginScreen refContainer ={refContainer}  />
    //      <UserScreen/>

    //  </div>


    isSignedIn && !isAdmin ? (
      <div className="container">
         <UserScreen logedUser={logedUser} />
         </div>
    ) : isAdmin? (
      <div className="container">

         <AdminScreen />
         </div>
    ) :(

      <div className="container">

         <RegistrationScreen   Register ={Register} logIn ={logIn}  />
         </div>

    )
     
  );
}

export default App;
