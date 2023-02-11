//By Moath Thawahreh

import { useState, React } from 'react'
import {
	BrowserRouter as Router,
	Routes ,
	Route,
	Navigate,
} from 'react-router-dom'
import RegistrationScreen from './Screens/RegistrationScreen'
import UserScreen from './Screens/UserScreen'
import AdminScreen from './Screens/AdminScreen'
import { ComplaintsContext } from './contexts/ComplaintxContext'
import axios from 'axios'

axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		console.log(
			'Hello from Johan :) jsut wanna see your request on the way',
			config
		)
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// axios.interceptors.response.use()
function App() {
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		console.log('This will run after 5 second!')
	// 		refreshtoken()
	// 	}, 5000)
	// })
	const [complaints, setComplaint] = useState([])
	const [UpdatedComp, setUpdatedComp] = useState({
		_id: '',
		status: '',
	})

	const Logout = (prop) => {
		localStorage.clear()
		window.location.reload()
	}

	return (
		<div className='container'>  
			<ComplaintsContext.Provider
				value={{ complaints, setUpdatedComp, setComplaint, UpdatedComp }}
			>
				<Router>
					<Routes >
						<Route
							exact
							path='/Registration'
							element={ <RegistrationScreen  />}
						/>
						<Route
							exact
							path={'/UserScreen'}
							element={ 
								localStorage.getItem('token') !== null &&
								!JSON.parse(localStorage.getItem('user')).isAdmin ? (
									<UserScreen   Logout={Logout} />
								) : (
									<Navigate to='/Registration' />
								)
							}
						/>

						<Route
							exact
							path='/AdminScreen'
							element={ 
								localStorage.getItem('token') !== null &&
								JSON.parse(localStorage.getItem('user')).isAdmin ? (
									// <UpdatedComplaintProvider>
									<AdminScreen   Logout={Logout} />
								) : (
									// </UpdatedComplaintProvider>
									<Navigate to='/Registration' />
								)
							}
						/>

						<Route
							exact
							path={'/'}
							element={ 
								localStorage.getItem('token') !== null &&
								!JSON.parse(localStorage.getItem('user')).isAdmin ? (
									<Navigate to='/UserScreen' />
								) : localStorage.getItem('token') !== null &&
								  JSON.parse(localStorage.getItem('user')).isAdmin ? (
									<Navigate to='/AdminScreen' />
								) : (
									<Navigate to='/Registration' />
								)
							}
						/>
					</Routes >
				</Router>
			</ComplaintsContext.Provider>
		</div>
	)
}

export default App
