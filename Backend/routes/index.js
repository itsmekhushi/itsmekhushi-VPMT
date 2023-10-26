/* eslint-disable no-undef */

const express = require ("express");
const adminRoutes = require("../routes/adminRoute");
const userRoutes = require("../routes/userRoute");
const ticketRoutes = require("./ticketRoute");
const projectRoutes = require("./projectRoute");
const router = express.Router();

router.use("/admin",adminRoutes);
router.use("/user",userRoutes);
router.use("/project",projectRoutes);
router.use("/ticket",ticketRoutes);
// router.get('/auth', )

module.exports =router;
