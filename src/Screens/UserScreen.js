import React from 'react'
import {useState,useEffect } from 'react'
import AddComplaint from '../components/AddComplaint '
import Complaints from '../components/Complaints'
const UserScreen = () => {

    const [complaints, setComplaint] = useState([
        {
          _id: 1,
          complaint: "Course expried",
          status: "done"
        },
        {
          _id: 2,
          complaint: "need some help",
          status: "done"
        },
          {
            _id: 3,
          status: "Pending",
          complaint: "walk the dog"
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
