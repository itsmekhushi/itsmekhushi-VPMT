/* eslint-disable no-undef */

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const projectServices = require("../services/projectService");
const controller = require("../controller/projectController");
const multer = require("multer");


// set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//Create Project
router.post("/createProject",upload.single("project_attachment"),verifyToken,projectServices.createProject,controller.projectController);

//Update Project0
router.post("/updateProject",verifyToken,projectServices.updateProject,controller.projectController);

//Delete Project
router.post("/deleteProject", verifyToken,projectServices.deleteProject,controller.projectController);

//Project List
router.get("/getProjects",verifyToken,projectServices.getProjects,controller.projectController);

//Project Detail
router.post("/getProjectDetail",verifyToken,projectServices.getProjectDetail,controller.projectController);
router.get("/getProject",verifyToken,projectServices.getProject,controller.projectController);
router.get("/getProjectSearch",verifyToken,projectServices.getProjectSearch,controller.projectController);
module.exports = router;
