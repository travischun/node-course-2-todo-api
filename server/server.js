var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	//console.log(req.body);
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({
			todos:todos,
		})
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos/:id',(req,res)=>{
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo)=>{
		if(!todo){
			return res.status(404).send();
		}
		res.send({
			todo:todo
			});
	}).catch((e)=>{
		res.status(400).send();
	});
});

app.delete('/todos/:id',(req,res)=>{
	//get the id
	var id = req.params.id;

	//not valid return 404
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((result)=>{
		if(!result){
			return res.status(404).send();
		}
		res.send({
			result:result 
		});
	}).catch((e)=>{
		res.status(400).send();
	});
});

app.listen(port,()=>{
	console.log(`started on port ${port}`);
});

module.exports = {
	app: app
};

/*
var newTodo = new Todo({
	text:'Cook Dinner'
});

newTodo.save().then((result)=>{
	console.log('Saved todo',result);
},(e)=>{
	console.log('Unable to save todo');
});*/

/*var nextTodo = new Todo({
	text:'Something to do',
});

nextTodo.save().then((result)=>{
	console.log(JSON.stringify(result,undefined,2));
},(e)=>{
	console.log('Unable to save todo');
});*/


//user model
//email - require - trim - type string - min length 1
/*

newUser.save().then((result)=>{
	console.log(result);
},(e)=>{
	console.log('Unable to save user',e);
});*/