/* eslint-disable no-undef */

const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const verifyToken=require("../middleware/verifyToken");
const  controller= require("../controller/userController");
const designationService = require("../services/designationService");


router.post("/login", userService.userLogin,controller.userData);

router.get("/profile", verifyToken, userService.userProfile,controller.userData);

router.post("/designation",verifyToken,designationService.designationDetails,controller.userData);

// router.post('/mail',emailService.sendEmail)

module.exports = router;
