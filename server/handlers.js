const Users = require('./models/model.users')
const Complaints = require('./models/model.complaints')
var jwt = require('jsonwebtoken')

const { performance, PerformanceObserver } = require('perf_hooks')

const bcrypt = require('bcryptjs')

module.exports = {
	login: function (req, res) {
		if (!req.body.username || !req.body.pwd)
			return res
				.status(500)
				.send({ message: 'Username & password are required!' })
		const username = req.body.username
		const pwd = req.body.pwd
		const start = performance.now()
		Users.FindUser(username, function (err, user) {
			if (err) return res.status(500).send(err)
			if (user === null)
				return res
					.status(404)
					.send({ message: 'User does not exisit; please signU up!.' })

			const passwordIsValid = bcrypt.compareSync(pwd, user.pwd)
			if (!passwordIsValid || !user)
				return res.status(404).send({ message: 'incorrect password.' })

			let token = jwt.sign(
				{ username: user.username, _id: user._id, isAdmin: user.isAdmin },
				process.env.ACCESS_TOKENSECRET,
				{ expiresIn: '15m' }
			)
			// res.header(field, [value])
			// req.headers.append('token',token)
			res.header('token', token)
			// console.log(token)
			return res.status(200).send({
				username: user.username,
				isAdmin: user.isAdmin,
				_id: user._id,
				accessToken: token,
			})
		})
		const end = performance.now()
		console.log(`Excution time is :${end - start} ms`)
	},

	Registration: function (req, res) {
		const username = req.body.username
		const pwd = bcrypt.hashSync(req.body.pwd, 8)
		const isAdmin = req.body.isAdmin
		Users.SaveUser(username, pwd, isAdmin, function (user) {
			let token = jwt.sign(
				{ username: user.username, _id: user._id, isAdmin: user.isAdmin },
				process.env.ACCESS_TOKENSECRET,
				{ expiresIn: 40000 }
			)

			res.header('token', token)

			res.status(200).send(user)
		})
	},

	GetUsers: function (req, res) {
		Users.getAllusers(function (results) {
			res.send(results)
		})
	},

	AddComplaint: function (req, res) {
		const complaint = req.body.complaint
		const status = req.body.status
		const userId = req.user._id

		Complaints.SaveComplaint(
			complaint,
			status,
			userId,
			function (error, results) {
				if (error) return res.send(error)
				res.send(results)
			}
		)
	},

	GetComplaints: function (req, res) {
		Complaints.getAllComplaints(function (err, results) {
			if (err) return res.status(500).send(err)
			return res.send(results)
		})
	},

	GetComplaintsByUser: function (req, res) {
		const userId = req.user._id

		Complaints.getComplaintsByUserId(userId, function (err, results) {
			if (err) return res.status(500).send(err)
			res.status(200).send(results)
		})
	},

	UpdateComplaintStatus: function (req, res) {
		const id = req.body._id
		const st = req.body.status

		Complaints.UpdateComplaintStatusById(id, st, function (results) {
			res.send(results)
		})
	},
	DeleteAcomplaint: (req, res) => {
		const id = req.body.id
		Complaints.deleteAcomplaintById(id, () => {
			res.status(200).send({ message: 'The Complaint has been deleted!' })
		})
	},

	RefreshToken: (req, res) => {
		let RefreshedToken = jwt.sign(
			{
				username: req.user.username,
				_id: req.user._id,
				isAdmin: req.user.isAdmin,
			},
			process.env.REFRESH_TOKEN_SECRET
		)
		console.log('Refresheedd', RefreshedToken)
		res.header('RefreshedToken', RefreshedToken)

		res.status(200).send({ message: 'The Token has been refreshed!' })
	},
}
