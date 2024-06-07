const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema({
    Name:{
        type:[String],
        required:true
    },
    Course_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses'
    }
})
module.exports=mongoose.model('Category',categorySchema)