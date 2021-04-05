import { useState, React, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
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

	// useEffect(() => {

	// 	}
	// }, [isSignedIn,isAdmin,logedUser ])

	const Register = (signupdata) => {
		axios
			.post('http://localhost:5000/api/Registration', signupdata)
			.then((res) => {
				setisSignedIn(true)
				setIsAdmin(res.data.isAdmin)
				setlogedUser({ username: res.data.username, _id: res.data._id })
			})
	}

	const logIn = async (logindata, prop) => {
		axios
			.post('http://localhost:5000/api/login', logindata)
			.then((res) => {
				if (res.status === 200) {
					setIsAdmin(res.data.isAdmin)
					setisSignedIn(true)
					console.log('data', res.data)
					console.log('headers', res.headers)
					setlogedUser({ username: res.data.username, _id: res.data._id })
					localStorage.setItem('token', res.data.accessToken)
					console.log('appp jsjs login history', prop.history)
					if (res.data.username.isAdmin === true) {
						prop.history.push('/AdminScreen')
					} else {
						prop.history.push('/UserScreen')
						console.log(res.data.isAdmin)
					}
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
		<div className="container">
			<Router>
				<Switch>
					<Route
						exact
						path={'/UserScreen' || '/AdminScreen' || '/'}
						render={(props) =>
							isSignedIn && !isAdmin ? (
								<Redirect to="/UserScreen" />
							) : isAdmin && isSignedIn ? (
								<Redirect to="/AdminScreen" />
							) : (
								<Redirect to="/Registration" />
							)
						}
					/>
				</Switch>
				<Route
					exact
					path="/"
					render={(props) => <Redirect to="/Registration" />}
				/>

				<Route
					exact
					path="/Registration"
					render={(props) => (
						<RegistrationScreen {...props} Register={Register} logIn={logIn} />
					)}
				/>
				<Route
					exact
					path={'/UserScreen'}
					render={(props) => (
						<UserScreen
							{...props}
							logedUser={logedUser}
							SignedIn={isSignedIn}
							Logout={Logout}
						/>
					)}
				/>

				<Route
					exact
					path="/AdminScreen"
					render={(props) => (
						<AdminScreen
							{...props}
							Logout={Logout}
							isAdmin={isAdmin}
							logedUser={logedUser}
						/>
					)}
				/>
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
