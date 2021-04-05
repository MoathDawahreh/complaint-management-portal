const Users = require('./models/model.users')
const Complaints = require('./models/model.complaints')
var jwt = require("jsonwebtoken");
const express = require('express')
const app = express()

const { performance, PerformanceObserver } = require('perf_hooks')

const bcrypt = require('bcryptjs')

module.exports = {
	login: function (req, res) {
		const username = req.body.username
		const pwd = req.body.pwd
		const start = performance.now()
		console.log(req.body)
		Users.FindUser(username, function (err, user) {

			if(user === null) return res.status(404).send({ message: 'incorrect username or password.' })
			const passwordIsValid = bcrypt.compareSync(pwd, user.pwd)
			if (!passwordIsValid || !user ) return res.status(404).send({ message: 'incorrect username or password.' })

			let token = jwt.sign({ username: user.username ,_id: user._id,isAdmin: user.isAdmin },process.env.ACCESS_TOKENSECRET,{expiresIn: 40000 })
			// res.header(field, [value])
			// req.headers.append('token',token)
			res.header('token' , token )

			res.status(200).send({
				username: user.username,
				isAdmin: user.isAdmin,
				_id: user._id,
				accessToken: token
			})
			// console.log("login",req.headers)

		})
		const end = performance.now()
		console.log(`Excution time is :${end - start} ms`)
	},

	Registration: function (req, res) {
		console.log('boddy the ct', req.body)
		const username = req.body.username
		const pwd = bcrypt.hashSync(req.body.pwd, 8)
		// req.body.pwd;
		const isAdmin = req.body.isAdmin

		Users.SaveUser(username, pwd, isAdmin, function (result) {
			res.send(result)
			console.log('saaaaaaaved', result)
		})
	},

	GetUsers: function (req, res) {
		Users.getAllusers(function (results) {
			res.send(results)
			console.log(results)
		})
	},

	AddComplaint: function (req, res) {
		const complaint = req.body.complaint
		const status = req.body.status
		const userId = req.body.userId

		Complaints.SaveComplaint(complaint, status, userId, function (error, results) {

			if (error) return res.send(error)
			res.send(results)
			console.log('Addd complaint handler results', results)
		})
	},

	GetComplaints: function (req, res) {
		Complaints.getAllComplaints (function (err,results) {
			if (err) return res.status(500).send(err)
			res.send(results)
		})
	},

	GetComplaintsByUser: function (req, res) {
		console.log("in get complaiintt",req.user)
		const userId = req.user._id

		Complaints.getComplaintsByUserId(userId, function (err,results) {
			if (err) return res.status(500).send(err)
			res.status(200).send(results)

			console.log(results)
		})
	},

	UpdateComplaintStatus: function (req, res) {
		const id = req.body._id
		const st = req.body.status

		Complaints.UpdateComplaintStatusById(id, st, function (results) {
			res.send(results)
			console.log(results)
		})
	},
	DeleteAcomplaint: (req, res) => {
		const id = req.body.id
		Complaints.deleteAcomplaintById(id, () => {
			res.status(200).send({ message: 'The Complaint has been deleted!' })
		})
	},
}
