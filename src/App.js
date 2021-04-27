import { useState, React } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import RegistrationScreen from './Screens/RegistrationScreen'
import UserScreen from './Screens/UserScreen'
import AdminScreen from './Screens/AdminScreen'
import axios from 'axios'

function App() {
	const [isSignedIn, setisSignedIn] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	// const isuserlogged = JSON.parse(localStorage.getItem('user'))

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		console.log('This will run after 5 second!')
	// 		refreshtoken()
	// 	}, 5000)
	// })

	const Register = async (signupdata, prop) => {
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

					setisSignedIn(true)
					setIsAdmin(res.data.isAdmin)
					// setlogedUser({ username: res.data.username, _id: res.data._id })
					prop.history.push('/')
				}
			})
	}

	const logIn = async (logindata, prop) => {
		axios
			.post('http://localhost:5000/api/login', logindata)
			.then((res) => {
				if (res.status === 200) {
					setIsAdmin(res.data.isAdmin)
					setisSignedIn(true)

					// setlogedUser({ username: res.data.username, _id: res.data._id })
					localStorage.setItem('token', res.data.accessToken)
					localStorage.setItem(
						'user',
						JSON.stringify({
							isAdmin: res.data.isAdmin,
						})
					)
					prop.history.push('/')
				}
			})
			.catch((error) => {
				alert('not registeted')
				console.log(error)
				return error
			})
	}

	const Logout = (prop) => {
		console.log('in logout func')
		// setlogedUser({ username: '', _id: '' })
		setisSignedIn(false)
		setIsAdmin(false)
		localStorage.clear()
		window.location.reload()
	}

	return (
		<div
			className='container'
			// style={{
			// 	backgroundColor: 'black',
			// }}
		>
			<Router>
				<Switch>
					<Route
						exact
						path='/Registration'
						render={(props) => (
							<RegistrationScreen
								{...props}
								Register={Register}
								logIn={logIn}
							/>
						)}
					/>
					<Route
						exact
						path={'/UserScreen'}
						render={(props) =>
							localStorage.getItem('token') !== null &&
							!JSON.parse(localStorage.getItem('user')).isAdmin ? (
								<UserScreen
									{...props}
									// logedUser={logedUser}
									SignedIn={isSignedIn}
									Logout={Logout}
								/>
							) : (
								<Redirect to='/Registration' />
							)
						}
					/>

					<Route
						exact
						path='/AdminScreen'
						render={(props) =>
							localStorage.getItem('token') !== null &&
							JSON.parse(localStorage.getItem('user')).isAdmin ? (
								<AdminScreen
									{...props}
									Logout={Logout}
									isAdmin={isAdmin}
									// logedUser={logedUser}
								/>
							) : (
								<Redirect to='/Registration' />
							)
						}
					/>

					<Route
						exact
						path={'/'}
						render={(props) =>
							localStorage.getItem('token') !== null &&
							!JSON.parse(localStorage.getItem('user')).isAdmin ? (
								<Redirect to='/UserScreen' />
							) : localStorage.getItem('token') !== null &&
							  JSON.parse(localStorage.getItem('user')).isAdmin ? (
								<Redirect to='/AdminScreen' />
							) : (
								<Redirect to='/Registration' />
							)
						}
					/>
				</Switch>
			</Router>
		</div>
	)
}

export default App
