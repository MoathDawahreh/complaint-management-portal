import Complaint from './Complaint'
import { useContext } from 'react'
import { ComplaintsContext } from '../contexts/ComplaintxContext'

const Complaints = ({ Delete }) => {
	const { complaints } = useContext(ComplaintsContext)
	return (
		<>
			{complaints.map((complaint) => (
				<Complaint
					key={complaint._id}
					complaint={complaint}
					// selectvalue={selectvalue}
					Delete={Delete}
				/>
			))}
		</>
	)
}

export default Complaints
