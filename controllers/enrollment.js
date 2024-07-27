const {buyCourseRepo}=require('../repository/enrollmentRepo')
const jwt=require('jsonwebtoken')
const buycourse=async(req,res,next)=>{
    // try{
        const authHeader = req.headers.auth;
        const token = authHeader
        const decodedString = jwt.verify(token, process.env.JWT_SECRET)
        const id = decodedString.userId
        const {cartItems,amount}=req.body;
        const response=await buyCourseRepo(cartItems,id);
        return res.status(200).json({success:true,message:response.data})
    // }
    // catch(error){
    //     next(error)
    // }
}
module.exports={buycourse}