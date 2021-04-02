const Users = require('./models/model.users')
const jwt = require("jsonwebtoken");


module.exports = {
	checkDuplicateUsernameOrEmail: (req, res, next) => {
		const username = req.body.username
		Users.FindUser(username, (err, user) => {

			if (err) return res.status(500).send({ message: err })
			if (user) return res.status(400).send({ message: `Failed! Username ${username} is already in use!` })
				
			next()
		})
	},
	
verifyToken : (req, res, next) => {
	console.log(req.headers["authorization"])
	let token = req.headers["authorization"].split(' ')[1]
  
	if (!token) return res.status(403).send({ message: "No token provided!" });
  
	jwt.verify(token, process.env.ACCESS_TOKENSECRET, (err, decoded) => {
	  if (err) return res.status(401).send({ message: "Unauthorized!" })
		console.log("decooded","1",decoded._id)
	  req.user = decoded
	 
	  next();
	});
  },

  

  
// isAdmin: (req, res, next) => {
// 	Users.findById(req.userId).exec((err, user) => {

// 	  if (err) return res.status(500).send({ message: err })
		
	 
//    res.status(403).send({ message: "Require Admin Role!" });
		  
		 
//  	})
//   },



//   checkRole: (req, res, next) => {

	
  
// 	next();
//   },


}
