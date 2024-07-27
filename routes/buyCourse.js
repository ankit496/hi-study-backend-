const express=require('express')
const router=express.Router()
const {buycourse}=require('../controllers/enrollment')
router.post("/buy-course",buycourse)
module.exports=router