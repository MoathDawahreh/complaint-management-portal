import React from 'react'
import { useState } from 'react'
import Btn from '../components/Btn'
import { Link } from 'react-router-dom'

import axios from 'axios'

const RegistrationScreen = (props) => {
	const [userName, setUserName] = useState('')
	const [passowrd, setPassowrd] = useState('')
	const [admin, setAdmin] = useState(false)
	const [Log, setLog] = useState(true)

	const RegisterHandler = (e) => {
		e.preventDefault()
		if (!userName || !passowrd) {
			alert('Please Enter the email and the password!!')
			return
		}
		const signupdata = {
			username: userName,
			pwd: passowrd,
			isAdmin: admin,
		}
		axios
			.post('http://localhost:5000/api/Registration', signupdata)
			.then((res) => {
				if (res.status === 200) {
					console.log('headerrrs', res.headers)
					console.log('dadtaa', res.data, 'sdf', res)
					localStorage.setItem('token', res.headers.token)
					localStorage.setItem(
						'user',
						JSON.stringify({
							isAdmin: res.data.isAdmin,
						})
					)

					props.history.push('/')
				}
			})
		setUserName('')
		setPassowrd('')
		setAdmin(false)
	}

	const LogInHandler = async (e) => {
		e.preventDefault()
		if (!userName || !passowrd)
			return alert('Please Enter the email and the password!!')

		const logindata = {
			username: userName,
			pwd: passowrd,
		}
		axios
			.post('http://localhost:5000/api/login', logindata)
			.then((res) => {
				if (res.status === 200) {
					localStorage.setItem('token', res.data.accessToken)
					localStorage.setItem(
						'user',
						JSON.stringify({
							isAdmin: res.data.isAdmin,
						})
					)
					props.history.push('/')
				}
			})
			.catch((error) => {
				alert('not registeted')
				console.log(error)
				return error
			})

		setUserName('')
		setPassowrd('')
		setAdmin(false)
	}

	// const handleloginauth = (props) => {
	// 	console.log('handl auth', props.history)
	// 	props.history.push('/UserScreen')
	// }

	return (
		<>
			<form className='login-form'>
				<div className='form-control'>
					{/* <label>task</label> */}
					<input
						type='text'
						placeholder='user name'
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div className='form-control'>
					{/* <label>day</label> */}
					<input
						type='text'
						placeholder='passowrd'
						value={passowrd}
						onChange={(e) => setPassowrd(e.target.value)}
					/>
				</div>
				<div
					className='form-control form-control-check'
					style={{ display: Log ? 'none' : 'flex' }}
				>
					<label> Is Admin ? </label>
					<input
						type='checkbox'
						checked={admin}
						value={admin}
						onChange={(e) => setAdmin(e.currentTarget.checked)}
					/>
				</div>

				<div style={{ display: Log ? 'block' : 'none' }}>
					<Btn text={'Login'} onSubmit={LogInHandler} />{' '}
				</div>

				<div style={{ display: Log ? 'none' : 'block' }}>
					<Btn text={'Register'} onSubmit={RegisterHandler} />{' '}
				</div>

				<div>
					<Link to='/Registration' onClick={() => setLog(!Log)}>
						{Log ? 'Register' : 'LogIn'}
					</Link>
				</div>
			</form>
		</>
	)
}

export default RegistrationScreen
