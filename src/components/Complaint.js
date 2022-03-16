import React, { useContext } from 'react'

import { FaTimes } from 'react-icons/fa'
import { ComplaintsContext } from '../contexts/ComplaintxContext'
const Complaint = ({ complaint, Delete }) => {
	// onChange={ (e)=> setUpdatedComp({status:e.target.value,_id:complaint._id}

	const { setUpdatedComp } = useContext(ComplaintsContext)

	return (
		<React.Fragment>
			<div className='compliment'>
				<h3>
					{complaint.complaint}
					<FaTimes
						style={{
							color: 'red',
							cursor: 'pointer',
							display: !JSON.parse(localStorage.getItem('user')).isAdmin
								? 'block'
								: 'none',
						}}
						onClick={() => Delete(complaint._id)}
					/>

					<select
						style={{
							display: JSON.parse(localStorage.getItem('user')).isAdmin
								? 'block'
								: 'none',
						}}
						onChange={(e) =>
							// selectvalue({ status: e.target.value, _id: complaint._id })
							setUpdatedComp({ status: e.target.value, _id: complaint._id })
						}
					>
						<option value='pending '>pending </option>
						<option value='dismissed'>dismissed</option>
						<option value='resolved'>resolved</option>
					</select>
				</h3>

				<p>{complaint.status}</p>
			</div>
		</React.Fragment>
	)
}

export default Complaint
