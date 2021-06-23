import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AddComplaint from '../components/AddComplaint '
import Complaints from '../components/Complaints'
import { ComplaintsContext } from '../contexts/ComplaintxContext'
const UserScreen = (props) => {
	const { complaints, setComplaint } = useContext(ComplaintsContext)

	// to skip the first render and avoid calling with the inital empty value
	const [rendered, setRendered] = useState(false)
	const [Deletetoggle, setDeletetoggle] = useState(false)

	useEffect(() => {
		if (rendered) {
			const getcomplaints = async () => {
				const fetchComplaintsByUserId = async () => {
					const token = localStorage.getItem('token')

					const res = await fetch(
						'http://localhost:5000/api/complaintsByUser',
						{
							method: 'GET',
							headers: {
								'Content-type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
							// body: JSON.stringify(userId),
						}
					)
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

			// return () => {
			// 	console.log("cleanup");
			// 	clearInterval(getcomplaints);
			// }
		}

		if (!rendered) {
			setRendered(true)
		}
	}, [Deletetoggle, rendered, props.history, setComplaint])

	const AddAcomplaint = async (complaint) => {
		const newcomplaint = { complaint, status: 'Pending' }
		try {
			const res = await fetch('http://localhost:5000/api/add-complaint', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(newcomplaint),
			})

			const data = await res.json()
			console.log('res dataaa', data)

			setComplaint([...complaints, data])
		} catch (error) {
			console.error(error)
		}
	}

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
		<>
			<h1> User Screen </h1>
			<button onClick={props.Logout} className='logout'>
				Logout
			</button>

			<AddComplaint onAdd={AddAcomplaint} />
			<Complaints complaints={complaints} Delete={DeleteComplaint} />
		</>
	)
}

export default UserScreen
