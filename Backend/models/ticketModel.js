/* eslint-disable no-undef */
const mongoose = require("mongoose");



// Define Schema
const ticketDetailSchema = new mongoose.Schema({
	ticket_id : {
		type:String,
		required:true,
		unique:true
	},
	ticket_project_id:{
		type : mongoose.Schema.ObjectId,
		ref: "ProjectList"
	},
	ticket_assignee_id:{
		type : mongoose.Schema.ObjectId,
		ref: "User"
	},
	ticket_reporter_id:{
		type : mongoose.Schema.ObjectId,
		ref: "User"
	},
	ticket_title:{
		type:String,
		required:true,
		unique:true
	},
	ticket_description:{
		type:String
	},
	ticket_status:{
		type:String
	},
	ticket_start_date:{
		type:Date,
	},
	ticket_end_date:{
		type:Date,

	},
	ticket_comment_id:{
		type:[mongoose.Schema.ObjectId],
		ref:"Comments"
	},
	ticket_attachment: [{
		data:Buffer,
		contentType:String
	}]
     
});

// Collection Creations 
const TicketDetail = new mongoose.model("TicketDetail", ticketDetailSchema);

module.exports = TicketDetail;
