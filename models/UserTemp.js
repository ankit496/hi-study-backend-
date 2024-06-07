const mongoose=require('mongoose')
const userTempSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'instructor','company'],
        default: 'user'
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300
    }
})
module.exports=mongoose.model('UserTemp',userTempSchema);