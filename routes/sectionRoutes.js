const express=require('express')
const isInstructor = require('../middleware/isInstructor')

const {createSection,deleteSection}=require('../controllers/sectionController')
const router=express.Router()
// router.post("/",res.send("section route"))
router.post('/addSection',isInstructor,createSection)
router.delete('/deleteSection/:id',isInstructor,deleteSection)
module.exports=router