import Complaint from './Complaint'

const Complaints = ({ complaints, isAdmin, selectvalue, Delete }) => {
	console.log('ddddddddddd', complaints.message === 'Unauthorized!')
	return (
		// complaints.message !== 'Unauthorized!' ? (
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
	// ) : (
	// 	<>
	// 		<h1> what are you doin here bitch </h1>
	// 	</>
	// )
}

export default Complaints
