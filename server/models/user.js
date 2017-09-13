const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User',{
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

module.exports = {
	User: User
};