
const Handlers = require ('./handlers')
const express = require('express')
var cors = require('cors')
const fs = require('fs');
const path = require ('path')
const https = require('https')
require('dotenv').config()


// const { create } = require('domain');
const privateKey  = fs.readFileSync('./cert/key.pem', 'utf8');
const certificate = fs.readFileSync('./cert/cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express()
const port = 5000

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static(__dirname + '/../public'));
// app.use('/static', express.static(path.join(__dirname, '/../public')))
// app.use(express.static(path.join(__dirname, '/../public')))

app.get('/', (req, res) => {
  res.send('WOOHOO!')
})

app.post('/api/add-user', Handlers.Registration)
app.get('/api/AllUsers', Handlers.GetUsers)
app.post('/api/add-complaint', Handlers.AddComplaint)
app.post('/api/login', Handlers.login)
app.get('/api/GetAllComplaints', Handlers.GetComplaints)
app.post('/api/complaintsByUser', Handlers.GetComplaintsByUser)

app.post('/api/UpdateComplaintStatus', Handlers.UpdateComplaintStatus)


const httpsServer = https.createServer(credentials, app);
 
// httpsServer.listen(4000,()=>{console.log("httpsss at 4000")})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})



