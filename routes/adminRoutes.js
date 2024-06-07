const express=require('express')
const router=express.Router()
const {getInstructorRequests,verifyInstructorTicket}=require('../controllers/adminController')
const {isAdmin}=require('../middleware/isAdmin')
router.get("/getInstructorTickets",isAdmin,getInstructorRequests);
router.post("/verifyInstructorTicket/:id",isAdmin,verifyInstructorTicket)
module.exports=router