/* eslint-disable no-undef */

exports.handleSuccess = function (req, res, next) {
	if (req.data === undefined) {
		return next();
	}
	
	let Message = req.message || [];
	let Data = req.data || [];
	let StatusCode = 200;
	
	return res.json({ Message, Data, StatusCode });
};

exports.handleError = function (err, req, res, next) {
	if (!err) {
		return next();
	}
	if (err.message === "Data not found"|| err.message === "Permission denied") {
		err.statusCode = 404;
	} else if (err.message === "Not Updated!!!! This data already exist" || err.message === "Invalid input") {
		err.statusCode = 400;
	} else if (err.message === "Unauthorized") {
		err.statusCode = 401;
	} else if (err.message === "Too many requests") {
		err.statusCode = 429;
	}



	let errorResponse = {};
	errorResponse = {
		stack: err.stack,
		error: err.error || err.type || err.message,
		message: err.message,
		statusCode: err.statusCode || 500
	};
	return res.status(errorResponse.statusCode).json(errorResponse);
};

