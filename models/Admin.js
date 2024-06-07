const mongoose=require('mongoose')
const adminSchema=new mongoose.Schema({
    UserId:{
        type:String,
        ref:'User'
    }
})
module.exports=mongoose.model('Admin',)