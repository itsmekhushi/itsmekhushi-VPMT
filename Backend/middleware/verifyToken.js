/* eslint-disable no-undef */

const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

function verifyToken(req, res, next) {
	const accessToken = req.headers.accesstoken;
	if (accessToken) {
		jwt.verify(accessToken, secretKey, (err, authData) => {
			if (err) {
				
				return next(new Error(err));
			}
			else {
				req.userData=authData;
				// console.log("AuthDataa from",req.userData);

				token=accessToken;
				return next();
			}
		});   
	}
	else {
		return next(new Error("Unauthorized Error"));
	}
}

module.exports = verifyToken;
