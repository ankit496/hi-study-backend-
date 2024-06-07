const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
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
    Profile_Pic:{
        type:String
    },
    Resume:{
        type:String
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'instructor','company'],
        default: 'user'
    }
})
const User=mongoose.model('User',userSchema);
module.exports=User;