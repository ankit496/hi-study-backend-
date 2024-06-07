const mongoose=require('mongoose')
const lectureSchema=new mongoose.Schema({
    Section_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Section'
    },
    Title:{
        type:String,
        required:true
    },
    Content_url:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Lectures',lectureSchema);