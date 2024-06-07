const express=require('express')
const router=express.Router();
const {instructorticket}=require('../controllers/ticketController')
router.post("/createInstructorTicket",instructorticket);
module.exports=router