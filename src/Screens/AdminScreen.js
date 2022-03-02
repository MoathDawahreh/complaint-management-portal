import React, { useContext } from 'react'
import { useEffect } from 'react'
import Complaints from '../components/Complaints'
import { ComplaintsContext } from '../contexts/ComplaintxContext'
const AdminScreen = ({ Logout }) => {
	const { complaints, setComplaint, UpdatedComp, setUpdatedComp } =
		useContext(ComplaintsContext)

	console.log('complaainnssscont', complaints)

	useEffect(() => {
		const getcomplaints = async () => {
			const fetchedComplaints = await fetchcomplaints()
			setComplaint(fetchedComplaints)
		}

		getcomplaints()
	}, [UpdatedComp, setComplaint])

	const fetchcomplaints = async () => {
		try {
			const token = localStorage.getItem('token')

			const res = await fetch('http://localhost:5000/api/GetAllComplaints', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			const data = await res.json()

			console.log('dataaa', data)
			if (res.status === 200) {
				return data
			}
			if (data.message === 'Unauthorized!') {
				localStorage.clear()
				window.location.reload()
				return
			}
		} catch (error) {
			console.error(error)
		}
	}

	const submit = async () => {
		try {
			const res = await fetch(
				'http://localhost:5000/api/UpdateComplaintStatus',
				{
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(UpdatedComp),
				}
			)

			const data = await res.json()
			console.log('res dataaa', data)
			setUpdatedComp({
				_id: '',
				status: '',
			})
			// window.location.reload()

			alert('The complaint Status has been updated!!')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<h1> Admin Screen </h1>
			<div className='Admbtns'>
				<button onClick={Logout} className='logout'>
					Logout
				</button>
				<button
					style={{ background: 'green' }}
					onClick={submit}
					className='logout'
				>
					Submit
				</button>
			</div>
			<Complaints
				complaints={complaints}
				// selectvalue={(value) => setUpdatedComp(value)}
			/>
		</div>
	)
}

export default AdminScreen
