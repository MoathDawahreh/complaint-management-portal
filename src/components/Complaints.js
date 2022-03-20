import Complaint from './Complaint'
import { useContext, useState, useEffect } from 'react'
import { ComplaintsContext } from '../contexts/ComplaintxContext'
import React from 'react'

const Complaints = (props, { Delete }) => {
	// const { complaints } = useContext(ComplaintsContext)
	const { complaints, setComplaint } = useContext(ComplaintsContext)
	const [Deletetoggle, setDeletetoggle] = useState(false)

	// const [complaints1, setcomplaints] = useState([])
	useEffect(() => {
		const getcomplaints = async () => {
			const fetchComplaintsByUserId = async () => {
				const token = localStorage.getItem('token')

				const res = await fetch('http://localhost:5000/api/complaintsByUser', {
					method: 'GET',
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					// body: JSON.stringify(userId),
				})
				const data = await res.json()
				if (data.message === 'Unauthorized!') {
					localStorage.clear()
					props.history.push('/')
				}

				return data
			}
			const fetchedComplaints = await fetchComplaintsByUserId()

			setComplaint(fetchedComplaints)
		}
		getcomplaints()
		return () => {
			// cleanup
		}
	}, [Deletetoggle, props.history, setComplaint])

	const DeleteComplaint = async (id) => {
		try {
			const res = await fetch('http://localhost:5000/api/DeleteAcomplaint', {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ id: id }),
			})
			const response = await res.json()
			alert(response.message)
			setDeletetoggle(!Deletetoggle)
		} catch (error) {
			throw error
		}
	}

	return (
		<React.Fragment>
			{complaints.map((complaint, i) => (
				<Complaint
					// key={complaint._id}
					key={i}
					complaint={complaint}
					selectvalue={i}
					Delete={DeleteComplaint}
				/>
			))}
		</React.Fragment>
	)
}

export default Complaints
