const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema({
    Course_Id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Review',reviewSchema)