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
	const [logedUser, setlogedUser] = useState({ username: '', _id: '' })
	// const isuserlogged = JSON.parse(localStorage.getItem('user'))
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
							username: res.data.username,
							_id: res.data._id,
							isAdmin: res.data.isAdmin,
						})
					)

					setisSignedIn(true)
					setIsAdmin(res.data.isAdmin)
					setlogedUser({ username: res.data.username, _id: res.data._id })
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

					setlogedUser({ username: res.data.username, _id: res.data._id })
					localStorage.setItem('token', res.data.accessToken)
					localStorage.setItem(
						'user',
						JSON.stringify({
							username: res.data.username,
							_id: res.data._id,
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
		setlogedUser({ username: '', _id: '' })
		setisSignedIn(false)
		setIsAdmin(false)
		localStorage.clear()
	}

	return (
		<div className='container'>
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
							JSON.parse(localStorage.getItem('user')) !== null &&
							!JSON.parse(localStorage.getItem('user')).isAdmin ? (
								<UserScreen
									{...props}
									logedUser={logedUser}
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
							JSON.parse(localStorage.getItem('user')) !== null &&
							JSON.parse(localStorage.getItem('user')).isAdmin ? (
								<AdminScreen
									{...props}
									Logout={Logout}
									isAdmin={isAdmin}
									logedUser={logedUser}
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
							JSON.parse(localStorage.getItem('user')) !== null &&
							!JSON.parse(localStorage.getItem('user')).isAdmin ? (
								<Redirect to='/UserScreen' />
							) : JSON.parse(localStorage.getItem('user')) !== null &&
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

	// return(
	// 	 isSignedIn && !isAdmin ?
	// 	<div className="container">
	// 		<UserScreen logedUser={logedUser} SignedIn={isSignedIn} Logout={Logout} />
	// 	</div>
	//  : isAdmin ?
	// 	<div className="container">
	// 		<AdminScreen Logout={Logout} isAdmin={isAdmin} logedUser={logedUser} />
	// 	</div>
	//  :
	// 	<div className="container">
	// 		<RegistrationScreen Register={Register} logIn={logIn} />
	// 	</div>
	// )
}

export default App
