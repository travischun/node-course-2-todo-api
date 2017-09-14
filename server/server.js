require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());


app.post('/todos',authenticate,(req,res)=>{
	//console.log(req.body);
	var todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos',authenticate,(req,res)=>{
	Todo.find({
		_creator:req.user._id
	}).then((todos)=>{
		res.send({
			todos:todos,
		})
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos/:id',authenticate,(req,res)=>{
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findOne({
		_id: id,
		_creator: req.user._id
	}).then((todo)=>{
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

app.delete('/todos/:id',authenticate,(req,res)=>{
	//get the id
	var id = req.params.id;

	//not valid return 404
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((todo)=>{
		if(!todo){
			return res.status(404).send();
		}
		res.send({
			todo:todo 
		});
	}).catch((e)=>{
		res.status(400).send(e);
	});
});

app.patch('/todos/:id',authenticate,(req,res)=>{
	var id = req.params.id;
	var body = _.pick(req.body,['text','completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}
	else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({
		_id: id,
		_creator: req.user._id
	},{
		$set:body
	},{
		new: true
	}).then((todo)=>{
		if(!todo){
			return res.status(404).send();
		}
		res.send({
			todo:todo
		})
	}).catch((e)=>{
		res.status(400).send();
	});
});
//POST /users
app.post('/users',(req,res)=>{
	var body = _.pick(req.body,['email','password']);
	var user = new User(body);

	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth',token).send(user);
	}).catch((e)=>{
		res.status(400).send(e);
	});
});


//POST /users/login
app.post('/users/login',(req,res)=>{
	var body = _.pick(req.body,['email','password']);

	User.findByCredentials(body.email,body.password).then((user)=>{
		return user.generateAuthToken().then((token)=>{
			res.header('x-auth',token).send(user);
		});
	}).catch((e)=>{
		res.status(400).send();
	});
});

app.delete('/users/me/token',authenticate,(req,res)=>{
	req.user.removeToken(req.token).then(()=>{
		res.status(200).send();
	},()=>{
		res.status(400).send();
	});
});

app.get('/users/me',authenticate,(req,res)=>{
	res.send(req.user);
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