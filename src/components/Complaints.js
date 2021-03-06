import Complaint from './Complaint'

const Complaints = ({ complaints }) => {
    return (
        <>
 
         {complaints.map((complaint) => (
          <Complaint key={complaint._id} complaint={complaint} />
        ))}
      </>
    )
}

export default Complaints
