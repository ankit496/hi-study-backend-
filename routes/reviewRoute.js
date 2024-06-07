const express=require('express')
const router=express.Router()
const {addReviews,deleteReviews,updateReviews}=require('../controllers/reviewController')
router.post("/addReview",addReviews)
router.post("/deleteReview/:id",deleteReviews)
router.patch("/updateReview/:id",updateReviews);
module.exports=router