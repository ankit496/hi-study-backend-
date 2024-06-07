const Otp=require('../models/Otp')
const verifyEmail=async(email,otp)=>{
    try{
        const record=await Otp.findOne({email});
        if(record && record.otp==otp){
            await Otp.deleteOne({email})
            return {success:true,message:"Email verified successfully"}
        }
        else
            return {success:false,message:'Enter correct otp'}
    }
    catch(error){
        throw error
    }
}
module.exports=verifyEmail