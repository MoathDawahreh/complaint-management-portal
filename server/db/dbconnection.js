var mongoose = require ('mongoose')
// const MongoClient = require('mongodb').MongoClient
 
const url = "mongodb+srv://moath:1234@cluster0.zudts.mongodb.net/ReactDb?retryWrites=true&w=majority"
const localurl = "mongodb://localhost:27017/reactdb"


  mongoose.connect("mongodb+srv://moath:1234@cluster0.zudts.mongodb.net/ReactDb?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true} ,(error)=>{

	if(!error){

		console.log('connected to ReactDb')
		
		}else{

			console.log("localnot connected")
		}
	
	})

	mongoose.set('useFindAndModify', false)


 
	




 