const Users = require('./models/model.users')
const jwt = require('jsonwebtoken')

module.exports = {
	checkDuplicateUsernameOrEmail: (req, res, next) => {
		if (!req.body.username || !req.body.pwd)
			return res
				.status(500)
				.send({ message: 'Username & password are required!' })

		const username = req.body.username
		Users.FindUser(username, (err, user) => {
			if (err) return res.status(500).send({ message: err })
			if (user)
				return res
					.status(400)
					.send({ message: `Failed! Username ${username} is already in use!` })

			res.header('Access-Control-Expose-Headers', 'token')

			next()
		})
	},

	verifyToken: (req, res, next) => {
		let token = req.headers['authorization'].split(' ')[1]

		if (!token) return res.status(403).send({ message: 'Unauthorized!' })

		jwt.verify(token, process.env.ACCESS_TOKENSECRET, (err, decoded) => {
			if (err) return res.status(401).send({ message: 'Unauthorized!' })
			req.user = decoded

			next()
		})
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
