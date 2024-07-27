const Instructor=require('../models/Instructor')
const getInstructorRepo=async(id)=>{
    console.log(id)
    const instructor=await Instructor.findById(id).populate([
        {path:'UserId'},
        {path:'CourseCreated'}
    ])
    return {success:true,message:"successfully fetched instructor",data:instructor}
}
module.exports={
    getInstructorRepo
}