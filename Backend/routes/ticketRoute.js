/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const ticketService = require("../services/ticketService");

const controller = require("../controller/ticketController");

const multer = require("multer");



// set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create Ticket API 
router.post("/createTicket",upload.single("ticket_attachment"),verifyToken,ticketService.createTicket,controller.ticketData);

// Update Ticket API 
router.post("/updateTicket",verifyToken,ticketService.updateTicket,controller.ticketData);

// Delete Ticket API 
router.post("/deleteTicket",verifyToken,ticketService.deleteTicket,controller.ticketData);

// Specific Ticket List API
router.post("/getTickets",verifyToken,ticketService.displayTicketList,controller.ticketData);

router.post("/addComment",verifyToken,ticketService.addComment,controller.ticketData);

router.post("/deleteComment",verifyToken,ticketService.deleteComment,controller.ticketData);

router.post("/updateComment",verifyToken,ticketService.updateComment,controller.ticketData);


router.post("/getTicketDetails",verifyToken,ticketService.CardData,controller.ticketData);

router.post("/updateStatus",verifyToken,ticketService.updateStatus,controller.ticketData);

// router.get('/ticket',verifyToken,ticketService.ticketList,controller.ticketData)

//Add attachments API
router.post("/uploadTicketAttachments",upload.single("attachment"),verifyToken,ticketService.uploadTicketAttachments);

//update attachments Api
router.post("/updateTicketAttachments",upload.single("attachment"),verifyToken,ticketService.updateTicketAttachments);

//delete Attachment API
router.delete("/deleteTicketAttachments",upload.single("attachments"),verifyToken,ticketService.deleteTicketAttachments);

//get Attachments API
router.post("/getTicketAttachments",upload.single("attachments"),verifyToken,ticketService.getTicketAttachments,controller.ticketData);


module.exports = router;
