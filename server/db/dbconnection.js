var mongoose = require ('mongoose')
// const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

// const DB_Key = "mongodb+srv://moath:1234@cluster0.zudts.mongodb.net/ReactDb?retryWrites=true&w=majority"
const DB_Key = process.env.DB_Key

const localurl = "mongodb://localhost:27017/reactdb"

  mongoose.connect(DB_Key, {useNewUrlParser: true, useUnifiedTopology: true} ,(error)=>{

	if(!error){

		console.log('connected to ReactDb')
		
		}else{

			console.log("localnot connected")
		}
	
	})

	mongoose.set('useFindAndModify', false)


 
	




 