const {createNewSection}=require('../repository/sectionRepo')
const {findCourseByTitle}=require('../repository/courseRepo')
const createSection=async(req,res,next)=>{
    try{
        const {title,courseId}=req.body;
        const response=await createNewSection(title,courseId);
        return res.status(201).json({success:true,message:"Succesfully added new section",data:response.data})
    }
    catch(error){
        next(error)
    }
}
module.exports={
    createSection
}