//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	/*db.collection('Todos').find({
		_id: new ObjectID('59b2f5bd5a6bd464aa17a67e')
	}).toArray().then((docs)=>{
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{	
		console.log('Unable to fetch todos',err);
	});*/

	/*db.collection('Todos').find().count().then((count)=>{
		console.log(`Todos: ${count}`);
	},(err)=>{	
		console.log('Unable to fetch todos',err);
	});*/

	db.collection('Users').find().count().then((count)=>{
		console.log(`Docs: ${count}`);
	},(err)=>{	
		console.log('Unable to fetch todos',err);
	});
	db.collection('Users').find({name:'Travis'}).toArray().then((res)=>{
		console.log(`Documents with Travis:`);
		console.log(JSON.stringify(res,undefined,2));
	},(err)=>{
		console.log('Unable to fetch todos',err);
	})
	//db.close();
});
