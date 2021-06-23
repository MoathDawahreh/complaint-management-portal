import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import { UpdatedComplaintProvider } from './contexts/Updatedcomplaint'
ReactDOM.render(
	<React.StrictMode>
		{/* <UpdatedComplaintProvider> */}
		<App />
		{/* </UpdatedComplaintProvider> */}
	</React.StrictMode>,
	document.getElementById('root')
)
