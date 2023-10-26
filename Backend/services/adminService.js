/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const UserDetail = require("../models/userModel");
const bcryptjs=require("bcryptjs");


// API for Display User List 

exports.getUsers = async (req, res, _next)=> {
	// Read Data from db 
	try {
		const result = await UserDetail.find({}).populate("user_designation_id");
		res.send(result);
	} catch (error) {
		console.log("Error", error);
	}
};

const securePassword = async(password)=>{
	try{
		const passwordHash = await  bcryptjs.hash(password,10);
		return passwordHash;
	}catch(err){
		res.status(400).send(err.message);
	}
};
// API for Create User 
exports.createUser = async (req, res, next) => {
	const userData = req.body;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to verify email format
	if (!emailRegex.test(userData.user_email)) {
		return res.status(400).json({ "error": "Invalid email format" });
	}
	// console.log(data)
	try {
		const spassword = await securePassword(req.body.user_password);
		const user = new UserDetail({
			user_name:req.body.user_name,
			user_email:req.body.user_email,
			user_password:spassword,
			user_designation_id:req.body.user_designation_id,
			user_project_id:req.body.user_project_id
		});
		const result = await UserDetail.find({ user_email: userData.user_email });
		console.log("Result", result);
		if (result.length == 0) {
			const result = await user.save();
			res.json({ "Result": "Added Successfully", userData });
		}
		else {
			res.json({
				"Result": "Data already Added",
			});
		}
	} catch (error) {
		res.json({ "result": error });
	}
};
   


// API for Delete User 
exports.deleteUser = async (req, res, next) =>{
	const user_id = req.body.user_id;
	if (user_id === undefined) { 
		res.send("Add all Field Properly"); }
	else{
		try {
			let deletedUserData=await UserDetail.find({ user_id });
			const result = await UserDetail.deleteOne({ user_id });
			console.log("Result of deleted roject ", result);
			if (result.deletedCount == 0) {
				res.json({ "Result": "Data not Found" });
			}
			else {
				res.json({ "Result": "Deleted Successfully" ,"Data":deletedUserData});
			}
		} catch (error) {
			console.log("Error", error);
            
		}
    
	}
};

