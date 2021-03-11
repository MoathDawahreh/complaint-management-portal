import React from 'react'
import {useState,useEffect } from 'react'
import AddComplaint from '../components/AddComplaint '
import Complaints from '../components/Complaints'
import Header from '../components/Header'
const UserScreen = ({logedUser,Logout}) => {

  console.log("firstloggg",logedUser)

    const [complaints, setComplaint] = useState([
    
      ])

    

      const ShowComplaints = async () => {
        const userId ={userId:logedUser._id }
        console.log("passed",JSON.stringify(userId))


        try{
          const res = await fetch('http://localhost:5000/api/complaintsByUser', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(userId),
          })
      
          const data = await res.json()
          console.log("res dataaa",data)
          if(!data){
            alert ("your list is empty")
          }
          setComplaint(data)
          

      
   
        }catch (error) {
          console.error(error);
        }
       
      }

 
      const AddAcomplaint = async (complaint) => {
        console.log("Add complaint logged user id ",logedUser._id)
        const userId = logedUser._id
        const newcomplaint = {userId,complaint,status:"Pending"}
        try{
        const res = await fetch('http://localhost:5000/api/add-complaint', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(newcomplaint),
        })
    
        const data = await res.json()
        console.log("res dataaa",data)
    
        setComplaint([...complaints, data])
    
 
      }catch (error) {
        console.error(error);
      }

      }


      

    



    return (

        <><h1> User Screen </h1>
          <button
        onClick={Logout}
         className='logout'>
        Logout
      </button>

          <Header ShowComplaints ={ShowComplaints}/>
        
        <AddComplaint onAdd = {AddAcomplaint} />
        <Complaints complaints={complaints} />
         </>
        

            
    )
}

export default UserScreen
