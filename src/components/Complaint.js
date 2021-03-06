 
import React from 'react';
import { FaAlignJustify, FaTimes } from 'react-icons/fa'



const Complaint = ({complaint,isAdmin}) => {
    return (
        <div className="compliment" >
            <h3>
                {complaint.complaint}
                 <FaTimes 
                     style={{ color: 'red', cursor: 'pointer',display: !isAdmin ? "block" : "none"  }}
                        //  onClick={() => onDelete(complaint.id)} 
                        />

                    <select style={{ display: isAdmin ? "block" : "none" }} onChange={ (e)=> console.log(e.target.value)}>
                        <option value="pending ">pending </option>
                        <option value="dismissed">dismissed</option>
                        <option  value="resolved">resolved</option>
                 </select>
                                
                
            </h3>
  
            <p>{complaint.status}</p>
            
        </div>
    )
}

export default Complaint
