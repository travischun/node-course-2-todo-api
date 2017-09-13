const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		minLength: 1,
		required: true,
		unique: true,
		validate:{
			validator: (value)=>{
				return validator.isEmail(value);
			},
			message:'{VALUE} is not a valid email'
		}
	},
	password:{
		type: String,
		require: true,
		minLength: 6
	},
	tokens:[{
		access:{
			type:String,
			required: true
		},
		token:{
			type:String,
			required:true
		}
	}]
});

UserSchema.methods.toJSON = function(){
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(),acess: access},'abc123').toString();

	user.tokens.push({
		access: access,
		token: token
	});
	return user.save().then(()=>{
		return token;
	});
};

UserSchema.statics.findByToken = function(token){
	var User = this;
	var decoded;

	try{
		decoded = jwt.verify(token,'abc123');
	}catch(e){
		//return new Promise((resolve,reject)=>{
			//reject();
			//})
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access':'auth'
	});

};	

var User = mongoose.model('User',UserSchema);

module.exports = {
	User: User
};