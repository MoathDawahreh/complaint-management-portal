const Users = require('./models/model.users')

module.exports = {
	checkDuplicateUsernameOrEmail: (req, res, next) => {
		const username = req.body.username
		Users.FindUser(username, (err, user) => {

			if (err) return res.status(500).send({ message: err })
			if (user) return res.status(400).send({ message: `Failed! Username ${username} is already in use!` })
				
			next()
		})
	},
}
