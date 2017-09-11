const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userID = "59b6be2d8b83cc806ec9540a";

User.findById(userID).then((user)=>{
	if(!user){
		return console.log('User not found');
	}
	console.log('User: ', user);
}).catch((e)=>{
	console.log(e);
});

/*var id = "59b6e4d9a28f528c08486b98";

if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}
*/
/*Todo.find({
	_id: id
}).then((todos)=>{
	console.log('Todos',todos);
});

Todo.findOne({
	_id: id
}).then((todo)=>{
	console.log('Todo',todo);
});*/

/*Todo.findById(id).then((todo)=>{
	if(!todo){
		return console.log('ID not found');
	}
	console.log('Todo by ID',todo);
}).catch((e)=>{
	console.log(e);
});*/