/* eslint-disable no-undef */
const Designation = require("../models/designationModel");

module.exports = {
	// eslint-disable-next-line no-unused-vars
	designationDetails: async(req,res) => { 
		const designationData = await Designation.create({
			designation:req.body.designation
		});
		req.successMessage = "Designation Details";
		req.userStore = designationData;
		return next();

	}
};