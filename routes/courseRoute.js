const express=require('express')
const router=express.Router()
const {getCourse,getAllCourses}=require('../controllers/courseController')
router.get('/',getAllCourses)
router.get("/:id",getCourse)
module.exports=router