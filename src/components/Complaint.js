 
import React from 'react';
import { FaAlignJustify, FaTimes } from 'react-icons/fa'



const Complaint = ({complaint}) => {
    return (
        <div className="compliment" >
            <h3>
                {complaint.text}

                <FaTimes
                     style={{ color: 'red', cursor: 'pointer' }}
                        //  onClick={() => onDelete(complaint.id)}
        />
                
                
            </h3>
            <p>{complaint.status}</p>
            
        </div>
    )
}

export default Complaint
