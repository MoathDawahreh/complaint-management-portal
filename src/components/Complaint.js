 
import React from 'react';
import {useState } from 'react'

import { FaAlignJustify, FaTimes } from 'react-icons/fa'



const Complaint = ({selectvalue,complaint,isAdmin}) => {
  
    console.log("inn complain",selectvalue)
    // onChange={ (e)=> setUpdatedComp({status:e.target.value,_id:complaint._id}

    return (
        <>
       
        <div className="compliment" >
            <h3>
                {complaint.complaint}
                 <FaTimes 
                     style={{ color: 'red', cursor: 'pointer',display: !isAdmin ? "block" : "none"  }}
                        //  onClick={() => onDelete(complaint.id)} 
                        />

                    <select style={{ display: isAdmin ? "block" : "none" }} onChange={ (e)=> selectvalue({status:e.target.value,_id:complaint._id})  }>
                        <option value="pending ">pending </option>
                        <option value="dismissed">dismissed</option>
                        <option  value="resolved">resolved</option>
                 </select>
                                
                
            </h3>
  
            <p>{complaint.status}</p>
            
        </div>
        </>
    )
}

export default Complaint
