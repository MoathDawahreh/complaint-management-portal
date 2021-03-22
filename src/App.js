import {useState,React } from 'react'

import RegistrationScreen from './Screens/RegistrationScreen'
import UserScreen from './Screens/UserScreen'
import AdminScreen from './Screens/AdminScreen'
import axios from 'axios';

function App() {

  const [isSignedIn,setisSignedIn] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
  const [logedUser,setlogedUser] = useState({username:"",_id:""})

  
  const Register = (signupdata) =>{

    axios.post('http://localhost:5000/api/add-user',signupdata)
    .then((res) => { setisSignedIn(true)
      setIsAdmin(res.data.isAdmin)
      setlogedUser({username:res.data.username,_id:res.data._id})

    }
     
    )
  

}

 


const logIn = async (logindata) =>{

  axios.post('http://localhost:5000/api/login',logindata)
  .then((res) => {
    
    setIsAdmin(res.data.isAdmin);  setisSignedIn(true)
    console.log(res.data)
    setlogedUser({username:res.data.username,_id:res.data._id})
    //  return res.data
  }  )
  .catch((error) => {
    alert ("not registeted")
    console.log(error);
    return error

  })


}

 const Logout = ()=>{

  setlogedUser({username:"",_id:""})
  setisSignedIn(false)
  setIsAdmin(false)

 
 }

  
   return (

    isSignedIn && !isAdmin ? (
      
      <div className="container">
         <UserScreen logedUser={logedUser}  SignedIn ={isSignedIn} Logout={Logout}/>
       
         </div>
    ) : isAdmin? (
      <div className="container">

         <AdminScreen Logout={Logout} isAdmin={isAdmin} logedUser={logedUser} />
         </div>
    ) :(

      <div className="container">

         <RegistrationScreen   Register ={Register} logIn ={logIn}  />
         </div>

    )
     
  );
}

export default App;
