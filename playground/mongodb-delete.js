//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//delete many
	/*db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
		console.log(result);
	});*/
	//delete one
/*	db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((result)=>{
		console.log(result);
	});*/
	//findOne and delete
	/*db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
		console.log(result);
	});*/

/*	db.collection('Users').deleteMany({name:'Travis'}).then((result)=>{
		console.log(result);
	});*/

	db.collection('Users').findOneAndDelete({_id: new ObjectID("59b302401393a76accab1195")}).then((result)=>{
		console.log(result);
	});

	//db.close();
});
