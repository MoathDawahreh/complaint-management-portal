import React from 'react'
import {useState,useEffect } from 'react'
import AddComplaint from '../components/AddComplaint '
import Complaints from '../components/Complaints'
const UserScreen = () => {

    const [complaints, setComplaint] = useState([
        {
          id: 1,
          text: "Course expried",
          status: "done"
        },
        {
          id: 2,
          text: "need some help",
          status: "done"
        },
          {
          id: 3,
          status: "Pending",
          text: "walk the dog"
        }
      ])

      const AddAcomplaint =  (complaint) => {
        console.log(complaint)
        const id = Math.floor(Math.random()*1000 )+1
    
        const newcomplaint = {id, ...complaint}
        setComplaint([...complaints,newcomplaint])
        
      }


    return (

        <><h1> User Screen </h1>

        <AddComplaint onAdd = {AddAcomplaint} />
        <Complaints complaints={complaints} />
         </>
        

            
    )
}

export default UserScreen
