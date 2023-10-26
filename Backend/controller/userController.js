/* eslint-disable no-undef */

exports.userData = (req,res,next)=>{
	req.message = req.successMessage;
	req.data = req.userStore;
	return next();
};