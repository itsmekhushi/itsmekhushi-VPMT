/* eslint-disable no-undef */
const mongoose = require("mongoose");
const ProjectList = require("./ticketModel");

const projectAttachmentDetails = mongoose.Schema({
	name:String,
	project_id : {
		type:mongoose.Schema.ObjectId,
		ref:ProjectList
	},
	attachment: {
		// data:Buffer,
		contentType:String
	}
});

const ProjectAttachments= new mongoose.model("projectAttachments",projectAttachmentDetails);
module.exports = ProjectAttachments;