import React from 'react'
import {useState,useEffect } from 'react'
import Complaints from '../components/Complaints'

const AdminScreen = ({Logout,isAdmin}) => {

    const [complaints, setComplaint] = useState([])

    const [UpdatedComp,setUpdatedComp] = useState({
      _id: '',
      status:''
    })


    useEffect(() => {

      const getcomplaints = async () => {
        const fetchedComplaints = await fetchcomplaints()
        setComplaint(fetchedComplaints)
        }
    
        getcomplaints()
    }, [UpdatedComp])

      const fetchcomplaints = async () => {
        const res = await fetch('http://localhost:5000/api/GetAllComplaints')
        const data = await res.json()
        console.log(data)
    
        return data
      }

      
      const submit = async () => {

        try{
          const res = await fetch('http://localhost:5000/api/UpdateComplaintStatus', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(UpdatedComp),
          })
      
          const data = await res.json()
          console.log("res dataaa",data)
          setUpdatedComp({
            _id: '',
            status:''
        })

          alert("The complaint Status has been updated!!")
            
   
        }catch (error) {
          console.error(error);
        }
      
      }

  
    return (

        <div><h1> Admin Screen </h1> 
        <div className= 'Admbtns' >
          <button
        onClick={Logout}
         className='logout'>
        Logout
      </button>
      <button style={{background: "green"}}
        onClick={submit}
         className='logout'>
        Submit
      </button>
      </div>
            <Complaints complaints={complaints} isAdmin={isAdmin} selectvalue={(value)=>setUpdatedComp(value)} />
        </div>
        
        

            
    )
}

export default AdminScreen
