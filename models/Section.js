const mongoose=require('mongoose')
const sectionSchema=new mongoose.Schema({
    Course_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses',
        required:true
    },
    Lecture_Id:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Lectures'
    },
    Title:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Section',sectionSchema)