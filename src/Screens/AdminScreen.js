import React from 'react'
import {useState,useEffect } from 'react'
import Complaints from '../components/Complaints'

const AdminScreen = ({Logout}) => {
    const [complaints, setComplaint] = useState([
    
      ])

      useEffect(() => {
        const getcomplaints = async () => {
          const fetchedComplaints = await fetchcomplaints()
          setComplaint(fetchedComplaints)
        }
    
        getcomplaints()
      }, [])

      const fetchcomplaints = async () => {
        const res = await fetch('http://localhost:5000/api/GetAllComplaints')
        const data = await res.json()
        console.log(data)
    
        return data
      }

  
    return (

        <div><h1> Admin Screen </h1> 
          <button
        onClick={Logout}
         className='logout'>
        Logout
      </button>
            <Complaints complaints={complaints}/>
        </div>
        
        

            
    )
}

export default AdminScreen
