import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// import { UpdatedComplaintProvider } from './contexts/Updatedcomplaint'
// ReactDOM.createRoot(

// 	document.getElementById('root')
// ).render(	<React.StrictMode>
// 	{/* <UpdatedComplaintProvider> */}
// 	<App />
// 	{/* </UpdatedComplaintProvider> */}
// </React.StrictMode>)


const root = document.getElementById('root');

ReactDOM.createRoot(root).render( <App />);
