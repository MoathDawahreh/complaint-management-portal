import Complaint from './Complaint'

const Complaints = ({ complaints,isAdmin,selectvalue }) => {
    return (
        <>
 
         {complaints.map((complaint) => (
          <Complaint key={complaint._id} complaint={complaint} isAdmin={isAdmin} selectvalue={selectvalue} />
        ))}
      </>
    )
}

export default Complaints
