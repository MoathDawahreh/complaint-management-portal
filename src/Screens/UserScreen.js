import React from 'react'
import { useState, useEffect } from 'react'
import AddComplaint from '../components/AddComplaint '
import Complaints from '../components/Complaints'

const UserScreen = ({ logedUser, Logout }) => {
	const [complaints, setComplaint] = useState([])

	// to skip the first render and avoid calling with the inital value wich is empty
	const [rendered, setRendered] = useState(false)
	const [toggle, settoggle] = useState(false)

	useEffect(() => {
		if (rendered) {
			const getcomplaints = async () => {
				const fetchComplaintsByUserId = async () => {
					const userId = { userId: logedUser._id }
					const res = await fetch(
						'http://localhost:5000/api/complaintsByUser',
						{
							method: 'POST',
							headers: {
								'Content-type': 'application/json',
							},
							body: JSON.stringify(userId),
						}
					)
					const data = await res.json()
					console.log('fetched daaataa', data, 'userridd', userId)
					return data
				}
				const fetchedComplaints = await fetchComplaintsByUserId()

				setComplaint(fetchedComplaints)
			}
			getcomplaints()
		}

		if (!rendered) {
			setRendered(true)
		}
	}, [logedUser, toggle, rendered])

	// const fetchComplaintsByUserId = async () => {
	// 	const userId = { userId: logedUser._id }
	// 	const res = await fetch('http://localhost:5000/api/complaintsByUser', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-type': 'application/json',
	// 		},
	// 		body: JSON.stringify(userId),
	// 	})
	// 	const data = await res.json()
	// 	console.log('fetched daaataa', data, 'userridd', userId)
	// 	return data
	// }

	const AddAcomplaint = async (complaint) => {
		console.log('Add complaint logged user id ', logedUser._id)
		const userId = logedUser._id
		const newcomplaint = { userId, complaint, status: 'Pending' }
		try {
			const res = await fetch('http://localhost:5000/api/add-complaint', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
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
			settoggle(!toggle)
		} catch (error) {
			throw error
		}
	}

	return (
		<>
			<h1> User Screen </h1>
			<button onClick={Logout} className="logout">
				Logout
			</button>

			<AddComplaint onAdd={AddAcomplaint} />
			<Complaints complaints={complaints} Delete={DeleteComplaint} />
		</>
	)
}

export default UserScreen
