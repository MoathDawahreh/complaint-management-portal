import React from 'react'
import { useState, useContext } from 'react'
import { ComplaintsContext } from '../contexts/ComplaintxContext'

const AddComplaint = () => {
	const [text, setText] = useState('')
	const { complaints, setComplaint } = useContext(ComplaintsContext)
	const [errorMessage, setError] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()
		console.log(e)
		if (!text) {
			// alert('Please insert a complmnet')
			setError('Please insert a complmnet!')
		} else {
			AddAcomplaint(text)
			setText('')
		}
	}

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
	return (
		<>
			<form className='add-form' onSubmit={onSubmit}>
				<div className='form-control'>
					<input
						type='text'
						placeholder='Add a complaint ...'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>

				<div className='form-control form-control-check'></div>

				<input className='btn btn-block' type='submit' value='Add' />
			</form>
			<div className='error-message ' id='2'>
				{errorMessage}
			</div>
		</>
	)
}

export default AddComplaint
