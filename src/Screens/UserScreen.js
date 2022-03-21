import React from 'react'
import AddComplaint from '../components/AddComplaint '
import Complaints from '../components/Complaints'
const UserScreen = (props) => {
	return (
		<>
			<h1> User Screen </h1>
			<button onClick={props.Logout} className='logout'>
				Logout
			</button>

			<AddComplaint />
			<Complaints {...props} />
			{/* <div className='error-message ' id='2'>
				{errorMessage}
			</div> */}
		</>
	)
}

export default UserScreen
