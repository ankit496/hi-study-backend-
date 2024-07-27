const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    cover:{
        type:String
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    phone_number:{
        type:String
    },
    skill:{
        type:String
    },
    bio:{
        type:String
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
    Cover_Pic:{
        type:String
    },
    Resume:{
        type:String
    },
    LinkedIn:{
        type:String
    },
    Facebook:{
        type:String
    },
    Twitter:{
        type:String
    },
    Instagram:{
        type:String
    },
    Github:{
        type:String
    },
    Website:{
        type:String
    },
    reviews:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Review'
    },
    courses_bought:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Courses'
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'instructor','company'],
        default: 'user'
    }
},{timestamps:true})
const User=mongoose.model('User',userSchema);
module.exports=User;