/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const ProjectList = require("../models/projectModel");

const UserList = require("../models/userModel");
const emailService = require("../services/email");

// const redis=require("redis");
// let redisClient;

// (async () => {
// 	redisClient = redis.createClient();

// 	redisClient.on("error", (error) => console.error(`Error : ${error}`));
// 	redisClient.on("connect", () => console.log("Connection establish to redis"));

// 	await redisClient.connect();
// })();
mail_id=[];

 
exports.createProject = async (req, _res, next) => {
	let userData1 = req.userData;

	let projectData = req.body;
	console.log("from create project:::",projectData,userData1);
	// project_team_members = (projectData.project_team_members_id).split(",");
	// console.log("id::::::::;",project_team_members);
	try {
		const result = await ProjectList ({
			project_Id:projectData.project_Id,
			project_author_id:userData1._id,
			project_title:projectData.project_title,
			project_description:projectData.project_description,
			project_start_date:projectData.project_start_date,
			project_end_date:projectData.project_end_date,
			project_status:projectData.project_status,
			// project_team_members_id:project_team_members,
            
			project_attachment:{
				data: req.file ? req.file.buffer : null,
				contentType: req.file ? req.file.mimetype : null,
			},
		});

		console.log("file data ::::;",result);
		await result.save();
		req.successMessage = "Project Created Successfully ";
		req.projectStore = result;
		for (let i = 0; i < result.project_team_members_id.length; i++) {
			const element = result.project_team_members_id[i];
			console.log("Data::::::::::::::::::;",element);
			const userData=await UserList.find( {_id : element});
			mail_id.push(userData[0].user_email);
		}
		console.log("email:::::::::::::::",result,"user::::::::::::::::::::;",mail_id);
		emailService.sendEmail(mail_id,"project",projectData.project_title);
		return next();
	} 
	catch (error) {
		return next(new Error(error));
	}
};

// API for updating project
exports.updateProject = async (req, _res, next) => {

	let projectData = req.body;
	// if(projectData.p)
	try {
		const result = await ProjectList.updateOne({ _id: projectData._id }, { $set: projectData });
		// console.log("Result for update", result);

		if (result.modifiedCount === 0 && result.matchedCount === 1) {
			req.successMessage = "Data already exist";
			req.projectStore = result;
			return next();
		}
		else if (result.modifiedCount === 1 && result.matchedCount === 1) {
			req.successMessage = "successfully Updated";
			req.projectStore = result;
			return next();
		} 
            
        
	} catch (error) {
		return next(new Error(error));
	}
};
// path:"ticket_assignee_id",

//API for deleting Project 
exports.deleteProject = async (req, _res, next) => {

	project_Id = req.body.project_Id;
	if (project_Id === undefined) {
		return next(new Error("project_Id not found"));
	}
	else {
		try {
			const result = await ProjectList.findOneAndDelete({ _id : project_Id });
			// const result1 = await TicketList.deleteMany({ "ticket_project_id" : project_Id})
			if (result === null) {
				return next(new Error("Data not found"));
			} else {
				req.successMessage = "successfully Deleted";
				req.projectStore = result;
				return next();
			}

		} catch (err) {
			return next(new Error(err));
		}
	}
};

//API for displaying Project 
exports.getProjects = async (req, _res, next) => {
	let userData1 = req.userData;

	try {
		const result = await ProjectList.find({"project_team_members_id" : userData1._id }).sort({_id:-1})
			.populate("project_author_id")
			.populate("project_team_members_id")
			.populate("project_ticket_id",["ticket_status"])    
    
			.populate({
				path: "project_author_id",
				populate: {
					path: "user_designation_id",
					model: "Designation"
				}
			})
			.populate({
				path: "project_team_members_id",
				populate: {
					path: "user_designation_id",
					model: "Designation"
				}
			});
		
		if(result.length===0){
			result.unshift(userData1);
			req.successMessage = "Project not found";
			req.projectStore=result;
			return next();
		}
		else{
			result.unshift(userData1);
			req.successMessage = "Project List fetched successfully.";
			req.projectStore = result;
			console.log("project_detailsss",result);
			return next();
		}
	} catch (error) {
		return next(new Error(error));
	}
};

exports.getProjectDetail = async (req, _res, next) => {
	let userData1 = req.userData;

	try {
		// console.log("get Project lISt",req.params);
		const result = await ProjectList.find({"_id" : req.body._id })
			.populate("project_author_id")
			.populate("project_team_members_id")
			.populate("project_ticket_id",["_id","ticket_title","ticket_status"])
			.populate({
				path: "project_author_id",
				populate: {
					path: "user_designation_id",
					model: "Designation"
				}
			})
			.populate({
				path: "project_team_members_id",
				populate: {
					path: "user_designation_id",
					model: "Designation"
				}
			});
		console.log("Fetch data",result.length);
		if(result.length===0){
			result.unshift(userData1);

			req.successMessage = "Project not found";
			req.projectStore=result;
			return next();
		}
		else{
			result.unshift(userData1);

			req.successMessage = "Project Detail fetched successfully";
			req.projectStore = result;
			return next();
		}
	} catch (error) {
		return next(new Error(error));
	}

    

};


exports.getProject = async (req, res, _next) => {
	let isCache = false;
	const page = parseInt(req.query.page);
	const pageSize = parseInt(req.query.pageSize);
	const offset = (page - 1) * pageSize;
	let result;  // Declare result outside the if-else block
	const pageKey=page.toString();
	try {
		// const totalCount = await ProjectList.countDocuments();
		// const totalPages = Math.ceil(totalCount / pageSize);

		// const cacheResults = await redisClient.get(pageKey);

		// if (cacheResults) {
		// 	isCache = true;
		// 	result = JSON.parse(cacheResults);
		// 	console.log(" isCache:", isCache, "result:", result.length,pageKey);
		// } else {
		// 	console.log(" Fetching from database.");
		result = await ProjectList.find().limit(pageSize).skip(offset).exec();
		await redisClient.set(pageKey, JSON.stringify(result), {
			EX: 40,
			NX: true,
		  });
		console.log("Data stored in cache.",pageKey);
		

		res.json({
			fromCache: isCache,
			data: result,
			currentPage: page,
			pageSize: pageSize,
			totalPages: totalPages,
			totalItems: totalCount,
		});
		
	} catch (error) {
		console.error("Error fetching items:", error);
		res.status(500).json({ error: "An error occurred" });
	}
};
exports.getProjectSearch = async (req, res, _next) => {
   
	const { page , pageSize  } = req.query;
	const limit = parseInt(pageSize);
	const skip = (parseInt(page) - 1) * limit;
	const searchQuery = req.query.searchQuery;
	console.log("searchQuery", searchQuery);
	const result = await ProjectList.find().skip(skip).limit(limit).exec();

	  console.log("searchQuery", searchQuery);
	try {
		if (!searchQuery) {
			return res.json({data:result});
		}
		const matchObject = result.filter((obj) => obj.project_title.includes(searchQuery));

		res.json({ data: matchObject });
	} catch (error) {
		console.error("Error fetching items:", error);
		res.status(500).json({ error: "An error occurred" });
	}
};
