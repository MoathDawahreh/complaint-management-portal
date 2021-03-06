const Users = require('./models/model.users')
const Complaints = require('./models/model.complaints')




module.exports = {


    login: function(req, res){
		var username = req.body.username;
        var pwd = req.body.pwd

        // console.log("the body pwwd",res.body)

		Users.FindUser(username,function(user){


            if (!user || pwd !== user.pwd ) {
                return res.status(404).send({ message: "incorrect username or pwd." });
              }

              res.status(200).send({
                  username: user.username,
                  isAdmin: user.isAdmin,
                  _id: user._id
                })
            // res.send(user)
            console.log("git all users function",pwd)
		})
	},

   
	Adduser: function(req, res){

        console.log("boddy the ct", req.body)
       var username = req.body.username;
       var pwd = req.body.pwd;
       var isAdmin = req.body.isAdmin;
  
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

        var complaint = req.body.complaint;
        var status = req.body.status;
        var userId = req.body.userId;

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

        Complaints.geComplaintsByUserId(userId,function (results){
            res.send(results)
            console.log(results)
        })
    }






}