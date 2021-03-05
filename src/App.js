import {useState,useEffect,React,useRef } from 'react'

import RegistrationScreen from './Screens/RegistrationScreen'
import UserScreen from './Screens/UserScreen'
import axios from 'axios';

function App() {

 
  // const refContainer = useRef({});

  const [isSignedIn,setisSignedIn] = useState(false)

  
  const Register = (signupdata) =>{

    console.log("bing")

    axios.post('http://localhost:5000/api/add-user',signupdata)
    .then(res => console.log(res.data), setisSignedIn(true) )
  

}


const logIn = (signupdata) =>{

  console.log("bing")

  axios.post('http://localhost:5000/api/add-user',signupdata)
  .then(res => console.log(res.data), setisSignedIn(true) )


}



  
   return (
     
    // <div className="container">
    //      <LoginScreen refContainer ={refContainer}  />
    //      <UserScreen/>

    //  </div>


    isSignedIn ? (
      <div className="container">
         <UserScreen/>
         </div>
    ) : (
      <div className="container">

         <RegistrationScreen   Register ={Register}  />
         </div>
    )
     
  );
}

export default App;
