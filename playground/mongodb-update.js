//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//docs.mongodb.com/manual/reference/operator/update
	/*db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID("59b6a3514fa9ea0639b18960")
	},{
		$set:{
			completed:true
		}
	},{
		returnOriginal: false
	}).then((result)=>{
		console.log(result);
	});*/

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID("59b2f692e6c7a864d9dff4ed")
	},{
		$set:{
			name: 'Travis'
		},
		$inc:{
			age: 1
		}
	},{
		returnOriginal: false
	}).then((result)=>{
		console.log(result);
	});

	//db.close();
});
