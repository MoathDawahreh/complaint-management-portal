import Complaint from './Complaint'
import { useContext } from 'react'
import { ComplaintsContext } from '../contexts/ComplaintxContext'
import React from 'react'

const Complaints = ({ Delete }) => {
	const { complaints } = useContext(ComplaintsContext)
	return (
		<React.Fragment>
			{complaints.map((complaint, i) => (
				<Complaint
					// key={complaint._id}
					key={i}
					complaint={complaint}
					selectvalue={i}
					Delete={Delete}
				/>
			))}
		</React.Fragment>
	)
}

export default Complaints
