import { createContext } from 'react'

export const ComplaintsContext = createContext()

// export const ComplaintsContextProvider = ({ childern }) => {
// 	const [complaints, setComplaint] = useState([])

// 	return (
// 		<ComplaintsContext.Provider value={{ complaints, setComplaint }}>
// 			{childern}
// 		</ComplaintsContext.Provider>
// 	)
// }
