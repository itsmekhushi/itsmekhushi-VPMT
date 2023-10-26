/* eslint-disable no-undef */
const mongoose = require("mongoose");



const projectItems = new mongoose.Schema({
	project_author_id:{
		type : mongoose.Schema.ObjectId,
		ref : "User"
	},
	project_title:{
		type : String,
		require:true,
		unique:true

	},
	project_description:{
		type : String,
		require:true
	},
    
	project_start_date:{
		type:String,
	},
	project_end_date:{
		type:String,
	},
	project_status:{
		type : String
	},
	project_team_members_id:{
		type:[mongoose.Schema.ObjectId],
        
		ref:"User"
	},
	project_attachment: [{
		// eslint-disable-next-line no-undef
		data:Buffer,
		contentType:String
	}],
	project_ticket_id:{
		type:[mongoose.Schema.ObjectId],
		ref:"TicketDetail"
	}
});



//collection creation
//Project = collection & projectItems = structure of schema
const ProjectList = new mongoose.model("ProjectList",projectItems);




// eslint-disable-next-line no-undef
module.exports = ProjectList;
