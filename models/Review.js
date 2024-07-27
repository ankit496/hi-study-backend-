const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema({
    Course_Id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    rating:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    }
})
module.exports=mongoose.model('Review',reviewSchema)