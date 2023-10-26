/* eslint-disable no-undef */
const ticketDetail = require("../models/ticketModel");
const Comments = require("../models/commentsModel");

const emailService = require("./email");
const UserList = require("../models/userModel");


exports.displayTicketList = async (req, res, next) => {
	const userData1= req.userData;
	const ticketData = req.body;
    
	if (ticketData.ticket_project_id == undefined) {
		return next(new Error("Invalid input"));
	}
	else {
		try {
			const result = await ticketDetail.find({ ticket_project_id: ticketData.ticket_project_id })
				.populate("ticket_comment_id")
				.populate("ticket_project_id")
				.populate("ticket_assignee_id")
				.populate("ticket_reporter_id")
                
				.populate({
					path: "ticket_assignee_id",
					populate: {
						path: "user_designation_id",
						model: "Designation"
					}
				})
				.populate({
					path: "ticket_reporter_id",
					populate: {
						path: "user_designation_id",
						model: "Designation"
					}
				})
				.populate({
					path: "ticket_comment_id",
					populate: {
						path: "user_id",
						model: "User",
						populate: {
							path: "user_designation_id",
							model: "Designation"
						}
					}
				});

        
			if(result.length==0){
				result.unshift(userData1);
				req.successMessage = "Ticket not found";
				req.ticketStore=result;
				return next();
			}
			else{
				result.unshift(userData1);
				req.successMessage = "Ticket List fetched successfully.";
				req.ticketStore = result;
				return next();
			}
		}
		catch (error) {
			return next(new Error(error));
		}
	}

};

// exports.ticketList = async (req, res, next) => {
//     const ticketData= req.body
//         if (ticketData== undefined) {
//             return next(new Error ("Invalid input"))
//         }
//         else{
//             try{
//             const result = await ticketDetail.find({}) // 
//             .populate('ticket_comment_id')
//             .populate('ticket_project_id')
//             .populate('ticket_assignee_id')
//             .populate('ticket_reporter_id')
            
//             .populate({
//                 path: "ticket_assignee_id",
//                 populate: {
//                     path: "user_designation_id",
//                     model: "Designation"
//                 }
//             })
//             .populate({
//                 path: "ticket_reporter_id",
//                 populate: {
//                     path: "user_designation_id",
//                     model: "Designation"
//                 }
//             })
//             .populate({
//                 path: "ticket_comment_id",
//                 populate: {
//                     path: "user_id",
//                     model: "User",
//                     populate:{
//                         path:"user_designation_id",
//                         model:"Designation"
//                     }
//                 }
//             })
            
//             // console.log(result);
//             if(result.length==0){
//                 return next (new Error("Ticket not found"))
//             }
//             else{
//                 req.successMessage = "Ticket List fetched successfully.";
//                 req.ticketStore = result;
//                 return next();
//             }
//         }
//         catch(error){
//             return next(new Error(error));
//         }
//     }
    
// };
// Function to create a new ticket
exports.createTicket =async (req, res, next) => {
	const ticketData = req.body;
	const userDetail=req.userData;
	console.log("file data::::::::::::::::::::::::::::::::::::::",ticketData,userDetail);
	console.log("you are inside create ticket");
	try{ 
		const result = await ticketDetail ({
			ticket_id:ticketData.ticket_id,
			ticket_project_id:ticketData.ticket_project_id,
			ticket_assignee_id:ticketData.ticket_assignee_id,
			ticket_reporter_id:userDetail._id,
			ticket_title:ticketData.ticket_title,
			ticket_description:ticketData.ticket_description,
			ticket_status:ticketData.ticket_status,
			ticket_start_date:ticketData.ticket_start_date,
			ticket_end_date:ticketData.ticket_end_date,
			ticket_comment_id:ticketData.ticket_comment_id,
			ticket_attachment:{        
				data: req.file ? req.file.buffer : null,
				contentType: req.file ? req.file.mimetype : null,
			},
		});
        
		// const resultData = await result.save()
		// const result1 = await ProjectList.updateOne({ _id: ticketData.ticket_project_id }, { $push: { project_ticket_id: result._id } })
        
		req.successMessage = "Data is added successfully";
		req.ticketStore = result;
        
		const reporterData=await UserList.find( {_id : result.ticket_reporter_id});
		const assigneeData=await UserList.find( {_id : result.ticket_assignee_id});
		emailService.sendEmail({Assignee_email : assigneeData[0].user_email,Reporter_name:reporterData[0].user_name,Reporter_email: reporterData[0].user_email,Assignee_name: assigneeData[0].user_name},"ticket",ticketData);
		return next();
	}
	catch (error) {
		return next(new Error(error));
	}
};

//API for update Ticket 
// Function to update an existing ticket
exports.updateTicket = async (req, res, next) => {
	const ticketData = req.body;
	console.log("updated data::::::::::::::::::::::::::::::::::::::",ticketData);
	try{
		const result = await ticketDetail.updateOne({ _id: ticketData._id },{ $set: ticketData });
		const result1 = await ticketDetail.find({ _id: ticketData._id })
			.populate("ticket_comment_id")
			.populate("ticket_project_id")
			.populate("ticket_assignee_id")
			.populate("ticket_reporter_id")
                
			.populate({
				path: "ticket_assignee_id",
				populate: {
					path: "user_designation_id",
					model: "Designation"
				}
			})
			.populate({
				path: "ticket_reporter_id",
				populate: {
					path: "user_designation_id",
					model: "Designation"
				}
			})
			.populate({
				path: "ticket_comment_id",
				populate: {
					path: "user_id",
					model: "User",
					populate: {
						path: "user_designation_id",
						model: "Designation"
					}
				}
			});
		if (result.modifiedCount === 0 && result.matchedCount === 1) {
			return next(new Error("Not Updated!!!! This data already exist"));
		}
		else if (result.modifiedCount === 1 && result.matchedCount === 1) {
			req.successMessage = "Successfully Updated";
			req.ticketStore = result1;
			return next();
		}
		else {
            

			req.successMessage = "Data is added successfully";

			req.ticketStore = ticketData;
			return next();


            
		}
	}
	catch (error) {
		return next(new Error(error));
	}
};

// API for Delete
exports.deleteTicket = async (req, res, next) => {
	const ticket_id = req.body;
	// const result = await ProjectList.updateOne({ _id: ticket_id._id }, { $pull: { project_ticket_id: ticket_id.id } })

	console.log("delete body",ticket_id);
	try {
		if (ticket_id === undefined) {
			return next(new Error("Invalid input"));
		} else {
			const result = await ticketDetail.findOneAndDelete({ _id: ticket_id._id });
			if (result == null) {
				return next(new Error("Data not found"));
			}
			req.successMessage = "Successfully Deleted";
			req.ticketStore = result;
			return next();
		}
	}
	catch (error) {
		console.log(error);
		return next(new Error(error));
	}
};



exports.addComment = async (req, res, next) => {
	const data = req.body;
	console.log("from ticket services:::::",data);
	try {
		const result = await Comments.create(data);
		console.log("result id ", result._id);
		const result1 = await ticketDetail.updateOne({ _id: data.ticket_id }, { $push: { ticket_comment_id: result._id } });
		console.log("ticket result:", result1);
		req.successMessage = "Successfully Pushed";
		req.ticketStore = result;
		return next();
    
    
	}
	catch (error) {
		console.log("Error", error);
		return next(new Error(error));
	}
};
    
// eslint-disable-next-line no-undef
exports.deleteComment = async (req, res, next) => {
	const data = req.body;
	try {
		await Comments.findByIdAndDelete({ _id: data.id });
		await Comments.deleteMany({ parent_id: data.id });
		const result = await ticketDetail.updateOne({ _id: data._id }, { $pull: { ticket_comment_id: data.id } });
		req.successMessage = "Successfully Pushed";
		req.ticketStore = result;
		return next();
	}
	catch (error) {
		console.log("Error", error);
		return next(new Error(error));
	}
};
    
exports.updateComment = async (req, res, next) => {
	const data = req.body;
	try {
		const result = await Comments.updateOne({ _id: data._id }, { $set: data });
    
		// const result1 = await Comments.create(data)
		req.successMessage = "Successfully Pushed";
		req.ticketStore = result;
		return next();
	}
	catch (error) {
		console.log("Error", error);
		return next(new Error(error));
	}
};
    
//Update Status
exports.updateStatus = async (req, res, next) => {
	const ticketData = req.body;
	console.log("ticket.data=", ticketData);
	try {
		const result = await ticketDetail.updateOne({ _id: ticketData._id }, { $set: ticketData });
		// const result1 = await ticketDetail.find({ _id: ticketData.ticket_id })
		req.ticketStore = result;
		req.successMessage = "Successfully updated";
		return next();
    
	}
	catch (error) {
		console.log("Error", error);
		return next(new Error(error));
	}
};
    
// API for Get ticketList using ticket id 
exports.CardData = async (req, res, next) => {
	const ticketData = req.body;
	console.log("service::::::::::::::::::::::::::::::::::::::::::",ticketData);
	if (ticketData == undefined) {
		return next(new Error("Invalid input"));
	}
	else {
		try {
			const result = await ticketDetail.find({ _id: ticketData._id })
				.populate("ticket_comment_id")
				.populate("ticket_project_id")
				.populate("ticket_assignee_id")
				.populate("ticket_reporter_id")
				.populate({
					path: "ticket_assignee_id",
					populate: {
						path: "user_designation_id",
						model: "Designation"
					}
				})
				.populate({
					path: "ticket_reporter_id",
					populate: {
						path: "user_designation_id",
						model: "Designation"
					}
				})
				.populate({
					path: "ticket_comment_id",
					populate: {
						path: "user_id",
						model: "User",
						populate: {
							path: "user_designation_id",
							model: "Designation"
						}
					}
				});

			console.log("Service result :",result);
			if (result.length == 0) {
				return next(new Error("Data not found"));
			}
			else {
				req.successMessage = "Ticket List";
				req.ticketStore = result;
				return next();
			}
		}
		catch (error) {
			return next(new Error(error));
		}
	}

};
 




exports.uploadTicketAttachments = async (req, res, next) => {
	console.log("attachment :",res);
	try{
		const image = new images({
			name: req.file.originalname,
			attachment: {
				data: req.file.buffer,
				contentType: req.file.mimetype,
			},
			ticket_id:req.body.ticket_id
		});

		await image.save();
		res.send("image uploaded successfully");
	} 
	catch(error){
		return next(new Error(error));
	}
};

exports.updateTicketAttachments = async (req,res,next) => {
	try {
		{
			// console.log("req.body:",req.body);
			// console.log("req.file:",req.file);
			// console.log("mixed: ");
			// const data = req.body.image
			const data = {
				name : req.file.originalname,
				image : {
					data: req.file.buffer,
					contentType: req.file.mimetype,
				}
			};
			// console.log(data);
			const result = await images.findByIdAndUpdate({_id:req.body.id},data);
			if (!result) {
				return res.status(404).send("Image not found");
			}        
			res.send("image updated");
		}
	} catch (error) {
		return next(new Error(error));  
	} 
};

exports.deleteTicketAttachments = async(req,res,next) => {
	try {
		await images.findByIdAndDelete({_id:req.body.id});
		// console.log(req.body);
		res.send("image is deleted");
	} catch (error) {
		return next(new Error(error));       
	}
};

exports.getTicketAttachments = async (req,res,next) => {
	try {
		const data = req.body;
		console.log("get data of getattchment : ",data);
		const result = await images.find({ticket_id:data.ticket_id});
		console.log("Backend :",result);
		req.successMessage = "Image Data";
		req.ticketStore = result;
		return next();
	} catch (error) {
		return next(new Error(error));         
	}          
};



