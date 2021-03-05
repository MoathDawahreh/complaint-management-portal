import Complaint from './Complaint'

const Complaints = ({ complaints, deleteTask,onToggle }) => {
    return (
        <>
 
         {complaints.map((complaint) => (
          <Complaint key={complaint.id} complaint={complaint} />
        ))}
      </>
    )
}

export default Complaints
