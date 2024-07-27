const {createNewSection, deleteSectionRepo}=require('../repository/sectionRepo')
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
const deleteSection=async(req,res,next)=>{
    try{
        const {id}=req.params
        const sectionId=id
        console.log(req.params)
        const response=await deleteSectionRepo(sectionId)
        return res.status(200).json({success:true,message:response.message})
    }
    catch(error){
        next(error)
    }
}
module.exports={
    createSection,
    deleteSection
}