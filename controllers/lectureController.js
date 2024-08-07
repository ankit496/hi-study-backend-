const {addLecture,deleteLectureRepo}=require('../repository/lectureRepo')
const addnewlecture=async(req,res,next)=>{
    try{
        const {title,url,sectionId}=req.body;
        const response=await addLecture(title,sectionId,url);
        if(response.success){
            return res.status(response.status_code).json({success:true,message:response.message,data:response.data});
        }
    }
    catch(error){
        next(error)
    }
}
const deleteLecture=async(req,res,next)=>{
    try{
        const {id}=req.params
        const response=await deleteLectureRepo(id)
        return res.status(response.status_code).json({success:true,message:response.message})
    }
    catch(error){
        next(error)
    }
}
module.exports={
    addnewlecture,
    deleteLecture
}