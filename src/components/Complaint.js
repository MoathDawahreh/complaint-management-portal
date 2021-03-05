 
import React from 'react';


const Complaint = ({complaint}) => {
    return (
        <div>
            <h3>
                {complaint.text}
                
                
            </h3>
            <p>{complaint.status}</p>
            
        </div>
    )
}

export default Complaint
