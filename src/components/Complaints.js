import Complaint from './Complaint'

const Complaints = ({ complaints, isAdmin, selectvalue, Delete }) => {
	return (
		<>
			{complaints.map((complaint) => (
				<Complaint
					key={complaint._id}
					complaint={complaint}
					isAdmin={isAdmin}
					selectvalue={selectvalue}
					Delete={Delete}
				/>
			))}
		</>
	)
}

export default Complaints
