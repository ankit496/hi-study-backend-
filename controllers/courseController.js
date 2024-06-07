const {createCourse,findCourses}=require('../repository/courseRepo')
const CustomError=require('../utils/CustomError')
const createNewCourse=async(req,res,next)=>{
    try{
        const {title,description,price,language,level}=req.body
        const response=await createCourse(title,description,price,language,level);
        if(response.success){
            return res.status(response.status_code).json({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        throw new CustomError('Failed to create Course',400)
    }
    catch(error){
        next(error)
    }
}
const getAllCourses=async(req,res,next)=>{
    try{
        const response=await findCourses();
        return res.status(response.status_code).json({message:"Successfully fetched all Courses",data:response.data});
    }
    catch(error){
        next(error)
    }
}
const getCourse=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const response=await findCourses(id);
        return res.status(response.status_code).json({message:"Successfully fetched Course",data:response.data});
    }
    catch(error){
        next(error)
    }
}
module.exports={
    createNewCourse,
    getCourse,
    getAllCourses
}