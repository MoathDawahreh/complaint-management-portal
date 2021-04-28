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

function App() {
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		console.log('This will run after 5 second!')
	// 		refreshtoken()
	// 	}, 5000)
	// })

	const Logout = (prop) => {
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
						render={(props) => <RegistrationScreen {...props} />}
					/>
					<Route
						exact
						path={'/UserScreen'}
						render={(props) =>
							localStorage.getItem('token') !== null &&
							!JSON.parse(localStorage.getItem('user')).isAdmin ? (
								<UserScreen {...props} Logout={Logout} />
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
								<AdminScreen {...props} Logout={Logout} />
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
