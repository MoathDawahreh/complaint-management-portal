const mongoose = require ('mongoose')
const dbconnection = require('../db/dbconnection')


const ComplaintSchema  = new mongoose.Schema ({
		
	complaint: {

		type: String,
		required: "Required"
	},

	status : {
		type: String,
		required: "Required"
	},
	userId : {
		type: String,
		required: "Required"

	}
 

})



const Complaints = mongoose.model('Complaints', ComplaintSchema);

exports.SaveComplaint = function(complaint,status,userId,callback){
		

    const Complaint = new Complaints({complaint: complaint, status: status, userId:userId})
     Complaint.save().then(callback)
	 console.log("complaint in mongoose moudle scheeme",Complaint)



}

exports.getAllComplaints = function (callback){
	Complaints.find()
	.exec(callback)

}


exports.getComplaintsByUserId = function (userId,callback){
	Complaints.find({userId:userId})
	.exec(callback)

}

exports.UpdateComplaintStatusById = function (id,st,callback){
	// console.log("infindone and update")
	Complaints.findOneAndUpdate({_id:id},{status:st})
	.then(callback)

}

exports.deleteAcomplaintById = (id,callback)=> {
	Complaints.deleteOne({ _id: id })
	.then(callback).catch((err) =>{ throw err })

}


