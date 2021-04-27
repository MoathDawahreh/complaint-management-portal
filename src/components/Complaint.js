import React from 'react'

import { FaTimes } from 'react-icons/fa'

const Complaint = ({ selectvalue, complaint, Delete }) => {
	// onChange={ (e)=> setUpdatedComp({status:e.target.value,_id:complaint._id}

	return (
		<>
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
							selectvalue({ status: e.target.value, _id: complaint._id })
						}
					>
						<option value='pending '>pending </option>
						<option value='dismissed'>dismissed</option>
						<option value='resolved'>resolved</option>
					</select>
				</h3>

				<p>{complaint.status}</p>
			</div>
		</>
	)
}

export default Complaint
