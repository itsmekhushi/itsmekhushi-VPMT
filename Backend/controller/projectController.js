/* eslint-disable no-undef */

exports.projectController = async (req,res,next) =>{
	req.message = req.successMessage;
	req.data = req.projectStore;
	return next();
};

