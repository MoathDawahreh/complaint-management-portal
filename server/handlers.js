const Users = require('./models/model.users')
const Complaints = require('./models/model.complaints')

const bcrypt = require('bcryptjs')




module.exports = {

    login: function(req, res){

		const username = req.body.username;
        const pwd = req.body.pwd

		Users.FindUser(username,function(user){

            const passwordIsValid = bcrypt.compareSync(pwd, user.pwd )

            if (!passwordIsValid ) return res.status(404).send({ message: "incorrect username or password." });

              res.status(200).send({
                  username: user.username,
                  isAdmin: user.isAdmin,
                  _id: user._id
                })

		})
	},

   
	Registration: function(req, res){

        console.log("boddy the ct", req.body)
        const username = req.body.username;
        const pwd = bcrypt.hashSync(req.body.pwd, 8)
        // req.body.pwd;
        const isAdmin = req.body.isAdmin;

        Users.SaveUser(username,pwd,isAdmin,function(result){

            res.send(result)
            console.log("saaaaaaaved",result)

        })
		
	},

    GetUsers : function(req,res){

        Users.getAllusers(function (results){
            res.send(results)
            console.log(results)
        })
    },


    AddComplaint : function(req,res){

        const complaint = req.body.complaint;
        const status = req.body.status;
        const userId = req.body.userId;

        Complaints.SaveComplaint(complaint,status,userId,function (results){
            res.send(results)
            console.log("Addd complaint handler results",results)
        })
    },

    GetComplaints : function(req,res){

        Complaints.getAllComplaints(function (results){
            res.send(results)
            console.log(results)
        })
    },

    GetComplaintsByUser : function(req,res){
        userId =req.body.userId

        Complaints.getComplaintsByUserId(userId,function (results){
            res.send(results)
            console.log(results)
        })
    },

    UpdateComplaintStatus : function(req,res){
        id = req.body._id
        st = req.body.status

        Complaints.geComplaintById(id,st,function (results){
            res.send(results)
            console.log(results)
           
        })
    },
    DeleteAcomplaint : (req,res) => {

        id = req.body.id
        Complaints.deleteAcomplaintById(id, ()=> {
            res.status(200).send({message:"The Complaint has been deleted!"})
            // res.send("The Complaint has been deleted!")

        })

    }





}