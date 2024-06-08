const {addLecture}=require('../repository/lectureRepo')
const addnewlecture=async(req,res,next)=>{
    try{
        console
        const {title,url,sectionId}=req.body;
        console.log(title,sectionId,url)
        const response=await addLecture(title,sectionId,url);
        if(response.success){
            return res.status(response.status_code).json({success:true,message:response.message,data:response.data});
        }
    }
    catch(error){
        next(error)
    }
}
module.exports={
    addnewlecture
}