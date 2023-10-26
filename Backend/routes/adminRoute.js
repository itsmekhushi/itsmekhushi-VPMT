/* eslint-disable no-undef */
const express = require("express");


const router = express.Router();
const adminService = require("../services/adminService");

// Create User 
router.post("/createUser",adminService.createUser);

//Delete User
router.delete("/deleteUser",adminService.deleteUser);

//User List
router.get("/getUsers",adminService.getUsers);

module.exports = router;
