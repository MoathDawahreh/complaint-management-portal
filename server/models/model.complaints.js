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
     console.log("complaint in mongoose moudle scheeme",Complaint)
     Complaint.save()
    .then(callback).catch((err) =>{ console.log(err) })


}

exports.getAllComplaints = function (callback){
	Complaints.find()
	.then(callback)

}


exports.geComplaintsByUserId = function (userId,callback){
	Complaints.find({userId:userId})
	.then(callback)

}

exports.geComplaintById = function (userId,st,callback){
	// console.log("infindone and update")
	Complaints.findOneAndUpdate({_id:userId},{status:st})
	.then(callback)

}


