const express=require('express')
const router=express.Router()
const {signup,login, verifyemail}=require('../controllers/authController')
router.post("/signup",signup)
router.post('/login',login)
router.post('/verify',verifyemail)
module.exports=router