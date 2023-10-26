/* eslint-disable no-undef */


const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const User = require("../models/userModel");
const UserDetail = require("../models/userModel");
const bcryptjs = require("bcryptjs");

exports.userLogin = async (req, res, next) => {
	let userData = req.body;
	try {
		let userDetail = new User(userData);
		console.log("user authData",userDetail);
		let findUser = await User.findOne({ user_email: userDetail.user_email });
		console.log("user Details:::",findUser);
		if (findUser) {
			// Use bcryptjs to compare the entered password with the hashed password stored in the database
			let isPasswordMatch = await bcryptjs.compare(userDetail.user_password, findUser.user_password);
			
			if (isPasswordMatch) {
				jwt.sign(findUser.toJSON(), secretKey, {}, (err, token) => {
					if (err) {
						return next(new Error(err));
					} else {
						req.successMessage = "Token";
						req.userStore = token;
						return next();
					}
				});
			} else {
				return next(new Error("Unauthorized"));
			}
		} else {
			return next(new Error("Unauthorized"));
		}
	}
	catch (err) {
		return next(new Error(err));
	}
};


exports.userProfile = async (req, res, next) => {
	jwt.verify(token, secretKey, async (err, authData) => {
		if (err) {
			return next(new Error("Unauthorized Error"));
		} else {
			req.successMessage = "Profile Accessed";
			console.log("AuthData",authData);
			// req.userStore = authData;
			try {
				let result = await UserDetail.find({ user_email: authData.user_email })
					.populate("user_designation_id")
					.populate("user_project_id",["project_title"]);
				console.log("result.user_password : ",result);
				if (result) {
					let isPasswordMatch = await bcryptjs.compare(authData.user_password, result[0].user_password);
					if (isPasswordMatch) {
						req.userStore = authData;
					}
					// const result = await UserDetail.deleteOne({ user_id })
					console.log("Result of project ", result);
					req.userStore = result;
				} 
			}catch (error) {
				console.log("Error", error);

			}
			return next();
		}
	});
};


