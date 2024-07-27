// const {login}=require('../repository/authRepo')
const { User, Otp } = require('../models/index')
const { create, userLogin, verifyEmail ,userDetailsRepo,updateUserRepo} = require('../repository/authRepo')
const signup = async (req, res, next) => {
    try {
        const response = await create({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        })
        return res.status(201).json({ success: true, message: 'Successfully OTP Send', data: response.userId });
    }
    catch (error) {

        next(error);
    }
}
const verifyemail = async (req, res, next) => {
    try {
        const response = await verifyEmail(
            req.body.userId,
            req.body.otp
        )
        res.setHeader('Authorization', `${response.token}`)
        return res.status(201).json(response)
    }
    catch (error) {
        next(error);
    }
}
const login = async (req, res, next) => {
    try {
        const response = await userLogin(req.body)
        res.setHeader('Authorization', `${response.token}`)
        return res.status(200).json({ success: true, message: "Logged in successfully", token: response.token });
    }
    catch (error) {
        next(error)
    }
}
const userDetails=async(req,res,next)=>{
    try{
        const {id}=req.params
        const response=await userDetailsRepo(id)
        return res.status(200).json(response)
    }
    catch(error){
        next(error)
    }
}
const udpateUser=async(req,res,next)=>{
    try{
        const {id,first_name,last_name,phone_number,skill,bio,profile_pic,cover_pic}=req.body
        const data={id,first_name,last_name,phone_number,skill,bio,profile_pic,cover_pic};
        const response=await updateUserRepo(data);
        return res.status(201).json(response)
    }
    catch(error){
        next(error)
    }
}
module.exports = {
    signup,
    login,
    verifyemail,
    userDetails,
    udpateUser
}