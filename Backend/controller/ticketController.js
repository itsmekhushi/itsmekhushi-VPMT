/* eslint-disable no-undef */


exports.ticketData = (req,res,next)=>{
	req.message = req.successMessage;
	req.data = req.ticketStore;
	return next();
};