/* eslint-disable no-undef */
const mongoose = require("mongoose");


const userInfo = new mongoose.Schema({
	user_name : {
		type :String
	},
	user_email : {
		type : String
	},
	user_password : {
		type : String
	},
	user_designation_id : {
		type:mongoose.Schema.ObjectId,
		ref:"Designation"
	},
	user_project_id:{
		type:[mongoose.Schema.ObjectId],
		ref:"ProjectList"
	}
},{
	timestamps:true
});


//collection creation
//User= collection & userInfo = structure of schema
const User = new mongoose.model("User",userInfo);
module.exports = User;
