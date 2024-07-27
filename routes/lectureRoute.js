const express=require('express')
const isInstructor=require('../middleware/isInstructor')
const {addnewlecture,deleteLecture}=require('../controllers/lectureController')
const router=express.Router()
router.post("/addLecture",isInstructor,addnewlecture)
router.delete("/deleteLecture/:id",isInstructor,deleteLecture)
module.exports=router