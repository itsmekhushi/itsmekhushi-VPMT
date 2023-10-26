/* eslint-disable no-undef */

const mongoose = require("mongoose");



const designationDetails = new mongoose.Schema({
	designation:{
		type:String,
		required:true
	}
});

const Designation = new mongoose.model("Designation",designationDetails);
module.exports = Designation;