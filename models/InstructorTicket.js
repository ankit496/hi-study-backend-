const mongoose=require('mongoose')
const instructorticketSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Specialization:{
        type:String,
        required:true
    },
    About:{
        type:String,
        required:true
    },
    Type_of_employee:{
        type:String,
        required:true
    },
    Qualifications:{
        type:String,
        required:true
    },
    Method_of_teaching:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','rejected','accepted'],
        default:'pending'
    }
})
module.exports=mongoose.model('InstructorTicket',instructorticketSchema)