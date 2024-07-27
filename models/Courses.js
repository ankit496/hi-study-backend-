const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String
    },
    category: {
        type: [String]
    },
    courseType: {
        type: String //admin side
    },
    desc: {
        type: String
    },
    level:{
        type:String,
        enum:['All Levels','Intermediate','Beginner','Advance','Expert']
    },
    courseThumbnail:{
        type:String
    },
    review: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Review'
    },
    price: {
        type: Number
    },
    offPrice: {
        type: Number
    },
    sellsType: {
        type: String //admin
    },
    courseImg: {
         type: String 
    },
    courseListImg: {
        type: String 
    },
    awardImg: {
         type: String 
    },
    days: {
         type: String
    },
    isActiveCate: {
         type: Boolean 
    },
    language: {
        type: [String]
    },
    courseAward: {
        type: String
    },
    courseFor:{
        type: [String]
    },
    courseOverview:{
        type:[String]
    },
    RequirementDetails:{
        type:[String]
    },
    OverviewDetails:{
        type:[String]
    },
    courseIntro:{
        type:String
    },
    enrolledUser:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User'
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Instructor'
    },
    courseContent:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Section'
    }
})
module.exports = mongoose.model('Courses', courseSchema)