const {addReview,deleteReview,updateReview}=require('../repository/reviewRepo')
const addReviews=async(req,res,next)=>{
    try{
        const {courseId,description,userId,rating}=req.body;
        const response=await addReview(courseId,description,userId,rating);
        if(response.success)
            return res.status(response.status_code).json({success:true,message:response.message,data:response.data});
        }
    catch(error){
        next(error)
    }
}
const deleteReviews=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const response=await deleteReview(id);
        if(response.success)
            return res.status(response.status_code).json({success:true,message:response.message})
    }
    catch(error){
        next(error)
    }
}
const updateReviews=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {description}=req.body;
        const newdescription=description
        const response=await updateReview(id,newdescription);
        if(response.success)
            return res.status(response.status_code).json({success:true,message:response.message,data:response.data})
    }
    catch(error){
        next(error)
    }
}
module.exports={
    addReviews,deleteReviews,updateReviews
}