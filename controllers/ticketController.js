const {instructorTicketRequest}=require('../repository/ticketRepo')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const CustomError=require('../utils/CustomError')
const instructorticket=async (req,res,next)=>{
    try{
        const authHeader=req.headers.auth;
        if(!authHeader){
            return {success:false,message:"Please login to continue",status_code:403};
        }
        const token=authHeader
        const decodedString=jwt.verify(token,process.env.JWT_SECRET)
        const userId=(decodedString.userId)
        if(!userId){
            throw new CustomError('Please Login to continue',403);
        }
        const {description,specialization,about,type_of_employee,qualifications,method_of_teaching}=req.body
        const id=new mongoose.Types.ObjectId(userId)
        const response=await instructorTicketRequest(description,specialization,about,type_of_employee,qualifications,method_of_teaching,id);
        return res.status(response.status_code).json(response);
    }
    catch(error){
        next(error)
    }
}
module.exports={
    instructorticket
}