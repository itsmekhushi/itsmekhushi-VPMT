/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
const cors = require("cors");


const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routepath = require("./routes");
const appConfig = require("./lib/appConfig");
const app = express();
app.use(bodyParser.json({ limit: "5000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5000mb", extended: true }));
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "5000mb", extended: true }));
const dotenv = require("dotenv");
dotenv.config();
port = process.env.PORT;
// console.log("port,", port);
mongodbLink=process.env.DATABASE;
// console.log(mongodbLink);
mongoose.connect(mongodbLink, {
	useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("connected Successfully..."))
	.catch((err) => console.log(err));
const allowCrossDomain = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT, POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Credentials", true);
	next();
};
app.use(allowCrossDomain);
app.use(cors());
app.use("/* ", cors());
app.options("/*", cors());
app.use(cors({ origin: true }));
app.use(express.json());
//JSON parsing
app.use(bodyParser.json());
// Post Request API for testing 
app.get("/", (req, res) => {
	res.send("Welcome To Volansys Project Management Tool");
});
//This is our route middleware
app.use("/v1", routepath);
// Error handling
app.use(appConfig.handleError);
// Handle response
app.use(appConfig.handleSuccess);
//Listen Port 8000
app.listen(port,()=>{
	console.log("server is running at port",port);
});
module.exports.handler = serverless(app);