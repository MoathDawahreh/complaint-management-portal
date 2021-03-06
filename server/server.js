
const Handlers = require ('./handlers')
const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
const fs = require('fs');
// const path = require ('path')
const https = require('https');

// const { create } = require('domain');
const privateKey  = fs.readFileSync('./cert/key.pem', 'utf8');
const certificate = fs.readFileSync('./cert/cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express()
const port = 5000

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('WOOHOO!')
})

app.post('/api/add-user', Handlers.Adduser)
app.get('/api/AllUsers', Handlers.GetUsers)
app.post('/api/add-complaint', Handlers.AddComplaint)
app.post('/api/login', Handlers.login)
app.get('/api/GetAllComplaints', Handlers.GetComplaints)
app.post('/api/complaintsByUser', Handlers.GetComplaintsByUser)



// app.get('/add-user', (req, res) => {
//     const User = new Users({name:'Sand', pwd:"1114"})
//     User.save()
//     .then((result) => {res.send(result)})
   
//     .catch((err)=>{
//         console.log(err)
//     })
    
//   })  

const httpsServer = https.createServer(credentials, app);
 
// httpsServer.listen(4000,()=>{console.log("httpsss at 4000")})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})



