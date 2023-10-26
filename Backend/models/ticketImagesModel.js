
/* eslint-disable no-undef */
const mongoose = require("mongoose");


const ticketAttachmentDetails = mongoose.Schema({
	name:String,
	ticket_id : {
		type:mongoose.Schema.ObjectId,
		ref:"TicketDetail"
	},
	attachment: {
		data:Buffer,
		contentType:String
	}
});

const TicketAttachments= new mongoose.model("ticketAttachments",ticketAttachmentDetails);
module.exports = TicketAttachments;