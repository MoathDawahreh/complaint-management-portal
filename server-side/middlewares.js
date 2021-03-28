const Users = require('./models/model.users')

module.exports = {
	checkDuplicateUsernameOrEmail: (req, res, next) => {
		const username = req.body.username
		Users.FindUser(username, (err, user) => {
			console.log('exe call bask')
			if (err) {
				res.status(500).send({ message: err })
				return
			}

			if (user) {
				res.status(400).send({ message: 'Failed! Username is already in use!' })
				return
			}
			next()
		})
	},
}
