const express=require('express')
const isInstructor=require('../middleware/isInstructor')
const {addnewlecture}=require('../controllers/lectureController')
const router=express.Router()
router.post("/addLecture",isInstructor,addnewlecture)
module.exports=router