const mongoose = require('mongoose')
const dbconnection = require('../db/dbconnection')

const UsersSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: 'Required',
		},

		pwd: {
			type: String,
			required: 'Required',
		},
		isAdmin: {
			type: Boolean,
			required: 'Required',
		},
	},
	{ timestamps: true }
)

const Users = mongoose.model('Users', UsersSchema)

exports.SaveUser = function (username, pwd, isAdmin, callback) {
	const User = new Users({ username: username, pwd: pwd, isAdmin: isAdmin })
	console.log('User in mongoose moudle scheeme', User)
	User.save()
		.then(callback)
		.catch((err) => {
			console.log(err)
		})
}

exports.getAllusers = function (callback) {
	Users.find()
		.then(callback)
		.catch((err) => {
			console.log(err)
		})
}

exports.FindUser = function (username, callback) {
	Users.findOne({ username: username }).exec(callback)
}

// module.exports = {SaveUser,}
