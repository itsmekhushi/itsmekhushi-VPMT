/* eslint-disable no-undef */

const mongoose = require("mongoose");
const User = require("./userModel");


const commentDetails = new mongoose.Schema({ 
	comment_body:{
		type:String,
		required:true
	},
	user_id:{
		type:mongoose.Schema.ObjectId,
		ref:User
	},
	parent_id:{
		type:mongoose.Schema.ObjectId
	},
   
},{
	timestamps:true
});

const Comments =new mongoose.model("Comments",commentDetails);
module.exports = Comments;