const {addLecture}=require('../repository/lectureRepo')
const addnewlecture=async(req,res,next)=>{
    try{
        const {title,sectionId,url}=req.body;
        const response=await addLecture(title,sectionId,url);
        if(response.success){
            return res.status(response.status_code).json({success:true,message:response.message});
        }
    }
    catch(error){
        next(error)
    }
}
module.exports={
    addnewlecture
}